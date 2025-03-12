/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($filter: ModelSubscriptionUserFilterInput) {
    onCreateUser(filter: $filter) {
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
          description
          department
          cadastralNumber
          productID
          campaignID
          userID
          userLegalID
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($filter: ModelSubscriptionUserFilterInput) {
    onUpdateUser(filter: $filter) {
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
          description
          department
          cadastralNumber
          productID
          campaignID
          userID
          userLegalID
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($filter: ModelSubscriptionUserFilterInput) {
    onDeleteUser(filter: $filter) {
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
          description
          department
          cadastralNumber
          productID
          campaignID
          userID
          userLegalID
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
export const onCreateWallet = /* GraphQL */ `
  subscription OnCreateWallet($filter: ModelSubscriptionWalletFilterInput) {
    onCreateWallet(filter: $filter) {
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
export const onUpdateWallet = /* GraphQL */ `
  subscription OnUpdateWallet($filter: ModelSubscriptionWalletFilterInput) {
    onUpdateWallet(filter: $filter) {
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
export const onDeleteWallet = /* GraphQL */ `
  subscription OnDeleteWallet($filter: ModelSubscriptionWalletFilterInput) {
    onDeleteWallet(filter: $filter) {
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
export const onCreateVerification = /* GraphQL */ `
  subscription OnCreateVerification(
    $filter: ModelSubscriptionVerificationFilterInput
  ) {
    onCreateVerification(filter: $filter) {
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
          description
          department
          cadastralNumber
          productID
          campaignID
          userID
          userLegalID
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
export const onUpdateVerification = /* GraphQL */ `
  subscription OnUpdateVerification(
    $filter: ModelSubscriptionVerificationFilterInput
  ) {
    onUpdateVerification(filter: $filter) {
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
          description
          department
          cadastralNumber
          productID
          campaignID
          userID
          userLegalID
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
export const onDeleteVerification = /* GraphQL */ `
  subscription OnDeleteVerification(
    $filter: ModelSubscriptionVerificationFilterInput
  ) {
    onDeleteVerification(filter: $filter) {
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
          description
          department
          cadastralNumber
          productID
          campaignID
          userID
          userLegalID
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
export const onCreateVerificationComment = /* GraphQL */ `
  subscription OnCreateVerificationComment(
    $filter: ModelSubscriptionVerificationCommentFilterInput
  ) {
    onCreateVerificationComment(filter: $filter) {
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
export const onUpdateVerificationComment = /* GraphQL */ `
  subscription OnUpdateVerificationComment(
    $filter: ModelSubscriptionVerificationCommentFilterInput
  ) {
    onUpdateVerificationComment(filter: $filter) {
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
export const onDeleteVerificationComment = /* GraphQL */ `
  subscription OnDeleteVerificationComment(
    $filter: ModelSubscriptionVerificationCommentFilterInput
  ) {
    onDeleteVerificationComment(filter: $filter) {
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
export const onCreateDocument = /* GraphQL */ `
  subscription OnCreateDocument($filter: ModelSubscriptionDocumentFilterInput) {
    onCreateDocument(filter: $filter) {
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
          description
          department
          cadastralNumber
          productID
          campaignID
          userID
          userLegalID
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
export const onUpdateDocument = /* GraphQL */ `
  subscription OnUpdateDocument($filter: ModelSubscriptionDocumentFilterInput) {
    onUpdateDocument(filter: $filter) {
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
          description
          department
          cadastralNumber
          productID
          campaignID
          userID
          userLegalID
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
export const onDeleteDocument = /* GraphQL */ `
  subscription OnDeleteDocument($filter: ModelSubscriptionDocumentFilterInput) {
    onDeleteDocument(filter: $filter) {
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
          description
          department
          cadastralNumber
          productID
          campaignID
          userID
          userLegalID
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
export const onCreateCategory = /* GraphQL */ `
  subscription OnCreateCategory($filter: ModelSubscriptionCategoryFilterInput) {
    onCreateCategory(filter: $filter) {
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
export const onUpdateCategory = /* GraphQL */ `
  subscription OnUpdateCategory($filter: ModelSubscriptionCategoryFilterInput) {
    onUpdateCategory(filter: $filter) {
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
export const onDeleteCategory = /* GraphQL */ `
  subscription OnDeleteCategory($filter: ModelSubscriptionCategoryFilterInput) {
    onDeleteCategory(filter: $filter) {
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
export const onCreateProductItem = /* GraphQL */ `
  subscription OnCreateProductItem(
    $filter: ModelSubscriptionProductItemFilterInput
  ) {
    onCreateProductItem(filter: $filter) {
      id
      name
      type
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateProductItem = /* GraphQL */ `
  subscription OnUpdateProductItem(
    $filter: ModelSubscriptionProductItemFilterInput
  ) {
    onUpdateProductItem(filter: $filter) {
      id
      name
      type
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteProductItem = /* GraphQL */ `
  subscription OnDeleteProductItem(
    $filter: ModelSubscriptionProductItemFilterInput
  ) {
    onDeleteProductItem(filter: $filter) {
      id
      name
      type
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateMarketplace = /* GraphQL */ `
  subscription OnCreateMarketplace(
    $filter: ModelSubscriptionMarketplaceFilterInput
  ) {
    onCreateMarketplace(filter: $filter) {
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
export const onUpdateMarketplace = /* GraphQL */ `
  subscription OnUpdateMarketplace(
    $filter: ModelSubscriptionMarketplaceFilterInput
  ) {
    onUpdateMarketplace(filter: $filter) {
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
export const onDeleteMarketplace = /* GraphQL */ `
  subscription OnDeleteMarketplace(
    $filter: ModelSubscriptionMarketplaceFilterInput
  ) {
    onDeleteMarketplace(filter: $filter) {
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
export const onCreateCampaign = /* GraphQL */ `
  subscription OnCreateCampaign($filter: ModelSubscriptionCampaignFilterInput) {
    onCreateCampaign(filter: $filter) {
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
          description
          department
          cadastralNumber
          productID
          campaignID
          userID
          userLegalID
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
export const onUpdateCampaign = /* GraphQL */ `
  subscription OnUpdateCampaign($filter: ModelSubscriptionCampaignFilterInput) {
    onUpdateCampaign(filter: $filter) {
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
          description
          department
          cadastralNumber
          productID
          campaignID
          userID
          userLegalID
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
export const onDeleteCampaign = /* GraphQL */ `
  subscription OnDeleteCampaign($filter: ModelSubscriptionCampaignFilterInput) {
    onDeleteCampaign(filter: $filter) {
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
          description
          department
          cadastralNumber
          productID
          campaignID
          userID
          userLegalID
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
export const onCreateProperty = /* GraphQL */ `
  subscription OnCreateProperty($filter: ModelSubscriptionPropertyFilterInput) {
    onCreateProperty(filter: $filter) {
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
export const onUpdateProperty = /* GraphQL */ `
  subscription OnUpdateProperty($filter: ModelSubscriptionPropertyFilterInput) {
    onUpdateProperty(filter: $filter) {
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
export const onDeleteProperty = /* GraphQL */ `
  subscription OnDeleteProperty($filter: ModelSubscriptionPropertyFilterInput) {
    onDeleteProperty(filter: $filter) {
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
export const onCreatePropertyFeature = /* GraphQL */ `
  subscription OnCreatePropertyFeature(
    $filter: ModelSubscriptionPropertyFeatureFilterInput
  ) {
    onCreatePropertyFeature(filter: $filter) {
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
export const onUpdatePropertyFeature = /* GraphQL */ `
  subscription OnUpdatePropertyFeature(
    $filter: ModelSubscriptionPropertyFeatureFilterInput
  ) {
    onUpdatePropertyFeature(filter: $filter) {
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
export const onDeletePropertyFeature = /* GraphQL */ `
  subscription OnDeletePropertyFeature(
    $filter: ModelSubscriptionPropertyFeatureFilterInput
  ) {
    onDeletePropertyFeature(filter: $filter) {
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
export const onCreateProduct = /* GraphQL */ `
  subscription OnCreateProduct($filter: ModelSubscriptionProductFilterInput) {
    onCreateProduct(filter: $filter) {
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
          description
          department
          cadastralNumber
          productID
          campaignID
          userID
          userLegalID
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
export const onUpdateProduct = /* GraphQL */ `
  subscription OnUpdateProduct($filter: ModelSubscriptionProductFilterInput) {
    onUpdateProduct(filter: $filter) {
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
          description
          department
          cadastralNumber
          productID
          campaignID
          userID
          userLegalID
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
export const onDeleteProduct = /* GraphQL */ `
  subscription OnDeleteProduct($filter: ModelSubscriptionProductFilterInput) {
    onDeleteProduct(filter: $filter) {
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
          description
          department
          cadastralNumber
          productID
          campaignID
          userID
          userLegalID
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
export const onCreateAnalysis = /* GraphQL */ `
  subscription OnCreateAnalysis($filter: ModelSubscriptionAnalysisFilterInput) {
    onCreateAnalysis(filter: $filter) {
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
export const onUpdateAnalysis = /* GraphQL */ `
  subscription OnUpdateAnalysis($filter: ModelSubscriptionAnalysisFilterInput) {
    onUpdateAnalysis(filter: $filter) {
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
export const onDeleteAnalysis = /* GraphQL */ `
  subscription OnDeleteAnalysis($filter: ModelSubscriptionAnalysisFilterInput) {
    onDeleteAnalysis(filter: $filter) {
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
export const onCreateAnalysisResult = /* GraphQL */ `
  subscription OnCreateAnalysisResult(
    $filter: ModelSubscriptionAnalysisResultFilterInput
  ) {
    onCreateAnalysisResult(filter: $filter) {
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
export const onUpdateAnalysisResult = /* GraphQL */ `
  subscription OnUpdateAnalysisResult(
    $filter: ModelSubscriptionAnalysisResultFilterInput
  ) {
    onUpdateAnalysisResult(filter: $filter) {
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
export const onDeleteAnalysisResult = /* GraphQL */ `
  subscription OnDeleteAnalysisResult(
    $filter: ModelSubscriptionAnalysisResultFilterInput
  ) {
    onDeleteAnalysisResult(filter: $filter) {
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
export const onCreateApiQuery = /* GraphQL */ `
  subscription OnCreateApiQuery($filter: ModelSubscriptionApiQueryFilterInput) {
    onCreateApiQuery(filter: $filter) {
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
export const onUpdateApiQuery = /* GraphQL */ `
  subscription OnUpdateApiQuery($filter: ModelSubscriptionApiQueryFilterInput) {
    onUpdateApiQuery(filter: $filter) {
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
export const onDeleteApiQuery = /* GraphQL */ `
  subscription OnDeleteApiQuery($filter: ModelSubscriptionApiQueryFilterInput) {
    onDeleteApiQuery(filter: $filter) {
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
export const onCreateImage = /* GraphQL */ `
  subscription OnCreateImage($filter: ModelSubscriptionImageFilterInput) {
    onCreateImage(filter: $filter) {
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
export const onUpdateImage = /* GraphQL */ `
  subscription OnUpdateImage($filter: ModelSubscriptionImageFilterInput) {
    onUpdateImage(filter: $filter) {
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
export const onDeleteImage = /* GraphQL */ `
  subscription OnDeleteImage($filter: ModelSubscriptionImageFilterInput) {
    onDeleteImage(filter: $filter) {
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
export const onCreateFeatureType = /* GraphQL */ `
  subscription OnCreateFeatureType(
    $filter: ModelSubscriptionFeatureTypeFilterInput
  ) {
    onCreateFeatureType(filter: $filter) {
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
export const onUpdateFeatureType = /* GraphQL */ `
  subscription OnUpdateFeatureType(
    $filter: ModelSubscriptionFeatureTypeFilterInput
  ) {
    onUpdateFeatureType(filter: $filter) {
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
export const onDeleteFeatureType = /* GraphQL */ `
  subscription OnDeleteFeatureType(
    $filter: ModelSubscriptionFeatureTypeFilterInput
  ) {
    onDeleteFeatureType(filter: $filter) {
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
export const onCreateFeature = /* GraphQL */ `
  subscription OnCreateFeature($filter: ModelSubscriptionFeatureFilterInput) {
    onCreateFeature(filter: $filter) {
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
export const onUpdateFeature = /* GraphQL */ `
  subscription OnUpdateFeature($filter: ModelSubscriptionFeatureFilterInput) {
    onUpdateFeature(filter: $filter) {
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
export const onDeleteFeature = /* GraphQL */ `
  subscription OnDeleteFeature($filter: ModelSubscriptionFeatureFilterInput) {
    onDeleteFeature(filter: $filter) {
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
export const onCreateUnitOfMeasure = /* GraphQL */ `
  subscription OnCreateUnitOfMeasure(
    $filter: ModelSubscriptionUnitOfMeasureFilterInput
  ) {
    onCreateUnitOfMeasure(filter: $filter) {
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
export const onUpdateUnitOfMeasure = /* GraphQL */ `
  subscription OnUpdateUnitOfMeasure(
    $filter: ModelSubscriptionUnitOfMeasureFilterInput
  ) {
    onUpdateUnitOfMeasure(filter: $filter) {
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
export const onDeleteUnitOfMeasure = /* GraphQL */ `
  subscription OnDeleteUnitOfMeasure(
    $filter: ModelSubscriptionUnitOfMeasureFilterInput
  ) {
    onDeleteUnitOfMeasure(filter: $filter) {
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
export const onCreateFormula = /* GraphQL */ `
  subscription OnCreateFormula($filter: ModelSubscriptionFormulaFilterInput) {
    onCreateFormula(filter: $filter) {
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
export const onUpdateFormula = /* GraphQL */ `
  subscription OnUpdateFormula($filter: ModelSubscriptionFormulaFilterInput) {
    onUpdateFormula(filter: $filter) {
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
export const onDeleteFormula = /* GraphQL */ `
  subscription OnDeleteFormula($filter: ModelSubscriptionFormulaFilterInput) {
    onDeleteFormula(filter: $filter) {
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
export const onCreateFeatureFormula = /* GraphQL */ `
  subscription OnCreateFeatureFormula(
    $filter: ModelSubscriptionFeatureFormulaFilterInput
  ) {
    onCreateFeatureFormula(filter: $filter) {
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
export const onUpdateFeatureFormula = /* GraphQL */ `
  subscription OnUpdateFeatureFormula(
    $filter: ModelSubscriptionFeatureFormulaFilterInput
  ) {
    onUpdateFeatureFormula(filter: $filter) {
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
export const onDeleteFeatureFormula = /* GraphQL */ `
  subscription OnDeleteFeatureFormula(
    $filter: ModelSubscriptionFeatureFormulaFilterInput
  ) {
    onDeleteFeatureFormula(filter: $filter) {
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
export const onCreateResult = /* GraphQL */ `
  subscription OnCreateResult($filter: ModelSubscriptionResultFilterInput) {
    onCreateResult(filter: $filter) {
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
export const onUpdateResult = /* GraphQL */ `
  subscription OnUpdateResult($filter: ModelSubscriptionResultFilterInput) {
    onUpdateResult(filter: $filter) {
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
export const onDeleteResult = /* GraphQL */ `
  subscription OnDeleteResult($filter: ModelSubscriptionResultFilterInput) {
    onDeleteResult(filter: $filter) {
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
export const onCreateProductFeature = /* GraphQL */ `
  subscription OnCreateProductFeature(
    $filter: ModelSubscriptionProductFeatureFilterInput
  ) {
    onCreateProductFeature(filter: $filter) {
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
export const onUpdateProductFeature = /* GraphQL */ `
  subscription OnUpdateProductFeature(
    $filter: ModelSubscriptionProductFeatureFilterInput
  ) {
    onUpdateProductFeature(filter: $filter) {
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
export const onDeleteProductFeature = /* GraphQL */ `
  subscription OnDeleteProductFeature(
    $filter: ModelSubscriptionProductFeatureFilterInput
  ) {
    onDeleteProductFeature(filter: $filter) {
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
export const onCreateProductFeatureResult = /* GraphQL */ `
  subscription OnCreateProductFeatureResult(
    $filter: ModelSubscriptionProductFeatureResultFilterInput
  ) {
    onCreateProductFeatureResult(filter: $filter) {
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
export const onUpdateProductFeatureResult = /* GraphQL */ `
  subscription OnUpdateProductFeatureResult(
    $filter: ModelSubscriptionProductFeatureResultFilterInput
  ) {
    onUpdateProductFeatureResult(filter: $filter) {
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
export const onDeleteProductFeatureResult = /* GraphQL */ `
  subscription OnDeleteProductFeatureResult(
    $filter: ModelSubscriptionProductFeatureResultFilterInput
  ) {
    onDeleteProductFeatureResult(filter: $filter) {
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
export const onCreateUserProduct = /* GraphQL */ `
  subscription OnCreateUserProduct(
    $filter: ModelSubscriptionUserProductFilterInput
  ) {
    onCreateUserProduct(filter: $filter) {
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
export const onUpdateUserProduct = /* GraphQL */ `
  subscription OnUpdateUserProduct(
    $filter: ModelSubscriptionUserProductFilterInput
  ) {
    onUpdateUserProduct(filter: $filter) {
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
export const onDeleteUserProduct = /* GraphQL */ `
  subscription OnDeleteUserProduct(
    $filter: ModelSubscriptionUserProductFilterInput
  ) {
    onDeleteUserProduct(filter: $filter) {
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
export const onCreateOrder = /* GraphQL */ `
  subscription OnCreateOrder($filter: ModelSubscriptionOrderFilterInput) {
    onCreateOrder(filter: $filter) {
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
export const onUpdateOrder = /* GraphQL */ `
  subscription OnUpdateOrder($filter: ModelSubscriptionOrderFilterInput) {
    onUpdateOrder(filter: $filter) {
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
export const onDeleteOrder = /* GraphQL */ `
  subscription OnDeleteOrder($filter: ModelSubscriptionOrderFilterInput) {
    onDeleteOrder(filter: $filter) {
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
export const onCreatePayment = /* GraphQL */ `
  subscription OnCreatePayment($filter: ModelSubscriptionPaymentFilterInput) {
    onCreatePayment(filter: $filter) {
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
export const onUpdatePayment = /* GraphQL */ `
  subscription OnUpdatePayment($filter: ModelSubscriptionPaymentFilterInput) {
    onUpdatePayment(filter: $filter) {
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
export const onDeletePayment = /* GraphQL */ `
  subscription OnDeletePayment($filter: ModelSubscriptionPaymentFilterInput) {
    onDeletePayment(filter: $filter) {
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
export const onCreateTransactions = /* GraphQL */ `
  subscription OnCreateTransactions(
    $filter: ModelSubscriptionTransactionsFilterInput
  ) {
    onCreateTransactions(filter: $filter) {
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
export const onUpdateTransactions = /* GraphQL */ `
  subscription OnUpdateTransactions(
    $filter: ModelSubscriptionTransactionsFilterInput
  ) {
    onUpdateTransactions(filter: $filter) {
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
export const onDeleteTransactions = /* GraphQL */ `
  subscription OnDeleteTransactions(
    $filter: ModelSubscriptionTransactionsFilterInput
  ) {
    onDeleteTransactions(filter: $filter) {
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
export const onCreateCompany = /* GraphQL */ `
  subscription OnCreateCompany($filter: ModelSubscriptionCompanyFilterInput) {
    onCreateCompany(filter: $filter) {
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
export const onUpdateCompany = /* GraphQL */ `
  subscription OnUpdateCompany($filter: ModelSubscriptionCompanyFilterInput) {
    onUpdateCompany(filter: $filter) {
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
export const onDeleteCompany = /* GraphQL */ `
  subscription OnDeleteCompany($filter: ModelSubscriptionCompanyFilterInput) {
    onDeleteCompany(filter: $filter) {
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
export const onCreateScript = /* GraphQL */ `
  subscription OnCreateScript($filter: ModelSubscriptionScriptFilterInput) {
    onCreateScript(filter: $filter) {
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
export const onUpdateScript = /* GraphQL */ `
  subscription OnUpdateScript($filter: ModelSubscriptionScriptFilterInput) {
    onUpdateScript(filter: $filter) {
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
export const onDeleteScript = /* GraphQL */ `
  subscription OnDeleteScript($filter: ModelSubscriptionScriptFilterInput) {
    onDeleteScript(filter: $filter) {
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
export const onCreateRate = /* GraphQL */ `
  subscription OnCreateRate($filter: ModelSubscriptionRateFilterInput) {
    onCreateRate(filter: $filter) {
      id
      currency
      value
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateRate = /* GraphQL */ `
  subscription OnUpdateRate($filter: ModelSubscriptionRateFilterInput) {
    onUpdateRate(filter: $filter) {
      id
      currency
      value
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteRate = /* GraphQL */ `
  subscription OnDeleteRate($filter: ModelSubscriptionRateFilterInput) {
    onDeleteRate(filter: $filter) {
      id
      currency
      value
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateToken = /* GraphQL */ `
  subscription OnCreateToken($filter: ModelSubscriptionTokenFilterInput) {
    onCreateToken(filter: $filter) {
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
export const onUpdateToken = /* GraphQL */ `
  subscription OnUpdateToken($filter: ModelSubscriptionTokenFilterInput) {
    onUpdateToken(filter: $filter) {
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
export const onDeleteToken = /* GraphQL */ `
  subscription OnDeleteToken($filter: ModelSubscriptionTokenFilterInput) {
    onDeleteToken(filter: $filter) {
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
export const onCreateClaimedToken = /* GraphQL */ `
  subscription OnCreateClaimedToken(
    $filter: ModelSubscriptionClaimedTokenFilterInput
  ) {
    onCreateClaimedToken(filter: $filter) {
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
export const onUpdateClaimedToken = /* GraphQL */ `
  subscription OnUpdateClaimedToken(
    $filter: ModelSubscriptionClaimedTokenFilterInput
  ) {
    onUpdateClaimedToken(filter: $filter) {
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
export const onDeleteClaimedToken = /* GraphQL */ `
  subscription OnDeleteClaimedToken(
    $filter: ModelSubscriptionClaimedTokenFilterInput
  ) {
    onDeleteClaimedToken(filter: $filter) {
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