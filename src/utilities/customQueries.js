export const getProduct = /* GraphQL */ `
  query GetProduct($id: ID!) {
    getProduct(id: $id) {
      id
      tokenGenesis
      name
      description
      isActive
      marketplaceID
      order
      status
      showOn
      properties {
        items {
          id
          name
          productID
          status
          userID
          cadastralNumber
          campaignID
          campaign {
            id
            name
          }
          propertyFeatures {
            items {
              id
              value
              verifications {
                items {
                  userVerifierID
                  userVerifiedID
                  verificationComments {
                    items {
                      comment
                      createdAt
                      id
                      isCommentByVerifier
                    }
                  }
                  userVerified {
                    name
                  }
                  userVerifier {
                    name
                  }
                  id
                }
              }
              documents {
                items {
                  id
                  url
                  isApproved
                  docHash
                  data
                  isUploadedToBlockChain
                  productFeatureID
                  signed
                  signedHash
                  status
                  timeStamp
                  userID
                }
              }
              feature {
                name
                isVerifable
              }
              featureID
              createdAt
              updatedAt
            }
            nextToken
          }
        }
        nextToken
        __typename
      }
      marketplace {
        id
        name
      }
      timeOnVerification
      projectReadiness
      categoryID
      transactions {
        items {
          id
        }
      }
      userProducts {
        items {
          user {
            id
            role
            name
          }
        }
      }
      productFeatures {
        items {
          id
          value
          isToBlockChain
          order
          isOnMainCard
          isResult
          productID
          verifications {
            items {
              userVerifierID
              userVerifiedID
              verificationComments {
                items {
                  comment
                  createdAt
                  id
                  isCommentByVerifier
                }
              }
              userVerified {
                name
              }
              userVerifier {
                name
              }
              id
            }
          }
          documents {
            items {
              id
              url
              isApproved
              docHash
              data
              isUploadedToBlockChain
              productFeatureID
              signed
              signedHash
              status
              timeStamp
              userID
            }
          }
          feature {
            name
            isVerifable
          }
          featureID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;

export const listProducts = /* GraphQL */ `
  query ListProducts(
    $filter: ModelProductFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProducts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        isActive
        isActiveOnPlatform
        order
        campaignID
        campaign {
          name
          description
          available
        }
        status
        timeOnVerification
        projectReadiness
        showOn
        categoryID
        userProducts {
          items {
            user {
              id
              role
              name
            }
          }
        }
        productFeatures {
          items {
            id
            value
            isToBlockChain
            order
            isOnMainCard
            isResult
            productID
            verifications {
              items {
                userVerifierID
                userVerifiedID
                verificationComments {
                  items {
                    comment
                    createdAt
                    id
                    isCommentByVerifier
                  }
                }
                userVerified {
                  name
                }
                userVerifier {
                  name
                }
                id
              }
            }
            documents {
              items {
                id
                url
                isApproved
                docHash
                data
                isUploadedToBlockChain
                productFeatureID
                signed
                signedHash
                status
                timeStamp
                userID
              }
            }
            feature {
              name
              isVerifable
            }
            featureID
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
      }
    }
  }
`;

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      name
      dateOfBirth
      isProfileUpdated
      addresss
      cellphone
      role
      subrole
      status
      email
      wallets {
        items {
          id
          name
          status
          isSelected
          userID
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;

export const getUserProjects = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      userProducts {
        items {
          product {
            id
            categoryID
            createdAt
            campaign {
              id
              name
              description
              createdAt
              available
            }
            description
            isActive
            isActiveOnPlatform
            name
            order
            projectReadiness
            status
            timeOnVerification
            updatedAt
          }
          isFavorite
        }
      }
    }
  }
`;

export const listCategories = /* GraphQL */ `
  query ListCategories(
    $filter: ModelCategoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCategories(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        isSelected
        products {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;

export const listProductItems = /* GraphQL */ `
  query ListProductItems(
    $filter: ModelProductItemFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProductItems(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        type
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;

export const getFeature = /* GraphQL */ `
  query GetFeature($id: ID!) {
    getFeature(id: $id) {
      id
      name
      productFeatures {
        items {
          id
          value
          productID
        }
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;

export const getProductItem = /* GraphQL */ `
  query GetProductItem($id: ID!) {
    getProductItem(id: $id) {
      id
      name
      type
      createdAt
      updatedAt
      __typename
    }
  }
`;

export const listCampaigns = /* GraphQL */ `
  query ListCampaigns(
    $filter: ModelCampaignFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCampaigns(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userID
        user {
          id
          name
          role
          subrole
          email
        }
        products {
          items {
            id
            name
            categoryID
            createdAt
          }
        }
        name
        description
        initialDate
        endDate
        available
        images
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;

export const getProperty = /* GraphQL */ `
  query GetProperty($id: ID!) {
    getProperty(id: $id) {
      id
      name
      description
      department
      cadastralNumber
      productID
      product {
        id
        name
        description
        isActive
        isActiveOnPlatform
        showOn
        order
        status
        timeOnVerification
        projectReadiness
        tokenClaimedByOwner
        tokenGenesis
        categoryID
        category {
          id
          name
          isSelected
          createdAt
          updatedAt
          __typename
        }
        marketplaceID
        marketplace {
          id
          name
          oracleTokenName
          oracleWalletID
          adminWalletID
          createdAt
          updatedAt
          __typename
        }
        images {
          nextToken
          __typename
        }
        productFeatures {
          nextToken
          __typename
        }
        userProducts {
          items {
            user {
              id
              role
            }
          }
          __typename
        }
        transactions {
          nextToken
          __typename
        }
        orders {
          nextToken
          __typename
        }
        companies {
          nextToken
          __typename
        }
        payments {
          nextToken
          __typename
        }
        scripts {
          nextToken
          __typename
        }
        tokens {
          nextToken
          __typename
        }
        analysis {
          nextToken
          __typename
        }
        apiQueries {
          nextToken
          __typename
        }
        campaignID
        campaign {
          id
          userID
          name
          description
          initialDate
          endDate
          available
          images
          createdAt
          updatedAt
          __typename
        }
        properties {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      campaignID
      campaign {
        id
        userID
        user {
          id
          name
          dateOfBirth
          isProfileUpdated
          isValidatedStep1
          isValidatedStep2
          addresss
          cellphone
          role
          subrole
          status
          email
          marketplaceID
          createdAt
          updatedAt
          __typename
        }
        products {
          nextToken
          __typename
        }
        name
        description
        initialDate
        endDate
        available
        images
        properties {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      userID
      user {
        id
        name
        dateOfBirth
        isProfileUpdated
        isValidatedStep1
        isValidatedStep2
        addresss
        cellphone
        role
        subrole
        status
        email
        wallets {
          nextToken
          __typename
        }
        verifierVerifications {
          nextToken
          __typename
        }
        verifiedVerifications {
          nextToken
          __typename
        }
        userProducts {
          nextToken
          __typename
        }
        documents {
          nextToken
          __typename
        }
        companies {
          nextToken
          __typename
        }
        payments {
          nextToken
          __typename
        }
        marketplaceID
        marketplace {
          id
          name
          oracleTokenName
          oracleWalletID
          adminWalletID
          createdAt
          updatedAt
          __typename
        }
        campaigns {
          nextToken
          __typename
        }
        properties {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      userLegalID
      userLegal {
        id
        name
        dateOfBirth
        isProfileUpdated
        isValidatedStep1
        isValidatedStep2
        addresss
        cellphone
        role
        subrole
        status
        email
        wallets {
          nextToken
          __typename
        }
        verifierVerifications {
          nextToken
          __typename
        }
        verifiedVerifications {
          nextToken
          __typename
        }
        userProducts {
          nextToken
          __typename
        }
        documents {
          nextToken
          __typename
        }
        companies {
          nextToken
          __typename
        }
        payments {
          nextToken
          __typename
        }
        marketplaceID
        marketplace {
          id
          name
          oracleTokenName
          oracleWalletID
          adminWalletID
          createdAt
          updatedAt
          __typename
        }
        campaigns {
          nextToken
          __typename
        }
        properties {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      propertyFeatures {
        items {
          id
          value
          isToBlockChain
          order
          isOnMainCard
          isResult
          propertyID
          feature {
            name
            isVerifable
          }
          documents {
            items {
              id
              status
              url
              signed
              signedHash
              isUploadedToBlockChain
              isApproved
              createdAt
              updatedAt
            }
          }
          verifications {
            items {
              id
              userVerifiedID
              userVerified {
                id
                role
                name
              }
              userVerifierID
              userVerifier {
                id
                role
                name
              }
              verificationComments {
                items {
                  comment
                  verificationID
                  isCommentByVerifier
                  createdAt
                  updatedAt
                }
              }
              createdAt
              updatedAt
            }
          }
          featureID
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      status
      reason
      createdAt
      updatedAt
      __typename
    }
  }
`;

export const listProperties = `
query ListProperties(
    $filter: ModelPropertyFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProperties(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        userLegalID
        userLegal {
          id
          name
        }
        department
        userID
        user {
          id
          name
        }
        productID
        product {
          categoryID
        }
        campaignID
        campaign {
          id
          userID
          name
          description
        }
        propertyFeatures {
          items {
            id
            featureID
            value
            feature {
              name
              isVerifable
            }
            documents {
              items {
                id
                data
                status
                signed
                signedHash
                isUploadedToBlockChain
                isApproved
              }
            }
            verifications {
              items {
                id
                userVerifierID
                userVerifier {
                  name
                }
                userVerifiedID
                userVerified {
                  name
                }
                verificationComments {
                  items {
                    isCommentByVerifier
                    verificationID
                    comment
                    createdAt
                    updatedAt
                  }
                }
              }
            }
          }
        }
        status
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;

  export const getCampaign = /* GraphQL */ `
  query GetCampaign($id: ID!) {
    getCampaign(id: $id) {
      id
      userID
      products {
        items {
          id
          name
          userProducts {
            items {
              user {
                id
                name
                role
              }
            }
          }
        }
      }
      name
      description
      initialDate
      endDate
      available
      images
      properties {
        items {
          id
          name
          propertyFeatures {
            items {
              id
              featureID
              value
              feature {
                name
                isVerifable
              }
              documents {
                items {
                  id
                  status
                  signed
                  signedHash
                  isUploadedToBlockChain
                  isApproved
                }
              }
              verifications {
                items {
                  id
                  userVerifierID
                  userVerifier {
                    name
                  }
                  userVerifiedID
                  userVerified {
                    name
                  }
                  verificationComments {
                    items {
                      isCommentByVerifier
                      verificationID
                      comment
                      createdAt
                      updatedAt
                    }
                  }
                }
              }
            }
          }
          cadastralNumber
          productID
          campaignID
          userID
          status
          reason
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;