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