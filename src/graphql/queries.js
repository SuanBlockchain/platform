/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
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
        items {
          id
          name
          status
          password
          seed
          address
          stake_address
          isSelected
          claimed_token
          isAdmin
          userID
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      verifierVerifications {
        items {
          id
          createdOn
          updatedOn
          sign
          userVerifierID
          userVerifiedID
          productFeatureID
          propertyFeatureID
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      verifiedVerifications {
        items {
          id
          createdOn
          updatedOn
          sign
          userVerifierID
          userVerifiedID
          productFeatureID
          propertyFeatureID
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      userProducts {
        items {
          id
          isFavorite
          userID
          productID
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      documents {
        items {
          id
          data
          timeStamp
          docHash
          url
          signed
          signedHash
          isApproved
          status
          visible
          isUploadedToBlockChain
          productFeatureID
          propertyFeatureID
          userID
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      companies {
        items {
          id
          name
          description
          userID
          productID
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      payments {
        items {
          id
          orderType
          ref
          walletAddress
          statusCode
          walletStakeAddress
          tokenName
          tokenAmount
          fee
          baseValue
          finalValue
          currency
          exchangeRate
          timestamp
          productID
          userID
          claimedByUser
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      marketplaceID
      marketplace {
        id
        name
        oracleTokenName
        oracleWalletID
        oracleWallet {
          id
          name
          status
          password
          seed
          address
          stake_address
          isSelected
          claimed_token
          isAdmin
          userID
          createdAt
          updatedAt
          __typename
        }
        adminWalletID
        adminWallet {
          id
          name
          status
          password
          seed
          address
          stake_address
          isSelected
          claimed_token
          isAdmin
          userID
          createdAt
          updatedAt
          __typename
        }
        scripts {
          nextToken
          __typename
        }
        products {
          nextToken
          __typename
        }
        users {
          nextToken
          __typename
        }
        claimedToken {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      campaigns {
        items {
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
        nextToken
        __typename
      }
      properties {
        items {
          id
          name
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
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const getWallet = /* GraphQL */ `
  query GetWallet($id: ID!) {
    getWallet(id: $id) {
      id
      name
      status
      password
      seed
      address
      stake_address
      isSelected
      claimed_token
      isAdmin
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
      orders {
        items {
          id
          statusCode
          tokenPolicyId
          tokenName
          tokenAmount
          utxos
          value
          walletBuyerID
          scriptID
          walletID
          productID
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      boughtOrders {
        items {
          id
          statusCode
          tokenPolicyId
          tokenName
          tokenAmount
          utxos
          value
          walletBuyerID
          scriptID
          walletID
          productID
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      transactions {
        items {
          id
          addressOrigin
          addressDestination
          walletID
          txIn
          txOutput
          txCborhex
          txHash
          mint
          scriptDataHash
          metadataUrl
          redeemer
          fees
          network
          type
          productID
          signed
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      claimedToken {
        items {
          id
          marketplaceID
          walletID
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
export const listWallets = /* GraphQL */ `
  query ListWallets(
    $filter: ModelWalletFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listWallets(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        status
        password
        seed
        address
        stake_address
        isSelected
        claimed_token
        isAdmin
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
        orders {
          nextToken
          __typename
        }
        boughtOrders {
          nextToken
          __typename
        }
        transactions {
          nextToken
          __typename
        }
        claimedToken {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getVerification = /* GraphQL */ `
  query GetVerification($id: ID!) {
    getVerification(id: $id) {
      id
      createdOn
      updatedOn
      sign
      userVerifierID
      userVerifier {
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
      userVerifiedID
      userVerified {
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
      productFeatureID
      productFeature {
        id
        value
        isToBlockChain
        order
        isOnMainCard
        isResult
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
          marketplaceID
          campaignID
          createdAt
          updatedAt
          __typename
        }
        featureID
        feature {
          id
          name
          description
          isTemplate
          isVerifable
          defaultValue
          formOrder
          formHint
          formRequired
          formAppearance
          formRelevant
          formConstraint
          formRequiredMessage
          parentID
          featureTypeID
          unitOfMeasureID
          createdAt
          updatedAt
          __typename
        }
        verifications {
          nextToken
          __typename
        }
        documents {
          nextToken
          __typename
        }
        productFeatureResults {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      propertyFeatureID
      propertyFeature {
        id
        value
        isToBlockChain
        order
        isOnMainCard
        isResult
        propertyID
        property {
          id
          name
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
        featureID
        feature {
          id
          name
          description
          isTemplate
          isVerifable
          defaultValue
          formOrder
          formHint
          formRequired
          formAppearance
          formRelevant
          formConstraint
          formRequiredMessage
          parentID
          featureTypeID
          unitOfMeasureID
          createdAt
          updatedAt
          __typename
        }
        verifications {
          nextToken
          __typename
        }
        documents {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      verificationComments {
        items {
          id
          comment
          isCommentByVerifier
          verificationID
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
export const listVerifications = /* GraphQL */ `
  query ListVerifications(
    $filter: ModelVerificationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listVerifications(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        createdOn
        updatedOn
        sign
        userVerifierID
        userVerifier {
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
        userVerifiedID
        userVerified {
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
        productFeatureID
        productFeature {
          id
          value
          isToBlockChain
          order
          isOnMainCard
          isResult
          productID
          featureID
          createdAt
          updatedAt
          __typename
        }
        propertyFeatureID
        propertyFeature {
          id
          value
          isToBlockChain
          order
          isOnMainCard
          isResult
          propertyID
          featureID
          createdAt
          updatedAt
          __typename
        }
        verificationComments {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getVerificationComment = /* GraphQL */ `
  query GetVerificationComment($id: ID!) {
    getVerificationComment(id: $id) {
      id
      comment
      isCommentByVerifier
      verificationID
      verification {
        id
        createdOn
        updatedOn
        sign
        userVerifierID
        userVerifier {
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
        userVerifiedID
        userVerified {
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
        productFeatureID
        productFeature {
          id
          value
          isToBlockChain
          order
          isOnMainCard
          isResult
          productID
          featureID
          createdAt
          updatedAt
          __typename
        }
        propertyFeatureID
        propertyFeature {
          id
          value
          isToBlockChain
          order
          isOnMainCard
          isResult
          propertyID
          featureID
          createdAt
          updatedAt
          __typename
        }
        verificationComments {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listVerificationComments = /* GraphQL */ `
  query ListVerificationComments(
    $filter: ModelVerificationCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listVerificationComments(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        comment
        isCommentByVerifier
        verificationID
        verification {
          id
          createdOn
          updatedOn
          sign
          userVerifierID
          userVerifiedID
          productFeatureID
          propertyFeatureID
          createdAt
          updatedAt
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getDocument = /* GraphQL */ `
  query GetDocument($id: ID!) {
    getDocument(id: $id) {
      id
      data
      timeStamp
      docHash
      url
      signed
      signedHash
      isApproved
      status
      visible
      isUploadedToBlockChain
      productFeatureID
      productFeature {
        id
        value
        isToBlockChain
        order
        isOnMainCard
        isResult
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
          marketplaceID
          campaignID
          createdAt
          updatedAt
          __typename
        }
        featureID
        feature {
          id
          name
          description
          isTemplate
          isVerifable
          defaultValue
          formOrder
          formHint
          formRequired
          formAppearance
          formRelevant
          formConstraint
          formRequiredMessage
          parentID
          featureTypeID
          unitOfMeasureID
          createdAt
          updatedAt
          __typename
        }
        verifications {
          nextToken
          __typename
        }
        documents {
          nextToken
          __typename
        }
        productFeatureResults {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      propertyFeatureID
      propertyFeature {
        id
        value
        isToBlockChain
        order
        isOnMainCard
        isResult
        propertyID
        property {
          id
          name
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
        featureID
        feature {
          id
          name
          description
          isTemplate
          isVerifable
          defaultValue
          formOrder
          formHint
          formRequired
          formAppearance
          formRelevant
          formConstraint
          formRequiredMessage
          parentID
          featureTypeID
          unitOfMeasureID
          createdAt
          updatedAt
          __typename
        }
        verifications {
          nextToken
          __typename
        }
        documents {
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
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listDocuments = /* GraphQL */ `
  query ListDocuments(
    $filter: ModelDocumentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDocuments(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        data
        timeStamp
        docHash
        url
        signed
        signedHash
        isApproved
        status
        visible
        isUploadedToBlockChain
        productFeatureID
        productFeature {
          id
          value
          isToBlockChain
          order
          isOnMainCard
          isResult
          productID
          featureID
          createdAt
          updatedAt
          __typename
        }
        propertyFeatureID
        propertyFeature {
          id
          value
          isToBlockChain
          order
          isOnMainCard
          isResult
          propertyID
          featureID
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
          marketplaceID
          createdAt
          updatedAt
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getCategory = /* GraphQL */ `
  query GetCategory($id: ID!) {
    getCategory(id: $id) {
      id
      name
      isSelected
      products {
        items {
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
          marketplaceID
          campaignID
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
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      nextToken
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
export const getMarketplace = /* GraphQL */ `
  query GetMarketplace($id: ID!) {
    getMarketplace(id: $id) {
      id
      name
      oracleTokenName
      oracleWalletID
      oracleWallet {
        id
        name
        status
        password
        seed
        address
        stake_address
        isSelected
        claimed_token
        isAdmin
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
        orders {
          nextToken
          __typename
        }
        boughtOrders {
          nextToken
          __typename
        }
        transactions {
          nextToken
          __typename
        }
        claimedToken {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      adminWalletID
      adminWallet {
        id
        name
        status
        password
        seed
        address
        stake_address
        isSelected
        claimed_token
        isAdmin
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
        orders {
          nextToken
          __typename
        }
        boughtOrders {
          nextToken
          __typename
        }
        transactions {
          nextToken
          __typename
        }
        claimedToken {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      scripts {
        items {
          id
          scriptParentID
          name
          script_type
          script_category
          marketplaceID
          pbk
          token_name
          cbor
          productID
          testnetAddr
          MainnetAddr
          Active
          base_code
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      products {
        items {
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
          marketplaceID
          campaignID
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      users {
        items {
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
        nextToken
        __typename
      }
      claimedToken {
        items {
          id
          marketplaceID
          walletID
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
export const listMarketplaces = /* GraphQL */ `
  query ListMarketplaces(
    $filter: ModelMarketplaceFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMarketplaces(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        oracleTokenName
        oracleWalletID
        oracleWallet {
          id
          name
          status
          password
          seed
          address
          stake_address
          isSelected
          claimed_token
          isAdmin
          userID
          createdAt
          updatedAt
          __typename
        }
        adminWalletID
        adminWallet {
          id
          name
          status
          password
          seed
          address
          stake_address
          isSelected
          claimed_token
          isAdmin
          userID
          createdAt
          updatedAt
          __typename
        }
        scripts {
          nextToken
          __typename
        }
        products {
          nextToken
          __typename
        }
        users {
          nextToken
          __typename
        }
        claimedToken {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getCampaign = /* GraphQL */ `
  query GetCampaign($id: ID!) {
    getCampaign(id: $id) {
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
      products {
        items {
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
          marketplaceID
          campaignID
          createdAt
          updatedAt
          __typename
        }
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
        items {
          id
          name
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
                name
              }
              userVerifierID
              userVerifier {
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
export const listProperties = /* GraphQL */ `
  query ListProperties(
    $filter: ModelPropertyFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProperties(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
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
          marketplaceID
          campaignID
          createdAt
          updatedAt
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
        propertyFeatures {
          nextToken
          __typename
        }
        status
        reason
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getPropertyFeature = /* GraphQL */ `
  query GetPropertyFeature($id: ID!) {
    getPropertyFeature(id: $id) {
      id
      value
      isToBlockChain
      order
      isOnMainCard
      isResult
      propertyID
      property {
        id
        name
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
          marketplaceID
          campaignID
          createdAt
          updatedAt
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
        propertyFeatures {
          nextToken
          __typename
        }
        status
        reason
        createdAt
        updatedAt
        __typename
      }
      featureID
      feature {
        id
        name
        description
        isTemplate
        isVerifable
        defaultValue
        formOrder
        formHint
        formRequired
        formAppearance
        formRelevant
        formConstraint
        formRequiredMessage
        parentID
        children {
          nextToken
          __typename
        }
        featureTypeID
        featureType {
          id
          name
          description
          createdAt
          updatedAt
          __typename
        }
        unitOfMeasureID
        unitOfMeasure {
          id
          engineeringUnit
          description
          isFloat
          createdAt
          updatedAt
          __typename
        }
        productFeatures {
          nextToken
          __typename
        }
        propertyFeatures {
          nextToken
          __typename
        }
        featureFormulas {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      verifications {
        items {
          id
          createdOn
          updatedOn
          sign
          userVerifierID
          userVerifiedID
          productFeatureID
          propertyFeatureID
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      documents {
        items {
          id
          data
          timeStamp
          docHash
          url
          signed
          signedHash
          isApproved
          status
          visible
          isUploadedToBlockChain
          productFeatureID
          propertyFeatureID
          userID
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
export const listPropertyFeatures = /* GraphQL */ `
  query ListPropertyFeatures(
    $filter: ModelPropertyFeatureFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPropertyFeatures(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        value
        isToBlockChain
        order
        isOnMainCard
        isResult
        propertyID
        property {
          id
          name
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
        featureID
        feature {
          id
          name
          description
          isTemplate
          isVerifable
          defaultValue
          formOrder
          formHint
          formRequired
          formAppearance
          formRelevant
          formConstraint
          formRequiredMessage
          parentID
          featureTypeID
          unitOfMeasureID
          createdAt
          updatedAt
          __typename
        }
        verifications {
          nextToken
          __typename
        }
        documents {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getProduct = /* GraphQL */ `
  query GetProduct($id: ID!) {
    getProduct(id: $id) {
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
        products {
          nextToken
          __typename
        }
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
        oracleWallet {
          id
          name
          status
          password
          seed
          address
          stake_address
          isSelected
          claimed_token
          isAdmin
          userID
          createdAt
          updatedAt
          __typename
        }
        adminWalletID
        adminWallet {
          id
          name
          status
          password
          seed
          address
          stake_address
          isSelected
          claimed_token
          isAdmin
          userID
          createdAt
          updatedAt
          __typename
        }
        scripts {
          nextToken
          __typename
        }
        products {
          nextToken
          __typename
        }
        users {
          nextToken
          __typename
        }
        claimedToken {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      images {
        items {
          id
          imageURL
          format
          title
          imageURLToDisplay
          isOnCarousel
          carouselLabel
          carouselDescription
          isActive
          order
          productID
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
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
          featureID
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      userProducts {
        items {
          id
          isFavorite
          userID
          productID
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      transactions {
        items {
          id
          addressOrigin
          addressDestination
          walletID
          txIn
          txOutput
          txCborhex
          txHash
          mint
          scriptDataHash
          metadataUrl
          redeemer
          fees
          network
          type
          productID
          signed
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      orders {
        items {
          id
          statusCode
          tokenPolicyId
          tokenName
          tokenAmount
          utxos
          value
          walletBuyerID
          scriptID
          walletID
          productID
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      companies {
        items {
          id
          name
          description
          userID
          productID
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      payments {
        items {
          id
          orderType
          ref
          walletAddress
          statusCode
          walletStakeAddress
          tokenName
          tokenAmount
          fee
          baseValue
          finalValue
          currency
          exchangeRate
          timestamp
          productID
          userID
          claimedByUser
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      scripts {
        items {
          id
          scriptParentID
          name
          script_type
          script_category
          marketplaceID
          pbk
          token_name
          cbor
          productID
          testnetAddr
          MainnetAddr
          Active
          base_code
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      tokens {
        items {
          id
          productID
          policyID
          tokenName
          supply
          oraclePrice
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      analysis {
        items {
          id
          productID
          imgAnteriorNombreImg
          imgAnteriorSatellite
          imgAnteriorYear
          imgAnteriorMesInicial
          imgAnteriorMesFinal
          imgAnteriorNubosidadMaxima
          imgAnteriorBandas
          imgPosteriorNombreImg
          imgPosteriorSatellite
          imgPosteriorYear
          imgPosteriorMesInicial
          imgPosteriorMesFinal
          imgPosteriorNubosidadMaxima
          imgPosteriorBandas
          resultados
          ajustado
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      apiQueries {
        items {
          id
          productID
          cedulaCatastral
          imgAnteriorSatellite
          imgAnteriorYear
          imgAnteriorMesInicial
          imgAnteriorMesFinal
          imgAnteriorNubosidadMaxima
          imgPosteriorSatellite
          imgPosteriorYear
          imgPosteriorMesInicial
          imgPosteriorMesFinal
          imgPosteriorNubosidadMaxima
          fechaHoraConsulta
          fechaHoraActualizacion
          verificado
          rawConsulta
          resultadoConsulta
          createdAt
          updatedAt
          __typename
        }
        nextToken
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
      properties {
        items {
          id
          name
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
          nextToken
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
      nextToken
      __typename
    }
  }
`;
export const getAnalysis = /* GraphQL */ `
  query GetAnalysis($id: ID!) {
    getAnalysis(id: $id) {
      id
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
          nextToken
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
      imgAnteriorNombreImg
      imgAnteriorSatellite
      imgAnteriorYear
      imgAnteriorMesInicial
      imgAnteriorMesFinal
      imgAnteriorNubosidadMaxima
      imgAnteriorBandas
      imgPosteriorNombreImg
      imgPosteriorSatellite
      imgPosteriorYear
      imgPosteriorMesInicial
      imgPosteriorMesFinal
      imgPosteriorNubosidadMaxima
      imgPosteriorBandas
      resultados
      ajustado
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listAnalyses = /* GraphQL */ `
  query ListAnalyses(
    $filter: ModelAnalysisFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAnalyses(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
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
          marketplaceID
          campaignID
          createdAt
          updatedAt
          __typename
        }
        imgAnteriorNombreImg
        imgAnteriorSatellite
        imgAnteriorYear
        imgAnteriorMesInicial
        imgAnteriorMesFinal
        imgAnteriorNubosidadMaxima
        imgAnteriorBandas
        imgPosteriorNombreImg
        imgPosteriorSatellite
        imgPosteriorYear
        imgPosteriorMesInicial
        imgPosteriorMesFinal
        imgPosteriorNubosidadMaxima
        imgPosteriorBandas
        resultados
        ajustado
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getAnalysisResult = /* GraphQL */ `
  query GetAnalysisResult($id: ID!) {
    getAnalysisResult(id: $id) {
      id
      fuente
      modelo
      cobertura
      valor
      unidad
      proyecto
      nombreImagen
      data
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listAnalysisResults = /* GraphQL */ `
  query ListAnalysisResults(
    $filter: ModelAnalysisResultFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAnalysisResults(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        fuente
        modelo
        cobertura
        valor
        unidad
        proyecto
        nombreImagen
        data
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getApiQuery = /* GraphQL */ `
  query GetApiQuery($id: ID!) {
    getApiQuery(id: $id) {
      id
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
          nextToken
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
      cedulaCatastral
      imgAnteriorSatellite
      imgAnteriorYear
      imgAnteriorMesInicial
      imgAnteriorMesFinal
      imgAnteriorNubosidadMaxima
      imgPosteriorSatellite
      imgPosteriorYear
      imgPosteriorMesInicial
      imgPosteriorMesFinal
      imgPosteriorNubosidadMaxima
      fechaHoraConsulta
      fechaHoraActualizacion
      verificado
      rawConsulta
      resultadoConsulta
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listApiQueries = /* GraphQL */ `
  query ListApiQueries(
    $filter: ModelApiQueryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listApiQueries(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
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
          marketplaceID
          campaignID
          createdAt
          updatedAt
          __typename
        }
        cedulaCatastral
        imgAnteriorSatellite
        imgAnteriorYear
        imgAnteriorMesInicial
        imgAnteriorMesFinal
        imgAnteriorNubosidadMaxima
        imgPosteriorSatellite
        imgPosteriorYear
        imgPosteriorMesInicial
        imgPosteriorMesFinal
        imgPosteriorNubosidadMaxima
        fechaHoraConsulta
        fechaHoraActualizacion
        verificado
        rawConsulta
        resultadoConsulta
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getImage = /* GraphQL */ `
  query GetImage($id: ID!) {
    getImage(id: $id) {
      id
      imageURL
      format
      title
      imageURLToDisplay
      isOnCarousel
      carouselLabel
      carouselDescription
      isActive
      order
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
          nextToken
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
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listImages = /* GraphQL */ `
  query ListImages(
    $filter: ModelImageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listImages(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        imageURL
        format
        title
        imageURLToDisplay
        isOnCarousel
        carouselLabel
        carouselDescription
        isActive
        order
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
          marketplaceID
          campaignID
          createdAt
          updatedAt
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getFeatureType = /* GraphQL */ `
  query GetFeatureType($id: ID!) {
    getFeatureType(id: $id) {
      id
      name
      description
      features {
        items {
          id
          name
          description
          isTemplate
          isVerifable
          defaultValue
          formOrder
          formHint
          formRequired
          formAppearance
          formRelevant
          formConstraint
          formRequiredMessage
          parentID
          featureTypeID
          unitOfMeasureID
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
export const listFeatureTypes = /* GraphQL */ `
  query ListFeatureTypes(
    $filter: ModelFeatureTypeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFeatureTypes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        features {
          nextToken
          __typename
        }
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
      description
      isTemplate
      isVerifable
      defaultValue
      formOrder
      formHint
      formRequired
      formAppearance
      formRelevant
      formConstraint
      formRequiredMessage
      parentID
      children {
        items {
          id
          name
          description
          isTemplate
          isVerifable
          defaultValue
          formOrder
          formHint
          formRequired
          formAppearance
          formRelevant
          formConstraint
          formRequiredMessage
          parentID
          featureTypeID
          unitOfMeasureID
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      featureTypeID
      featureType {
        id
        name
        description
        features {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      unitOfMeasureID
      unitOfMeasure {
        id
        engineeringUnit
        description
        isFloat
        features {
          nextToken
          __typename
        }
        formulas {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
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
          featureID
          createdAt
          updatedAt
          __typename
        }
        nextToken
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
          featureID
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      featureFormulas {
        items {
          id
          featureID
          formulaID
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
export const listFeatures = /* GraphQL */ `
  query ListFeatures(
    $filter: ModelFeatureFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFeatures(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        isTemplate
        isVerifable
        defaultValue
        formOrder
        formHint
        formRequired
        formAppearance
        formRelevant
        formConstraint
        formRequiredMessage
        parentID
        children {
          nextToken
          __typename
        }
        featureTypeID
        featureType {
          id
          name
          description
          createdAt
          updatedAt
          __typename
        }
        unitOfMeasureID
        unitOfMeasure {
          id
          engineeringUnit
          description
          isFloat
          createdAt
          updatedAt
          __typename
        }
        productFeatures {
          nextToken
          __typename
        }
        propertyFeatures {
          nextToken
          __typename
        }
        featureFormulas {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getUnitOfMeasure = /* GraphQL */ `
  query GetUnitOfMeasure($id: ID!) {
    getUnitOfMeasure(id: $id) {
      id
      engineeringUnit
      description
      isFloat
      features {
        items {
          id
          name
          description
          isTemplate
          isVerifable
          defaultValue
          formOrder
          formHint
          formRequired
          formAppearance
          formRelevant
          formConstraint
          formRequiredMessage
          parentID
          featureTypeID
          unitOfMeasureID
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      formulas {
        items {
          id
          varID
          equation
          unitOfMeasureID
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
export const listUnitOfMeasures = /* GraphQL */ `
  query ListUnitOfMeasures(
    $filter: ModelUnitOfMeasureFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUnitOfMeasures(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        engineeringUnit
        description
        isFloat
        features {
          nextToken
          __typename
        }
        formulas {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getFormula = /* GraphQL */ `
  query GetFormula($id: ID!) {
    getFormula(id: $id) {
      id
      varID
      equation
      unitOfMeasureID
      unitOfMeasure {
        id
        engineeringUnit
        description
        isFloat
        features {
          nextToken
          __typename
        }
        formulas {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      results {
        items {
          id
          varID
          value
          dateTimeStamp
          formulaID
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      featureFormulas {
        items {
          id
          featureID
          formulaID
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
export const listFormulas = /* GraphQL */ `
  query ListFormulas(
    $filter: ModelFormulaFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFormulas(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        varID
        equation
        unitOfMeasureID
        unitOfMeasure {
          id
          engineeringUnit
          description
          isFloat
          createdAt
          updatedAt
          __typename
        }
        results {
          nextToken
          __typename
        }
        featureFormulas {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getFeatureFormula = /* GraphQL */ `
  query GetFeatureFormula($id: ID!) {
    getFeatureFormula(id: $id) {
      id
      featureID
      feature {
        id
        name
        description
        isTemplate
        isVerifable
        defaultValue
        formOrder
        formHint
        formRequired
        formAppearance
        formRelevant
        formConstraint
        formRequiredMessage
        parentID
        children {
          nextToken
          __typename
        }
        featureTypeID
        featureType {
          id
          name
          description
          createdAt
          updatedAt
          __typename
        }
        unitOfMeasureID
        unitOfMeasure {
          id
          engineeringUnit
          description
          isFloat
          createdAt
          updatedAt
          __typename
        }
        productFeatures {
          nextToken
          __typename
        }
        propertyFeatures {
          nextToken
          __typename
        }
        featureFormulas {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      formulaID
      formula {
        id
        varID
        equation
        unitOfMeasureID
        unitOfMeasure {
          id
          engineeringUnit
          description
          isFloat
          createdAt
          updatedAt
          __typename
        }
        results {
          nextToken
          __typename
        }
        featureFormulas {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listFeatureFormulas = /* GraphQL */ `
  query ListFeatureFormulas(
    $filter: ModelFeatureFormulaFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFeatureFormulas(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        featureID
        feature {
          id
          name
          description
          isTemplate
          isVerifable
          defaultValue
          formOrder
          formHint
          formRequired
          formAppearance
          formRelevant
          formConstraint
          formRequiredMessage
          parentID
          featureTypeID
          unitOfMeasureID
          createdAt
          updatedAt
          __typename
        }
        formulaID
        formula {
          id
          varID
          equation
          unitOfMeasureID
          createdAt
          updatedAt
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getResult = /* GraphQL */ `
  query GetResult($id: ID!) {
    getResult(id: $id) {
      id
      varID
      value
      dateTimeStamp
      formulaID
      formula {
        id
        varID
        equation
        unitOfMeasureID
        unitOfMeasure {
          id
          engineeringUnit
          description
          isFloat
          createdAt
          updatedAt
          __typename
        }
        results {
          nextToken
          __typename
        }
        featureFormulas {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      productFeatureResults {
        items {
          id
          isActive
          productFeatureID
          resultID
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
export const listResults = /* GraphQL */ `
  query ListResults(
    $filter: ModelResultFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listResults(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        varID
        value
        dateTimeStamp
        formulaID
        formula {
          id
          varID
          equation
          unitOfMeasureID
          createdAt
          updatedAt
          __typename
        }
        productFeatureResults {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getProductFeature = /* GraphQL */ `
  query GetProductFeature($id: ID!) {
    getProductFeature(id: $id) {
      id
      value
      isToBlockChain
      order
      isOnMainCard
      isResult
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
          nextToken
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
      featureID
      feature {
        id
        name
        description
        isTemplate
        isVerifable
        defaultValue
        formOrder
        formHint
        formRequired
        formAppearance
        formRelevant
        formConstraint
        formRequiredMessage
        parentID
        children {
          nextToken
          __typename
        }
        featureTypeID
        featureType {
          id
          name
          description
          createdAt
          updatedAt
          __typename
        }
        unitOfMeasureID
        unitOfMeasure {
          id
          engineeringUnit
          description
          isFloat
          createdAt
          updatedAt
          __typename
        }
        productFeatures {
          nextToken
          __typename
        }
        propertyFeatures {
          nextToken
          __typename
        }
        featureFormulas {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      verifications {
        items {
          id
          createdOn
          updatedOn
          sign
          userVerifierID
          userVerifiedID
          productFeatureID
          propertyFeatureID
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      documents {
        items {
          id
          data
          timeStamp
          docHash
          url
          signed
          signedHash
          isApproved
          status
          visible
          isUploadedToBlockChain
          productFeatureID
          propertyFeatureID
          userID
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      productFeatureResults {
        items {
          id
          isActive
          productFeatureID
          resultID
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
export const listProductFeatures = /* GraphQL */ `
  query ListProductFeatures(
    $filter: ModelProductFeatureFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProductFeatures(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        value
        isToBlockChain
        order
        isOnMainCard
        isResult
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
          marketplaceID
          campaignID
          createdAt
          updatedAt
          __typename
        }
        featureID
        feature {
          id
          name
          description
          isTemplate
          isVerifable
          defaultValue
          formOrder
          formHint
          formRequired
          formAppearance
          formRelevant
          formConstraint
          formRequiredMessage
          parentID
          featureTypeID
          unitOfMeasureID
          createdAt
          updatedAt
          __typename
        }
        verifications {
          nextToken
          __typename
        }
        documents {
          nextToken
          __typename
        }
        productFeatureResults {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getProductFeatureResult = /* GraphQL */ `
  query GetProductFeatureResult($id: ID!) {
    getProductFeatureResult(id: $id) {
      id
      isActive
      productFeatureID
      productFeature {
        id
        value
        isToBlockChain
        order
        isOnMainCard
        isResult
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
          marketplaceID
          campaignID
          createdAt
          updatedAt
          __typename
        }
        featureID
        feature {
          id
          name
          description
          isTemplate
          isVerifable
          defaultValue
          formOrder
          formHint
          formRequired
          formAppearance
          formRelevant
          formConstraint
          formRequiredMessage
          parentID
          featureTypeID
          unitOfMeasureID
          createdAt
          updatedAt
          __typename
        }
        verifications {
          nextToken
          __typename
        }
        documents {
          nextToken
          __typename
        }
        productFeatureResults {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      resultID
      result {
        id
        varID
        value
        dateTimeStamp
        formulaID
        formula {
          id
          varID
          equation
          unitOfMeasureID
          createdAt
          updatedAt
          __typename
        }
        productFeatureResults {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listProductFeatureResults = /* GraphQL */ `
  query ListProductFeatureResults(
    $filter: ModelProductFeatureResultFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProductFeatureResults(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        isActive
        productFeatureID
        productFeature {
          id
          value
          isToBlockChain
          order
          isOnMainCard
          isResult
          productID
          featureID
          createdAt
          updatedAt
          __typename
        }
        resultID
        result {
          id
          varID
          value
          dateTimeStamp
          formulaID
          createdAt
          updatedAt
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getUserProduct = /* GraphQL */ `
  query GetUserProduct($id: ID!) {
    getUserProduct(id: $id) {
      id
      isFavorite
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
          nextToken
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
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listUserProducts = /* GraphQL */ `
  query ListUserProducts(
    $filter: ModelUserProductFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserProducts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        isFavorite
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
          marketplaceID
          campaignID
          createdAt
          updatedAt
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getOrder = /* GraphQL */ `
  query GetOrder($id: ID!) {
    getOrder(id: $id) {
      id
      statusCode
      tokenPolicyId
      tokenName
      tokenAmount
      utxos
      value
      walletBuyerID
      walletBuyer {
        id
        name
        status
        password
        seed
        address
        stake_address
        isSelected
        claimed_token
        isAdmin
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
        orders {
          nextToken
          __typename
        }
        boughtOrders {
          nextToken
          __typename
        }
        transactions {
          nextToken
          __typename
        }
        claimedToken {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      scriptID
      script {
        id
        scriptParentID
        scripts {
          nextToken
          __typename
        }
        name
        script_type
        script_category
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
        pbk
        token_name
        cbor
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
          marketplaceID
          campaignID
          createdAt
          updatedAt
          __typename
        }
        testnetAddr
        MainnetAddr
        Active
        base_code
        orders {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      walletID
      wallet {
        id
        name
        status
        password
        seed
        address
        stake_address
        isSelected
        claimed_token
        isAdmin
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
        orders {
          nextToken
          __typename
        }
        boughtOrders {
          nextToken
          __typename
        }
        transactions {
          nextToken
          __typename
        }
        claimedToken {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
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
          nextToken
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
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listOrders = /* GraphQL */ `
  query ListOrders(
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOrders(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        statusCode
        tokenPolicyId
        tokenName
        tokenAmount
        utxos
        value
        walletBuyerID
        walletBuyer {
          id
          name
          status
          password
          seed
          address
          stake_address
          isSelected
          claimed_token
          isAdmin
          userID
          createdAt
          updatedAt
          __typename
        }
        scriptID
        script {
          id
          scriptParentID
          name
          script_type
          script_category
          marketplaceID
          pbk
          token_name
          cbor
          productID
          testnetAddr
          MainnetAddr
          Active
          base_code
          createdAt
          updatedAt
          __typename
        }
        walletID
        wallet {
          id
          name
          status
          password
          seed
          address
          stake_address
          isSelected
          claimed_token
          isAdmin
          userID
          createdAt
          updatedAt
          __typename
        }
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
          marketplaceID
          campaignID
          createdAt
          updatedAt
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getPayment = /* GraphQL */ `
  query GetPayment($id: ID!) {
    getPayment(id: $id) {
      id
      orderType
      ref
      walletAddress
      statusCode
      walletStakeAddress
      tokenName
      tokenAmount
      fee
      baseValue
      finalValue
      currency
      exchangeRate
      timestamp
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
          nextToken
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
      claimedByUser
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listPayments = /* GraphQL */ `
  query ListPayments(
    $filter: ModelPaymentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPayments(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        orderType
        ref
        walletAddress
        statusCode
        walletStakeAddress
        tokenName
        tokenAmount
        fee
        baseValue
        finalValue
        currency
        exchangeRate
        timestamp
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
          marketplaceID
          campaignID
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
          marketplaceID
          createdAt
          updatedAt
          __typename
        }
        claimedByUser
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getTransactions = /* GraphQL */ `
  query GetTransactions($id: ID!) {
    getTransactions(id: $id) {
      id
      addressOrigin
      addressDestination
      walletID
      txIn
      txOutput
      txCborhex
      txHash
      mint
      scriptDataHash
      metadataUrl
      redeemer
      fees
      network
      type
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
          nextToken
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
      signed
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listTransactions = /* GraphQL */ `
  query ListTransactions(
    $filter: ModelTransactionsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTransactions(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        addressOrigin
        addressDestination
        walletID
        txIn
        txOutput
        txCborhex
        txHash
        mint
        scriptDataHash
        metadataUrl
        redeemer
        fees
        network
        type
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
          marketplaceID
          campaignID
          createdAt
          updatedAt
          __typename
        }
        signed
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getCompany = /* GraphQL */ `
  query GetCompany($id: ID!) {
    getCompany(id: $id) {
      id
      name
      description
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
          nextToken
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
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listCompanies = /* GraphQL */ `
  query ListCompanies(
    $filter: ModelCompanyFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCompanies(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
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
          marketplaceID
          campaignID
          createdAt
          updatedAt
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getScript = /* GraphQL */ `
  query GetScript($id: ID!) {
    getScript(id: $id) {
      id
      scriptParentID
      scripts {
        items {
          id
          scriptParentID
          name
          script_type
          script_category
          marketplaceID
          pbk
          token_name
          cbor
          productID
          testnetAddr
          MainnetAddr
          Active
          base_code
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      name
      script_type
      script_category
      marketplaceID
      marketplace {
        id
        name
        oracleTokenName
        oracleWalletID
        oracleWallet {
          id
          name
          status
          password
          seed
          address
          stake_address
          isSelected
          claimed_token
          isAdmin
          userID
          createdAt
          updatedAt
          __typename
        }
        adminWalletID
        adminWallet {
          id
          name
          status
          password
          seed
          address
          stake_address
          isSelected
          claimed_token
          isAdmin
          userID
          createdAt
          updatedAt
          __typename
        }
        scripts {
          nextToken
          __typename
        }
        products {
          nextToken
          __typename
        }
        users {
          nextToken
          __typename
        }
        claimedToken {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      pbk
      token_name
      cbor
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
          nextToken
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
      testnetAddr
      MainnetAddr
      Active
      base_code
      orders {
        items {
          id
          statusCode
          tokenPolicyId
          tokenName
          tokenAmount
          utxos
          value
          walletBuyerID
          scriptID
          walletID
          productID
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
export const listScripts = /* GraphQL */ `
  query ListScripts(
    $filter: ModelScriptFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listScripts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        scriptParentID
        scripts {
          nextToken
          __typename
        }
        name
        script_type
        script_category
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
        pbk
        token_name
        cbor
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
          marketplaceID
          campaignID
          createdAt
          updatedAt
          __typename
        }
        testnetAddr
        MainnetAddr
        Active
        base_code
        orders {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getRate = /* GraphQL */ `
  query GetRate($id: ID!) {
    getRate(id: $id) {
      id
      currency
      value
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listRates = /* GraphQL */ `
  query ListRates(
    $filter: ModelRateFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRates(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        currency
        value
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getToken = /* GraphQL */ `
  query GetToken($id: ID!) {
    getToken(id: $id) {
      id
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
          nextToken
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
      policyID
      tokenName
      supply
      oraclePrice
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listTokens = /* GraphQL */ `
  query ListTokens(
    $filter: ModelTokenFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTokens(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
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
          marketplaceID
          campaignID
          createdAt
          updatedAt
          __typename
        }
        policyID
        tokenName
        supply
        oraclePrice
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getClaimedToken = /* GraphQL */ `
  query GetClaimedToken($id: ID!) {
    getClaimedToken(id: $id) {
      id
      marketplaceID
      walletID
      marketplace {
        id
        name
        oracleTokenName
        oracleWalletID
        oracleWallet {
          id
          name
          status
          password
          seed
          address
          stake_address
          isSelected
          claimed_token
          isAdmin
          userID
          createdAt
          updatedAt
          __typename
        }
        adminWalletID
        adminWallet {
          id
          name
          status
          password
          seed
          address
          stake_address
          isSelected
          claimed_token
          isAdmin
          userID
          createdAt
          updatedAt
          __typename
        }
        scripts {
          nextToken
          __typename
        }
        products {
          nextToken
          __typename
        }
        users {
          nextToken
          __typename
        }
        claimedToken {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      wallet {
        id
        name
        status
        password
        seed
        address
        stake_address
        isSelected
        claimed_token
        isAdmin
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
        orders {
          nextToken
          __typename
        }
        boughtOrders {
          nextToken
          __typename
        }
        transactions {
          nextToken
          __typename
        }
        claimedToken {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listClaimedTokens = /* GraphQL */ `
  query ListClaimedTokens(
    $filter: ModelClaimedTokenFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listClaimedTokens(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        marketplaceID
        walletID
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
        wallet {
          id
          name
          status
          password
          seed
          address
          stake_address
          isSelected
          claimed_token
          isAdmin
          userID
          createdAt
          updatedAt
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const usersByMarketplaceID = /* GraphQL */ `
  query UsersByMarketplaceID(
    $marketplaceID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    usersByMarketplaceID(
      marketplaceID: $marketplaceID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const walletsByUserID = /* GraphQL */ `
  query WalletsByUserID(
    $userID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelWalletFilterInput
    $limit: Int
    $nextToken: String
  ) {
    walletsByUserID(
      userID: $userID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        status
        password
        seed
        address
        stake_address
        isSelected
        claimed_token
        isAdmin
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
        orders {
          nextToken
          __typename
        }
        boughtOrders {
          nextToken
          __typename
        }
        transactions {
          nextToken
          __typename
        }
        claimedToken {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const verificationsByUserVerifierID = /* GraphQL */ `
  query VerificationsByUserVerifierID(
    $userVerifierID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelVerificationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    verificationsByUserVerifierID(
      userVerifierID: $userVerifierID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        createdOn
        updatedOn
        sign
        userVerifierID
        userVerifier {
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
        userVerifiedID
        userVerified {
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
        productFeatureID
        productFeature {
          id
          value
          isToBlockChain
          order
          isOnMainCard
          isResult
          productID
          featureID
          createdAt
          updatedAt
          __typename
        }
        propertyFeatureID
        propertyFeature {
          id
          value
          isToBlockChain
          order
          isOnMainCard
          isResult
          propertyID
          featureID
          createdAt
          updatedAt
          __typename
        }
        verificationComments {
        items {
          id
          comment
          isCommentByVerifier
          verificationID
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
      nextToken
      __typename
    }
  }
`;
export const verificationsByUserVerifiedID = /* GraphQL */ `
  query VerificationsByUserVerifiedID(
    $userVerifiedID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelVerificationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    verificationsByUserVerifiedID(
      userVerifiedID: $userVerifiedID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        createdOn
        updatedOn
        sign
        userVerifierID
        userVerifier {
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
        userVerifiedID
        userVerified {
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
        productFeatureID
        productFeature {
          id
          value
          isToBlockChain
          order
          isOnMainCard
          isResult
          productID
          featureID
          createdAt
          updatedAt
          __typename
        }
        propertyFeatureID
        propertyFeature {
          id
          value
          isToBlockChain
          order
          isOnMainCard
          isResult
          propertyID
          featureID
          createdAt
          updatedAt
          __typename
        }
        verificationComments {
        items {
          id
          comment
          isCommentByVerifier
          verificationID
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
      nextToken
      __typename
    }
  }
`;
export const verificationsByProductFeatureID = /* GraphQL */ `
  query VerificationsByProductFeatureID(
    $productFeatureID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelVerificationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    verificationsByProductFeatureID(
      productFeatureID: $productFeatureID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        createdOn
        updatedOn
        sign
        userVerifierID
        userVerifier {
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
        userVerifiedID
        userVerified {
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
        productFeatureID
        productFeature {
          id
          value
          isToBlockChain
          order
          isOnMainCard
          isResult
          productID
          featureID
          createdAt
          updatedAt
          __typename
        }
        propertyFeatureID
        propertyFeature {
          id
          value
          isToBlockChain
          order
          isOnMainCard
          isResult
          propertyID
          featureID
          createdAt
          updatedAt
          __typename
        }
        verificationComments {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const verificationsByPropertyFeatureID = /* GraphQL */ `
  query VerificationsByPropertyFeatureID(
    $propertyFeatureID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelVerificationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    verificationsByPropertyFeatureID(
      propertyFeatureID: $propertyFeatureID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        createdOn
        updatedOn
        sign
        userVerifierID
        userVerifier {
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
        userVerifiedID
        userVerified {
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
        productFeatureID
        productFeature {
          id
          value
          isToBlockChain
          order
          isOnMainCard
          isResult
          productID
          featureID
          createdAt
          updatedAt
          __typename
        }
        propertyFeatureID
        propertyFeature {
          id
          value
          isToBlockChain
          order
          isOnMainCard
          isResult
          propertyID
          featureID
          createdAt
          updatedAt
          __typename
        }
        verificationComments {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const verificationCommentsByVerificationID = /* GraphQL */ `
  query VerificationCommentsByVerificationID(
    $verificationID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelVerificationCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    verificationCommentsByVerificationID(
      verificationID: $verificationID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        comment
        isCommentByVerifier
        verificationID
        verification {
          id
          createdOn
          updatedOn
          sign
          userVerifierID
          userVerifiedID
          productFeatureID
          propertyFeatureID
          createdAt
          updatedAt
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const documentsByProductFeatureID = /* GraphQL */ `
  query DocumentsByProductFeatureID(
    $productFeatureID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelDocumentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    documentsByProductFeatureID(
      productFeatureID: $productFeatureID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        data
        timeStamp
        docHash
        url
        signed
        signedHash
        isApproved
        status
        visible
        isUploadedToBlockChain
        productFeatureID
        productFeature {
          id
          value
          isToBlockChain
          order
          isOnMainCard
          isResult
          productID
          featureID
          createdAt
          updatedAt
          __typename
        }
        propertyFeatureID
        propertyFeature {
          id
          value
          isToBlockChain
          order
          isOnMainCard
          isResult
          propertyID
          featureID
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
          marketplaceID
          createdAt
          updatedAt
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const documentsByPropertyFeatureID = /* GraphQL */ `
  query DocumentsByPropertyFeatureID(
    $propertyFeatureID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelDocumentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    documentsByPropertyFeatureID(
      propertyFeatureID: $propertyFeatureID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        data
        timeStamp
        docHash
        url
        signed
        signedHash
        isApproved
        status
        visible
        isUploadedToBlockChain
        productFeatureID
        productFeature {
          id
          value
          isToBlockChain
          order
          isOnMainCard
          isResult
          productID
          featureID
          createdAt
          updatedAt
          __typename
        }
        propertyFeatureID
        propertyFeature {
          id
          value
          isToBlockChain
          order
          isOnMainCard
          isResult
          propertyID
          featureID
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
          marketplaceID
          createdAt
          updatedAt
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const documentsByUserID = /* GraphQL */ `
  query DocumentsByUserID(
    $userID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelDocumentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    documentsByUserID(
      userID: $userID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        data
        timeStamp
        docHash
        url
        signed
        signedHash
        isApproved
        status
        visible
        isUploadedToBlockChain
        productFeatureID
        productFeature {
          id
          value
          isToBlockChain
          order
          isOnMainCard
          isResult
          productID
          featureID
          createdAt
          updatedAt
          __typename
        }
        propertyFeatureID
        propertyFeature {
          id
          value
          isToBlockChain
          order
          isOnMainCard
          isResult
          propertyID
          featureID
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
          marketplaceID
          createdAt
          updatedAt
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const campaignsByUserID = /* GraphQL */ `
  query CampaignsByUserID(
    $userID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelCampaignFilterInput
    $limit: Int
    $nextToken: String
  ) {
    campaignsByUserID(
      userID: $userID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const propertiesByProductID = /* GraphQL */ `
  query PropertiesByProductID(
    $productID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelPropertyFilterInput
    $limit: Int
    $nextToken: String
  ) {
    propertiesByProductID(
      productID: $productID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
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
          marketplaceID
          campaignID
          createdAt
          updatedAt
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
        propertyFeatures {
          nextToken
          __typename
        }
        status
        reason
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const propertiesByCampaignID = /* GraphQL */ `
  query PropertiesByCampaignID(
    $campaignID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelPropertyFilterInput
    $limit: Int
    $nextToken: String
  ) {
    propertiesByCampaignID(
      campaignID: $campaignID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
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
          marketplaceID
          campaignID
          createdAt
          updatedAt
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
        propertyFeatures {
          nextToken
          __typename
        }
        status
        reason
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const propertiesByUserID = /* GraphQL */ `
  query PropertiesByUserID(
    $userID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelPropertyFilterInput
    $limit: Int
    $nextToken: String
  ) {
    propertiesByUserID(
      userID: $userID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
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
          marketplaceID
          campaignID
          createdAt
          updatedAt
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
        propertyFeatures {
          nextToken
          __typename
        }
        status
        reason
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const propertyFeaturesByPropertyID = /* GraphQL */ `
  query PropertyFeaturesByPropertyID(
    $propertyID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelPropertyFeatureFilterInput
    $limit: Int
    $nextToken: String
  ) {
    propertyFeaturesByPropertyID(
      propertyID: $propertyID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        value
        isToBlockChain
        order
        isOnMainCard
        isResult
        propertyID
        property {
          id
          name
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
        featureID
        feature {
          id
          name
          description
          isTemplate
          isVerifable
          defaultValue
          formOrder
          formHint
          formRequired
          formAppearance
          formRelevant
          formConstraint
          formRequiredMessage
          parentID
          featureTypeID
          unitOfMeasureID
          createdAt
          updatedAt
          __typename
        }
        verifications {
          nextToken
          __typename
        }
        documents {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const propertyFeaturesByFeatureID = /* GraphQL */ `
  query PropertyFeaturesByFeatureID(
    $featureID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelPropertyFeatureFilterInput
    $limit: Int
    $nextToken: String
  ) {
    propertyFeaturesByFeatureID(
      featureID: $featureID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        value
        isToBlockChain
        order
        isOnMainCard
        isResult
        propertyID
        property {
          id
          name
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
        featureID
        feature {
          id
          name
          description
          isTemplate
          isVerifable
          defaultValue
          formOrder
          formHint
          formRequired
          formAppearance
          formRelevant
          formConstraint
          formRequiredMessage
          parentID
          featureTypeID
          unitOfMeasureID
          createdAt
          updatedAt
          __typename
        }
        verifications {
          nextToken
          __typename
        }
        documents {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const productsByCategoryID = /* GraphQL */ `
  query ProductsByCategoryID(
    $categoryID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelProductFilterInput
    $limit: Int
    $nextToken: String
  ) {
    productsByCategoryID(
      categoryID: $categoryID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
          nextToken
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
      nextToken
      __typename
    }
  }
`;
export const productsByMarketplaceID = /* GraphQL */ `
  query ProductsByMarketplaceID(
    $marketplaceID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelProductFilterInput
    $limit: Int
    $nextToken: String
  ) {
    productsByMarketplaceID(
      marketplaceID: $marketplaceID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
          nextToken
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
      nextToken
      __typename
    }
  }
`;
export const productsByCampaignID = /* GraphQL */ `
  query ProductsByCampaignID(
    $campaignID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelProductFilterInput
    $limit: Int
    $nextToken: String
  ) {
    productsByCampaignID(
      campaignID: $campaignID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
          nextToken
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
      nextToken
      __typename
    }
  }
`;
export const analysesByProductID = /* GraphQL */ `
  query AnalysesByProductID(
    $productID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelAnalysisFilterInput
    $limit: Int
    $nextToken: String
  ) {
    analysesByProductID(
      productID: $productID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
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
          marketplaceID
          campaignID
          createdAt
          updatedAt
          __typename
        }
        imgAnteriorNombreImg
        imgAnteriorSatellite
        imgAnteriorYear
        imgAnteriorMesInicial
        imgAnteriorMesFinal
        imgAnteriorNubosidadMaxima
        imgAnteriorBandas
        imgPosteriorNombreImg
        imgPosteriorSatellite
        imgPosteriorYear
        imgPosteriorMesInicial
        imgPosteriorMesFinal
        imgPosteriorNubosidadMaxima
        imgPosteriorBandas
        resultados
        ajustado
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const apiQueriesByProductID = /* GraphQL */ `
  query ApiQueriesByProductID(
    $productID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelApiQueryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    apiQueriesByProductID(
      productID: $productID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
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
          marketplaceID
          campaignID
          createdAt
          updatedAt
          __typename
        }
        cedulaCatastral
        imgAnteriorSatellite
        imgAnteriorYear
        imgAnteriorMesInicial
        imgAnteriorMesFinal
        imgAnteriorNubosidadMaxima
        imgPosteriorSatellite
        imgPosteriorYear
        imgPosteriorMesInicial
        imgPosteriorMesFinal
        imgPosteriorNubosidadMaxima
        fechaHoraConsulta
        fechaHoraActualizacion
        verificado
        rawConsulta
        resultadoConsulta
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const imagesByProductID = /* GraphQL */ `
  query ImagesByProductID(
    $productID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelImageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    imagesByProductID(
      productID: $productID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        imageURL
        format
        title
        imageURLToDisplay
        isOnCarousel
        carouselLabel
        carouselDescription
        isActive
        order
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
          marketplaceID
          campaignID
          createdAt
          updatedAt
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const featureByParent = /* GraphQL */ `
  query FeatureByParent(
    $parentID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelFeatureFilterInput
    $limit: Int
    $nextToken: String
  ) {
    featureByParent(
      parentID: $parentID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        description
        isTemplate
        isVerifable
        defaultValue
        formOrder
        formHint
        formRequired
        formAppearance
        formRelevant
        formConstraint
        formRequiredMessage
        parentID
        children {
          nextToken
          __typename
        }
        featureTypeID
        featureType {
          id
          name
          description
          createdAt
          updatedAt
          __typename
        }
        unitOfMeasureID
        unitOfMeasure {
          id
          engineeringUnit
          description
          isFloat
          createdAt
          updatedAt
          __typename
        }
        productFeatures {
          nextToken
          __typename
        }
        propertyFeatures {
          nextToken
          __typename
        }
        featureFormulas {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const featuresByFeatureTypeID = /* GraphQL */ `
  query FeaturesByFeatureTypeID(
    $featureTypeID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelFeatureFilterInput
    $limit: Int
    $nextToken: String
  ) {
    featuresByFeatureTypeID(
      featureTypeID: $featureTypeID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        description
        isTemplate
        isVerifable
        defaultValue
        formOrder
        formHint
        formRequired
        formAppearance
        formRelevant
        formConstraint
        formRequiredMessage
        parentID
        children {
          nextToken
          __typename
        }
        featureTypeID
        featureType {
          id
          name
          description
          createdAt
          updatedAt
          __typename
        }
        unitOfMeasureID
        unitOfMeasure {
          id
          engineeringUnit
          description
          isFloat
          createdAt
          updatedAt
          __typename
        }
        productFeatures {
          nextToken
          __typename
        }
        propertyFeatures {
          nextToken
          __typename
        }
        featureFormulas {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const featuresByUnitOfMeasureID = /* GraphQL */ `
  query FeaturesByUnitOfMeasureID(
    $unitOfMeasureID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelFeatureFilterInput
    $limit: Int
    $nextToken: String
  ) {
    featuresByUnitOfMeasureID(
      unitOfMeasureID: $unitOfMeasureID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        description
        isTemplate
        isVerifable
        defaultValue
        formOrder
        formHint
        formRequired
        formAppearance
        formRelevant
        formConstraint
        formRequiredMessage
        parentID
        children {
          nextToken
          __typename
        }
        featureTypeID
        featureType {
          id
          name
          description
          createdAt
          updatedAt
          __typename
        }
        unitOfMeasureID
        unitOfMeasure {
          id
          engineeringUnit
          description
          isFloat
          createdAt
          updatedAt
          __typename
        }
        productFeatures {
          nextToken
          __typename
        }
        propertyFeatures {
          nextToken
          __typename
        }
        featureFormulas {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const formulasByUnitOfMeasureID = /* GraphQL */ `
  query FormulasByUnitOfMeasureID(
    $unitOfMeasureID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelFormulaFilterInput
    $limit: Int
    $nextToken: String
  ) {
    formulasByUnitOfMeasureID(
      unitOfMeasureID: $unitOfMeasureID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        varID
        equation
        unitOfMeasureID
        unitOfMeasure {
          id
          engineeringUnit
          description
          isFloat
          createdAt
          updatedAt
          __typename
        }
        results {
          nextToken
          __typename
        }
        featureFormulas {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const featureFormulasByFeatureID = /* GraphQL */ `
  query FeatureFormulasByFeatureID(
    $featureID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelFeatureFormulaFilterInput
    $limit: Int
    $nextToken: String
  ) {
    featureFormulasByFeatureID(
      featureID: $featureID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        featureID
        feature {
          id
          name
          description
          isTemplate
          isVerifable
          defaultValue
          formOrder
          formHint
          formRequired
          formAppearance
          formRelevant
          formConstraint
          formRequiredMessage
          parentID
          featureTypeID
          unitOfMeasureID
          createdAt
          updatedAt
          __typename
        }
        formulaID
        formula {
          id
          varID
          equation
          unitOfMeasureID
          createdAt
          updatedAt
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const featureFormulasByFormulaID = /* GraphQL */ `
  query FeatureFormulasByFormulaID(
    $formulaID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelFeatureFormulaFilterInput
    $limit: Int
    $nextToken: String
  ) {
    featureFormulasByFormulaID(
      formulaID: $formulaID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        featureID
        feature {
          id
          name
          description
          isTemplate
          isVerifable
          defaultValue
          formOrder
          formHint
          formRequired
          formAppearance
          formRelevant
          formConstraint
          formRequiredMessage
          parentID
          featureTypeID
          unitOfMeasureID
          createdAt
          updatedAt
          __typename
        }
        formulaID
        formula {
          id
          varID
          equation
          unitOfMeasureID
          createdAt
          updatedAt
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const resultsByFormulaID = /* GraphQL */ `
  query ResultsByFormulaID(
    $formulaID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelResultFilterInput
    $limit: Int
    $nextToken: String
  ) {
    resultsByFormulaID(
      formulaID: $formulaID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        varID
        value
        dateTimeStamp
        formulaID
        formula {
          id
          varID
          equation
          unitOfMeasureID
          createdAt
          updatedAt
          __typename
        }
        productFeatureResults {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const productFeaturesByProductID = /* GraphQL */ `
  query ProductFeaturesByProductID(
    $productID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelProductFeatureFilterInput
    $limit: Int
    $nextToken: String
  ) {
    productFeaturesByProductID(
      productID: $productID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        value
        isToBlockChain
        order
        isOnMainCard
        isResult
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
          marketplaceID
          campaignID
          createdAt
          updatedAt
          __typename
        }
        featureID
        feature {
          id
          name
          description
          isTemplate
          isVerifable
          defaultValue
          formOrder
          formHint
          formRequired
          formAppearance
          formRelevant
          formConstraint
          formRequiredMessage
          parentID
          featureTypeID
          unitOfMeasureID
          createdAt
          updatedAt
          __typename
        }
        verifications {
          nextToken
          __typename
        }
        documents {
          nextToken
          __typename
        }
        productFeatureResults {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const productFeaturesByFeatureID = /* GraphQL */ `
  query ProductFeaturesByFeatureID(
    $featureID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelProductFeatureFilterInput
    $limit: Int
    $nextToken: String
  ) {
    productFeaturesByFeatureID(
      featureID: $featureID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        value
        isToBlockChain
        order
        isOnMainCard
        isResult
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
          marketplaceID
          campaignID
          createdAt
          updatedAt
          __typename
        }
        featureID
        feature {
          id
          name
          description
          isTemplate
          isVerifable
          defaultValue
          formOrder
          formHint
          formRequired
          formAppearance
          formRelevant
          formConstraint
          formRequiredMessage
          parentID
          featureTypeID
          unitOfMeasureID
          createdAt
          updatedAt
          __typename
        }
        verifications {
          nextToken
          __typename
        }
        documents {
          nextToken
          __typename
        }
        productFeatureResults {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const productFeatureResultsByProductFeatureID = /* GraphQL */ `
  query ProductFeatureResultsByProductFeatureID(
    $productFeatureID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelProductFeatureResultFilterInput
    $limit: Int
    $nextToken: String
  ) {
    productFeatureResultsByProductFeatureID(
      productFeatureID: $productFeatureID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        isActive
        productFeatureID
        productFeature {
          id
          value
          isToBlockChain
          order
          isOnMainCard
          isResult
          productID
          featureID
          createdAt
          updatedAt
          __typename
        }
        resultID
        result {
          id
          varID
          value
          dateTimeStamp
          formulaID
          createdAt
          updatedAt
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const productFeatureResultsByResultID = /* GraphQL */ `
  query ProductFeatureResultsByResultID(
    $resultID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelProductFeatureResultFilterInput
    $limit: Int
    $nextToken: String
  ) {
    productFeatureResultsByResultID(
      resultID: $resultID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        isActive
        productFeatureID
        productFeature {
          id
          value
          isToBlockChain
          order
          isOnMainCard
          isResult
          productID
          featureID
          createdAt
          updatedAt
          __typename
        }
        resultID
        result {
          id
          varID
          value
          dateTimeStamp
          formulaID
          createdAt
          updatedAt
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const userProductsByUserID = /* GraphQL */ `
  query UserProductsByUserID(
    $userID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelUserProductFilterInput
    $limit: Int
    $nextToken: String
  ) {
    userProductsByUserID(
      userID: $userID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        isFavorite
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
          marketplaceID
          campaignID
          createdAt
          updatedAt
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const userProductsByProductID = /* GraphQL */ `
  query UserProductsByProductID(
    $productID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelUserProductFilterInput
    $limit: Int
    $nextToken: String
  ) {
    userProductsByProductID(
      productID: $productID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        isFavorite
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
          marketplaceID
          campaignID
          createdAt
          updatedAt
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const ordersByWalletBuyerID = /* GraphQL */ `
  query OrdersByWalletBuyerID(
    $walletBuyerID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    ordersByWalletBuyerID(
      walletBuyerID: $walletBuyerID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        statusCode
        tokenPolicyId
        tokenName
        tokenAmount
        utxos
        value
        walletBuyerID
        walletBuyer {
          id
          name
          status
          password
          seed
          address
          stake_address
          isSelected
          claimed_token
          isAdmin
          userID
          createdAt
          updatedAt
          __typename
        }
        scriptID
        script {
          id
          scriptParentID
          name
          script_type
          script_category
          marketplaceID
          pbk
          token_name
          cbor
          productID
          testnetAddr
          MainnetAddr
          Active
          base_code
          createdAt
          updatedAt
          __typename
        }
        walletID
        wallet {
          id
          name
          status
          password
          seed
          address
          stake_address
          isSelected
          claimed_token
          isAdmin
          userID
          createdAt
          updatedAt
          __typename
        }
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
          marketplaceID
          campaignID
          createdAt
          updatedAt
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const ordersByScriptID = /* GraphQL */ `
  query OrdersByScriptID(
    $scriptID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    ordersByScriptID(
      scriptID: $scriptID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        statusCode
        tokenPolicyId
        tokenName
        tokenAmount
        utxos
        value
        walletBuyerID
        walletBuyer {
          id
          name
          status
          password
          seed
          address
          stake_address
          isSelected
          claimed_token
          isAdmin
          userID
          createdAt
          updatedAt
          __typename
        }
        scriptID
        script {
          id
          scriptParentID
          name
          script_type
          script_category
          marketplaceID
          pbk
          token_name
          cbor
          productID
          testnetAddr
          MainnetAddr
          Active
          base_code
          createdAt
          updatedAt
          __typename
        }
        walletID
        wallet {
          id
          name
          status
          password
          seed
          address
          stake_address
          isSelected
          claimed_token
          isAdmin
          userID
          createdAt
          updatedAt
          __typename
        }
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
          marketplaceID
          campaignID
          createdAt
          updatedAt
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const ordersByWalletID = /* GraphQL */ `
  query OrdersByWalletID(
    $walletID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    ordersByWalletID(
      walletID: $walletID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        statusCode
        tokenPolicyId
        tokenName
        tokenAmount
        utxos
        value
        walletBuyerID
        walletBuyer {
          id
          name
          status
          password
          seed
          address
          stake_address
          isSelected
          claimed_token
          isAdmin
          userID
          createdAt
          updatedAt
          __typename
        }
        scriptID
        script {
          id
          scriptParentID
          name
          script_type
          script_category
          marketplaceID
          pbk
          token_name
          cbor
          productID
          testnetAddr
          MainnetAddr
          Active
          base_code
          createdAt
          updatedAt
          __typename
        }
        walletID
        wallet {
          id
          name
          status
          password
          seed
          address
          stake_address
          isSelected
          claimed_token
          isAdmin
          userID
          createdAt
          updatedAt
          __typename
        }
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
          marketplaceID
          campaignID
          createdAt
          updatedAt
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const ordersByProductID = /* GraphQL */ `
  query OrdersByProductID(
    $productID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    ordersByProductID(
      productID: $productID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        statusCode
        tokenPolicyId
        tokenName
        tokenAmount
        utxos
        value
        walletBuyerID
        walletBuyer {
          id
          name
          status
          password
          seed
          address
          stake_address
          isSelected
          claimed_token
          isAdmin
          userID
          createdAt
          updatedAt
          __typename
        }
        scriptID
        script {
          id
          scriptParentID
          name
          script_type
          script_category
          marketplaceID
          pbk
          token_name
          cbor
          productID
          testnetAddr
          MainnetAddr
          Active
          base_code
          createdAt
          updatedAt
          __typename
        }
        walletID
        wallet {
          id
          name
          status
          password
          seed
          address
          stake_address
          isSelected
          claimed_token
          isAdmin
          userID
          createdAt
          updatedAt
          __typename
        }
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
          marketplaceID
          campaignID
          createdAt
          updatedAt
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const paymentsByProductID = /* GraphQL */ `
  query PaymentsByProductID(
    $productID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelPaymentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    paymentsByProductID(
      productID: $productID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        orderType
        ref
        walletAddress
        statusCode
        walletStakeAddress
        tokenName
        tokenAmount
        fee
        baseValue
        finalValue
        currency
        exchangeRate
        timestamp
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
          marketplaceID
          campaignID
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
          marketplaceID
          createdAt
          updatedAt
          __typename
        }
        claimedByUser
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const paymentsByUserID = /* GraphQL */ `
  query PaymentsByUserID(
    $userID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelPaymentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    paymentsByUserID(
      userID: $userID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        orderType
        ref
        walletAddress
        statusCode
        walletStakeAddress
        tokenName
        tokenAmount
        fee
        baseValue
        finalValue
        currency
        exchangeRate
        timestamp
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
          marketplaceID
          campaignID
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
          marketplaceID
          createdAt
          updatedAt
          __typename
        }
        claimedByUser
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const transactionsByWalletID = /* GraphQL */ `
  query TransactionsByWalletID(
    $walletID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelTransactionsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    transactionsByWalletID(
      walletID: $walletID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        addressOrigin
        addressDestination
        walletID
        txIn
        txOutput
        txCborhex
        txHash
        mint
        scriptDataHash
        metadataUrl
        redeemer
        fees
        network
        type
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
          marketplaceID
          campaignID
          createdAt
          updatedAt
          __typename
        }
        signed
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const transactionsByProductID = /* GraphQL */ `
  query TransactionsByProductID(
    $productID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelTransactionsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    transactionsByProductID(
      productID: $productID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        addressOrigin
        addressDestination
        walletID
        txIn
        txOutput
        txCborhex
        txHash
        mint
        scriptDataHash
        metadataUrl
        redeemer
        fees
        network
        type
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
          marketplaceID
          campaignID
          createdAt
          updatedAt
          __typename
        }
        signed
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const companiesByUserID = /* GraphQL */ `
  query CompaniesByUserID(
    $userID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelCompanyFilterInput
    $limit: Int
    $nextToken: String
  ) {
    companiesByUserID(
      userID: $userID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        description
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
          marketplaceID
          campaignID
          createdAt
          updatedAt
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const companiesByProductID = /* GraphQL */ `
  query CompaniesByProductID(
    $productID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelCompanyFilterInput
    $limit: Int
    $nextToken: String
  ) {
    companiesByProductID(
      productID: $productID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        description
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
          marketplaceID
          campaignID
          createdAt
          updatedAt
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const scriptsByScriptParentID = /* GraphQL */ `
  query ScriptsByScriptParentID(
    $scriptParentID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelScriptFilterInput
    $limit: Int
    $nextToken: String
  ) {
    scriptsByScriptParentID(
      scriptParentID: $scriptParentID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        scriptParentID
        scripts {
          nextToken
          __typename
        }
        name
        script_type
        script_category
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
        pbk
        token_name
        cbor
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
          marketplaceID
          campaignID
          createdAt
          updatedAt
          __typename
        }
        testnetAddr
        MainnetAddr
        Active
        base_code
        orders {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const scriptsByMarketplaceID = /* GraphQL */ `
  query ScriptsByMarketplaceID(
    $marketplaceID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelScriptFilterInput
    $limit: Int
    $nextToken: String
  ) {
    scriptsByMarketplaceID(
      marketplaceID: $marketplaceID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        scriptParentID
        scripts {
          nextToken
          __typename
        }
        name
        script_type
        script_category
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
        pbk
        token_name
        cbor
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
          marketplaceID
          campaignID
          createdAt
          updatedAt
          __typename
        }
        testnetAddr
        MainnetAddr
        Active
        base_code
        orders {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const scriptsByProductID = /* GraphQL */ `
  query ScriptsByProductID(
    $productID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelScriptFilterInput
    $limit: Int
    $nextToken: String
  ) {
    scriptsByProductID(
      productID: $productID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        scriptParentID
        scripts {
          nextToken
          __typename
        }
        name
        script_type
        script_category
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
        pbk
        token_name
        cbor
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
          marketplaceID
          campaignID
          createdAt
          updatedAt
          __typename
        }
        testnetAddr
        MainnetAddr
        Active
        base_code
        orders {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const tokensByProductID = /* GraphQL */ `
  query TokensByProductID(
    $productID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelTokenFilterInput
    $limit: Int
    $nextToken: String
  ) {
    tokensByProductID(
      productID: $productID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
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
          marketplaceID
          campaignID
          createdAt
          updatedAt
          __typename
        }
        policyID
        tokenName
        supply
        oraclePrice
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const claimedTokensByMarketplaceID = /* GraphQL */ `
  query ClaimedTokensByMarketplaceID(
    $marketplaceID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelClaimedTokenFilterInput
    $limit: Int
    $nextToken: String
  ) {
    claimedTokensByMarketplaceID(
      marketplaceID: $marketplaceID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        marketplaceID
        walletID
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
        wallet {
          id
          name
          status
          password
          seed
          address
          stake_address
          isSelected
          claimed_token
          isAdmin
          userID
          createdAt
          updatedAt
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const claimedTokensByWalletID = /* GraphQL */ `
  query ClaimedTokensByWalletID(
    $walletID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelClaimedTokenFilterInput
    $limit: Int
    $nextToken: String
  ) {
    claimedTokensByWalletID(
      walletID: $walletID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        marketplaceID
        walletID
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
        wallet {
          id
          name
          status
          password
          seed
          address
          stake_address
          isSelected
          claimed_token
          isAdmin
          userID
          createdAt
          updatedAt
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;