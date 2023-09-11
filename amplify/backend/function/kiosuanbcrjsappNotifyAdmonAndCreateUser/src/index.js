const AWS = require('aws-sdk')
const fetch = require('node-fetch')
const generator = require('generate-password');
const {
  SESClient,
  SendTemplatedEmailCommand
} = require('@aws-sdk/client-ses')

AWS.config.update({ region: 'us-east-1' })

const cognito = new AWS.CognitoIdentityServiceProvider()
const ses = new SESClient({ region: 'us-east-1' })


const GRAPHQL_ENDPOINT = process.env.GRAPHQL_ENDPOINT;
const GRAPHQL_API_KEY = process.env.GRAPHQL_API_KEY;
const SES_EMAIL = process.env.SES_EMAIL;
const USER_POOL_ID = process.env.USER_POOL_ID
const EMAIL_ADMIN = process.env.EMAIL_ADMIN

async function createUserInCognito(usuario, email, role, tempPassword) {
  const params = {
    UserPoolId: USER_POOL_ID,
    Username: usuario,
  }
  let alreadyExist = false;
  try {
    const existingUser = await cognito.adminGetUser(params).promise();
    const sub = existingUser.UserAttributes.find(attr => attr.Name === 'sub').Value;
    console.log('User already exists in Cognito, returning existing sub:', sub);
    alreadyExist = true;
    return { sub, alreadyExist };
  } catch (error) {
    if (error.code === 'UserNotFoundException') {
      const createUserParams = {
        UserPoolId: USER_POOL_ID,
        Username: usuario,
        UserAttributes: [
          { Name: 'email', Value: email },
          { Name: 'custom:role', Value: role }
        ],
        MessageAction: 'SUPPRESS'
      };

      try {
        const createUserResult = await cognito.adminCreateUser(createUserParams).promise();
        const sub = createUserResult.User.Attributes.find(attr => attr.Name === 'sub').Value;
        console.log('User created in Cognito with temporary password');
        await cognito.adminSetUserPassword({
          UserPoolId: USER_POOL_ID,
          Username: usuario,
          Password: tempPassword,
          Permanent: true
        }).promise();
        alreadyExist = false;
        return { sub, alreadyExist };
      } catch (createUserError) {
        console.error('Error creating user in Cognito', createUserError);
        throw createUserError;
      }
    } else {
      console.error('Error getting user from Cognito', error);
      throw error;
    }
  }
}



async function sendEmailNotification(userEmail) {
  const templateData = {
    data: 'Se ha creado un nuevo proyecto, por favor asigne un validador lo antes posible',
    user: 'Administrador'
  }

  try {
    const data = await ses.send(new SendTemplatedEmailCommand({
      Source: SES_EMAIL,
      Destination: {
        ToAddresses: [EMAIL_ADMIN]
      },
      Template: 'AWS-SES-HTML-Email-Default-Template',
      TemplateData: JSON.stringify(templateData),
    }))
    
    console.log('Email notification sent:', data)
  } catch (error) {
    console.error('Error sending email notification', error)
    throw error
  }
}

async function createUserInGraphQL(sub, usuario, email, role, productID, alredyExist) {
  const fetchOptionsUser = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': GRAPHQL_API_KEY
    },
    body: JSON.stringify({
      query: `
        mutation CreateUser($input: CreateUserInput!) {
          createUser(input: $input) {
            id
            name
            role
            email
          }
        }
      `,
      variables: {
        input: {
          id: sub,
          name: usuario,
          email: email,
          role: role,
          isProfileUpdated: false
        }
      }
    })
  }
  const fetchOptionsUserProduct = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': GRAPHQL_API_KEY
    },
    body: JSON.stringify({
      query: `
        mutation CreateUserProduct($input: CreateUserProductInput!) {
          createUserProduct(input: $input) {
            userID
            productID
          }
        }
      `,
      variables: {
        input: {
          userID: sub,
          productID: productID,
        }
      }
    })
  }
  try {
    if (!alredyExist) {
      const responseUser = await fetch(GRAPHQL_ENDPOINT, fetchOptionsUser);
      const responseDataUser = await responseUser.json();
      console.log('User registration in GraphQL:', responseDataUser);
    }

    const responseUserProduct = await fetch(GRAPHQL_ENDPOINT, fetchOptionsUserProduct);
    const responseDataUserProduct = await responseUserProduct.json();

    console.log('UserProduct registration in GraphQL:', responseDataUserProduct);
  } catch (error) {
    console.error('Error creating user in GraphQL', error);
    throw error;
  }
}

async function getProductInfo(productID){
  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': GRAPHQL_API_KEY
    },
    body: JSON.stringify({ 
      query: `
        query GetProduct($id: ID!) {
            getProduct(id: $id) {
              id
              name
              status
              productFeatures {
                items {
                  id
                  value
                  featureID
                }
                nextToken
              }
            }
          }
        `,
        variables: {
          id: productID
        }
      })
  }

  try {
    const response = await fetch(GRAPHQL_ENDPOINT, fetchOptions)
    const responseData = await response.json()
    const productFeatureEmail = responseData.data.getProduct.productFeatures.items.filter(pf => pf.featureID === 'A_postulante_email')
    if(productFeatureEmail[0].value) return productFeatureEmail[0].value
    return null
  } catch (error) {
    console.error('Error creating user in GraphQL', error)
    throw error
  }
}

/* exports.handler = async (event) => {
  console.log(event)
  for (const record of event.Records) {
    console.log(record.eventID);
    console.log(record.eventName);
    console.log('DynamoDB Record: %j', record.dynamodb);

    if (record.eventName === 'INSERT' && record.dynamodb.NewImage) {
      let productID = record.dynamodb.NewImage.id.S
      const email = await getProductInfo(productID)
      const usuario = email.split('@')[0]
      const role = 'constructor'
      const tempPassword  = 'passwordSegura'

      try {
        const sub = await createUserInCognito(usuario, email, role, tempPassword)
        await createUserInGraphQL(sub, usuario, email, role, productID)
        await sendEmailNotification()
        return { status: 'done', msg: 'Process completed successfully' }
      } catch (error) {
        return { status: 'error', msg: 'An error occurred during processing' }
      }
    }
  }
} */
exports.handler = async (event) => {
  console.log(event)
  for (const record of event.Records) {
    console.log(record.eventID);
    console.log(record.eventName);
    console.log('DynamoDB Record: %j', record.dynamodb);

    if (record.eventName === 'INSERT' && record.dynamodb.NewImage) {
      let productID = record.dynamodb.NewImage.id.S
      const email = await getProductInfo(productID)
      const usuario = email.split('@')[0]
      const role = 'constructor'
      const tempPassword  = 'passwordSegura'

      try {
        const {sub, alreadyExist} = await createUserInCognito(usuario, email, role, tempPassword)
        await createUserInGraphQL(sub, usuario, email, role, productID, alreadyExist)
        await sendEmailNotification()
        return { status: 'done', msg: 'Process completed successfully' }
      } catch (error) {
        return { status: 'error', msg: 'An error occurred during processing' }
      }
    }
  }
}
