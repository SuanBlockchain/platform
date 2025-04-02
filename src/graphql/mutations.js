/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createNotification = /* GraphQL */ `
  mutation CreateNotification(
    $input: CreateNotificationInput!
    $condition: ModelNotificationConditionInput
  ) {
    createNotification(input: $input, condition: $condition) {
      id
      userOriginID
      userOrigin {
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
        notifications {
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
        notifications {
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
      message
      type
      resourceID
      isRead
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateNotification = /* GraphQL */ `
  mutation UpdateNotification(
    $input: UpdateNotificationInput!
    $condition: ModelNotificationConditionInput
  ) {
    updateNotification(input: $input, condition: $condition) {
      id
      userOriginID
      userOrigin {
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
        notifications {
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
        notifications {
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
      message
      type
      resourceID
      isRead
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteNotification = /* GraphQL */ `
  mutation DeleteNotification(
    $input: DeleteNotificationInput!
    $condition: ModelNotificationConditionInput
  ) {
    deleteNotification(input: $input, condition: $condition) {
      id
      userOriginID
      userOrigin {
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
        notifications {
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
        notifications {
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
      message
      type
      resourceID
      isRead
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
      notifications {
        items {
          id
          userOriginID
          userID
          message
          type
          resourceID
          isRead
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
      notifications {
        items {
          id
          userOriginID
          userID
          message
          type
          resourceID
          isRead
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
      notifications {
        items {
          id
          userOriginID
          userID
          message
          type
          resourceID
          isRead
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
export const createWallet = /* GraphQL */ `
  mutation CreateWallet(
    $input: CreateWalletInput!
    $condition: ModelWalletConditionInput
  ) {
    createWallet(input: $input, condition: $condition) {
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
        notifications {
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
export const updateWallet = /* GraphQL */ `
  mutation UpdateWallet(
    $input: UpdateWalletInput!
    $condition: ModelWalletConditionInput
  ) {
    updateWallet(input: $input, condition: $condition) {
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
        notifications {
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
export const deleteWallet = /* GraphQL */ `
  mutation DeleteWallet(
    $input: DeleteWalletInput!
    $condition: ModelWalletConditionInput
  ) {
    deleteWallet(input: $input, condition: $condition) {
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
        notifications {
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
export const createVerification = /* GraphQL */ `
  mutation CreateVerification(
    $input: CreateVerificationInput!
    $condition: ModelVerificationConditionInput
  ) {
    createVerification(input: $input, condition: $condition) {
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
        notifications {
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
        notifications {
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
export const updateVerification = /* GraphQL */ `
  mutation UpdateVerification(
    $input: UpdateVerificationInput!
    $condition: ModelVerificationConditionInput
  ) {
    updateVerification(input: $input, condition: $condition) {
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
        notifications {
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
        notifications {
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
export const deleteVerification = /* GraphQL */ `
  mutation DeleteVerification(
    $input: DeleteVerificationInput!
    $condition: ModelVerificationConditionInput
  ) {
    deleteVerification(input: $input, condition: $condition) {
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
        notifications {
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
        notifications {
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
export const createVerificationComment = /* GraphQL */ `
  mutation CreateVerificationComment(
    $input: CreateVerificationCommentInput!
    $condition: ModelVerificationCommentConditionInput
  ) {
    createVerificationComment(input: $input, condition: $condition) {
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
export const updateVerificationComment = /* GraphQL */ `
  mutation UpdateVerificationComment(
    $input: UpdateVerificationCommentInput!
    $condition: ModelVerificationCommentConditionInput
  ) {
    updateVerificationComment(input: $input, condition: $condition) {
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
export const deleteVerificationComment = /* GraphQL */ `
  mutation DeleteVerificationComment(
    $input: DeleteVerificationCommentInput!
    $condition: ModelVerificationCommentConditionInput
  ) {
    deleteVerificationComment(input: $input, condition: $condition) {
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
export const createDocument = /* GraphQL */ `
  mutation CreateDocument(
    $input: CreateDocumentInput!
    $condition: ModelDocumentConditionInput
  ) {
    createDocument(input: $input, condition: $condition) {
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
        notifications {
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
export const updateDocument = /* GraphQL */ `
  mutation UpdateDocument(
    $input: UpdateDocumentInput!
    $condition: ModelDocumentConditionInput
  ) {
    updateDocument(input: $input, condition: $condition) {
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
        notifications {
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
export const deleteDocument = /* GraphQL */ `
  mutation DeleteDocument(
    $input: DeleteDocumentInput!
    $condition: ModelDocumentConditionInput
  ) {
    deleteDocument(input: $input, condition: $condition) {
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
        notifications {
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
export const createCategory = /* GraphQL */ `
  mutation CreateCategory(
    $input: CreateCategoryInput!
    $condition: ModelCategoryConditionInput
  ) {
    createCategory(input: $input, condition: $condition) {
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
export const updateCategory = /* GraphQL */ `
  mutation UpdateCategory(
    $input: UpdateCategoryInput!
    $condition: ModelCategoryConditionInput
  ) {
    updateCategory(input: $input, condition: $condition) {
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
export const deleteCategory = /* GraphQL */ `
  mutation DeleteCategory(
    $input: DeleteCategoryInput!
    $condition: ModelCategoryConditionInput
  ) {
    deleteCategory(input: $input, condition: $condition) {
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
export const createProductItem = /* GraphQL */ `
  mutation CreateProductItem(
    $input: CreateProductItemInput!
    $condition: ModelProductItemConditionInput
  ) {
    createProductItem(input: $input, condition: $condition) {
      id
      name
      type
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateProductItem = /* GraphQL */ `
  mutation UpdateProductItem(
    $input: UpdateProductItemInput!
    $condition: ModelProductItemConditionInput
  ) {
    updateProductItem(input: $input, condition: $condition) {
      id
      name
      type
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteProductItem = /* GraphQL */ `
  mutation DeleteProductItem(
    $input: DeleteProductItemInput!
    $condition: ModelProductItemConditionInput
  ) {
    deleteProductItem(input: $input, condition: $condition) {
      id
      name
      type
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createMarketplace = /* GraphQL */ `
  mutation CreateMarketplace(
    $input: CreateMarketplaceInput!
    $condition: ModelMarketplaceConditionInput
  ) {
    createMarketplace(input: $input, condition: $condition) {
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
export const updateMarketplace = /* GraphQL */ `
  mutation UpdateMarketplace(
    $input: UpdateMarketplaceInput!
    $condition: ModelMarketplaceConditionInput
  ) {
    updateMarketplace(input: $input, condition: $condition) {
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
export const deleteMarketplace = /* GraphQL */ `
  mutation DeleteMarketplace(
    $input: DeleteMarketplaceInput!
    $condition: ModelMarketplaceConditionInput
  ) {
    deleteMarketplace(input: $input, condition: $condition) {
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
export const createCampaign = /* GraphQL */ `
  mutation CreateCampaign(
    $input: CreateCampaignInput!
    $condition: ModelCampaignConditionInput
  ) {
    createCampaign(input: $input, condition: $condition) {
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
        notifications {
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
export const updateCampaign = /* GraphQL */ `
  mutation UpdateCampaign(
    $input: UpdateCampaignInput!
    $condition: ModelCampaignConditionInput
  ) {
    updateCampaign(input: $input, condition: $condition) {
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
        notifications {
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
export const deleteCampaign = /* GraphQL */ `
  mutation DeleteCampaign(
    $input: DeleteCampaignInput!
    $condition: ModelCampaignConditionInput
  ) {
    deleteCampaign(input: $input, condition: $condition) {
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
        notifications {
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
export const createProperty = /* GraphQL */ `
  mutation CreateProperty(
    $input: CreatePropertyInput!
    $condition: ModelPropertyConditionInput
  ) {
    createProperty(input: $input, condition: $condition) {
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
        notifications {
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
        notifications {
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
export const updateProperty = /* GraphQL */ `
  mutation UpdateProperty(
    $input: UpdatePropertyInput!
    $condition: ModelPropertyConditionInput
  ) {
    updateProperty(input: $input, condition: $condition) {
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
        notifications {
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
        notifications {
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
export const deleteProperty = /* GraphQL */ `
  mutation DeleteProperty(
    $input: DeletePropertyInput!
    $condition: ModelPropertyConditionInput
  ) {
    deleteProperty(input: $input, condition: $condition) {
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
        notifications {
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
        notifications {
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
export const createPropertyFeature = /* GraphQL */ `
  mutation CreatePropertyFeature(
    $input: CreatePropertyFeatureInput!
    $condition: ModelPropertyFeatureConditionInput
  ) {
    createPropertyFeature(input: $input, condition: $condition) {
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
export const updatePropertyFeature = /* GraphQL */ `
  mutation UpdatePropertyFeature(
    $input: UpdatePropertyFeatureInput!
    $condition: ModelPropertyFeatureConditionInput
  ) {
    updatePropertyFeature(input: $input, condition: $condition) {
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
export const deletePropertyFeature = /* GraphQL */ `
  mutation DeletePropertyFeature(
    $input: DeletePropertyFeatureInput!
    $condition: ModelPropertyFeatureConditionInput
  ) {
    deletePropertyFeature(input: $input, condition: $condition) {
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
export const createProduct = /* GraphQL */ `
  mutation CreateProduct(
    $input: CreateProductInput!
    $condition: ModelProductConditionInput
  ) {
    createProduct(input: $input, condition: $condition) {
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
export const updateProduct = /* GraphQL */ `
  mutation UpdateProduct(
    $input: UpdateProductInput!
    $condition: ModelProductConditionInput
  ) {
    updateProduct(input: $input, condition: $condition) {
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
export const deleteProduct = /* GraphQL */ `
  mutation DeleteProduct(
    $input: DeleteProductInput!
    $condition: ModelProductConditionInput
  ) {
    deleteProduct(input: $input, condition: $condition) {
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
export const createAnalysis = /* GraphQL */ `
  mutation CreateAnalysis(
    $input: CreateAnalysisInput!
    $condition: ModelAnalysisConditionInput
  ) {
    createAnalysis(input: $input, condition: $condition) {
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
export const updateAnalysis = /* GraphQL */ `
  mutation UpdateAnalysis(
    $input: UpdateAnalysisInput!
    $condition: ModelAnalysisConditionInput
  ) {
    updateAnalysis(input: $input, condition: $condition) {
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
export const deleteAnalysis = /* GraphQL */ `
  mutation DeleteAnalysis(
    $input: DeleteAnalysisInput!
    $condition: ModelAnalysisConditionInput
  ) {
    deleteAnalysis(input: $input, condition: $condition) {
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
export const createAnalysisResult = /* GraphQL */ `
  mutation CreateAnalysisResult(
    $input: CreateAnalysisResultInput!
    $condition: ModelAnalysisResultConditionInput
  ) {
    createAnalysisResult(input: $input, condition: $condition) {
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
export const updateAnalysisResult = /* GraphQL */ `
  mutation UpdateAnalysisResult(
    $input: UpdateAnalysisResultInput!
    $condition: ModelAnalysisResultConditionInput
  ) {
    updateAnalysisResult(input: $input, condition: $condition) {
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
export const deleteAnalysisResult = /* GraphQL */ `
  mutation DeleteAnalysisResult(
    $input: DeleteAnalysisResultInput!
    $condition: ModelAnalysisResultConditionInput
  ) {
    deleteAnalysisResult(input: $input, condition: $condition) {
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
export const createApiQuery = /* GraphQL */ `
  mutation CreateApiQuery(
    $input: CreateApiQueryInput!
    $condition: ModelApiQueryConditionInput
  ) {
    createApiQuery(input: $input, condition: $condition) {
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
export const updateApiQuery = /* GraphQL */ `
  mutation UpdateApiQuery(
    $input: UpdateApiQueryInput!
    $condition: ModelApiQueryConditionInput
  ) {
    updateApiQuery(input: $input, condition: $condition) {
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
export const deleteApiQuery = /* GraphQL */ `
  mutation DeleteApiQuery(
    $input: DeleteApiQueryInput!
    $condition: ModelApiQueryConditionInput
  ) {
    deleteApiQuery(input: $input, condition: $condition) {
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
export const createImage = /* GraphQL */ `
  mutation CreateImage(
    $input: CreateImageInput!
    $condition: ModelImageConditionInput
  ) {
    createImage(input: $input, condition: $condition) {
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
export const updateImage = /* GraphQL */ `
  mutation UpdateImage(
    $input: UpdateImageInput!
    $condition: ModelImageConditionInput
  ) {
    updateImage(input: $input, condition: $condition) {
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
export const deleteImage = /* GraphQL */ `
  mutation DeleteImage(
    $input: DeleteImageInput!
    $condition: ModelImageConditionInput
  ) {
    deleteImage(input: $input, condition: $condition) {
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
export const createFeatureType = /* GraphQL */ `
  mutation CreateFeatureType(
    $input: CreateFeatureTypeInput!
    $condition: ModelFeatureTypeConditionInput
  ) {
    createFeatureType(input: $input, condition: $condition) {
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
export const updateFeatureType = /* GraphQL */ `
  mutation UpdateFeatureType(
    $input: UpdateFeatureTypeInput!
    $condition: ModelFeatureTypeConditionInput
  ) {
    updateFeatureType(input: $input, condition: $condition) {
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
export const deleteFeatureType = /* GraphQL */ `
  mutation DeleteFeatureType(
    $input: DeleteFeatureTypeInput!
    $condition: ModelFeatureTypeConditionInput
  ) {
    deleteFeatureType(input: $input, condition: $condition) {
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
export const createFeature = /* GraphQL */ `
  mutation CreateFeature(
    $input: CreateFeatureInput!
    $condition: ModelFeatureConditionInput
  ) {
    createFeature(input: $input, condition: $condition) {
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
export const updateFeature = /* GraphQL */ `
  mutation UpdateFeature(
    $input: UpdateFeatureInput!
    $condition: ModelFeatureConditionInput
  ) {
    updateFeature(input: $input, condition: $condition) {
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
export const deleteFeature = /* GraphQL */ `
  mutation DeleteFeature(
    $input: DeleteFeatureInput!
    $condition: ModelFeatureConditionInput
  ) {
    deleteFeature(input: $input, condition: $condition) {
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
export const createUnitOfMeasure = /* GraphQL */ `
  mutation CreateUnitOfMeasure(
    $input: CreateUnitOfMeasureInput!
    $condition: ModelUnitOfMeasureConditionInput
  ) {
    createUnitOfMeasure(input: $input, condition: $condition) {
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
export const updateUnitOfMeasure = /* GraphQL */ `
  mutation UpdateUnitOfMeasure(
    $input: UpdateUnitOfMeasureInput!
    $condition: ModelUnitOfMeasureConditionInput
  ) {
    updateUnitOfMeasure(input: $input, condition: $condition) {
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
export const deleteUnitOfMeasure = /* GraphQL */ `
  mutation DeleteUnitOfMeasure(
    $input: DeleteUnitOfMeasureInput!
    $condition: ModelUnitOfMeasureConditionInput
  ) {
    deleteUnitOfMeasure(input: $input, condition: $condition) {
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
export const createFormula = /* GraphQL */ `
  mutation CreateFormula(
    $input: CreateFormulaInput!
    $condition: ModelFormulaConditionInput
  ) {
    createFormula(input: $input, condition: $condition) {
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
export const updateFormula = /* GraphQL */ `
  mutation UpdateFormula(
    $input: UpdateFormulaInput!
    $condition: ModelFormulaConditionInput
  ) {
    updateFormula(input: $input, condition: $condition) {
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
export const deleteFormula = /* GraphQL */ `
  mutation DeleteFormula(
    $input: DeleteFormulaInput!
    $condition: ModelFormulaConditionInput
  ) {
    deleteFormula(input: $input, condition: $condition) {
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
export const createFeatureFormula = /* GraphQL */ `
  mutation CreateFeatureFormula(
    $input: CreateFeatureFormulaInput!
    $condition: ModelFeatureFormulaConditionInput
  ) {
    createFeatureFormula(input: $input, condition: $condition) {
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
export const updateFeatureFormula = /* GraphQL */ `
  mutation UpdateFeatureFormula(
    $input: UpdateFeatureFormulaInput!
    $condition: ModelFeatureFormulaConditionInput
  ) {
    updateFeatureFormula(input: $input, condition: $condition) {
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
export const deleteFeatureFormula = /* GraphQL */ `
  mutation DeleteFeatureFormula(
    $input: DeleteFeatureFormulaInput!
    $condition: ModelFeatureFormulaConditionInput
  ) {
    deleteFeatureFormula(input: $input, condition: $condition) {
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
export const createResult = /* GraphQL */ `
  mutation CreateResult(
    $input: CreateResultInput!
    $condition: ModelResultConditionInput
  ) {
    createResult(input: $input, condition: $condition) {
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
export const updateResult = /* GraphQL */ `
  mutation UpdateResult(
    $input: UpdateResultInput!
    $condition: ModelResultConditionInput
  ) {
    updateResult(input: $input, condition: $condition) {
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
export const deleteResult = /* GraphQL */ `
  mutation DeleteResult(
    $input: DeleteResultInput!
    $condition: ModelResultConditionInput
  ) {
    deleteResult(input: $input, condition: $condition) {
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
export const createProductFeature = /* GraphQL */ `
  mutation CreateProductFeature(
    $input: CreateProductFeatureInput!
    $condition: ModelProductFeatureConditionInput
  ) {
    createProductFeature(input: $input, condition: $condition) {
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
export const updateProductFeature = /* GraphQL */ `
  mutation UpdateProductFeature(
    $input: UpdateProductFeatureInput!
    $condition: ModelProductFeatureConditionInput
  ) {
    updateProductFeature(input: $input, condition: $condition) {
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
export const deleteProductFeature = /* GraphQL */ `
  mutation DeleteProductFeature(
    $input: DeleteProductFeatureInput!
    $condition: ModelProductFeatureConditionInput
  ) {
    deleteProductFeature(input: $input, condition: $condition) {
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
export const createProductFeatureResult = /* GraphQL */ `
  mutation CreateProductFeatureResult(
    $input: CreateProductFeatureResultInput!
    $condition: ModelProductFeatureResultConditionInput
  ) {
    createProductFeatureResult(input: $input, condition: $condition) {
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
export const updateProductFeatureResult = /* GraphQL */ `
  mutation UpdateProductFeatureResult(
    $input: UpdateProductFeatureResultInput!
    $condition: ModelProductFeatureResultConditionInput
  ) {
    updateProductFeatureResult(input: $input, condition: $condition) {
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
export const deleteProductFeatureResult = /* GraphQL */ `
  mutation DeleteProductFeatureResult(
    $input: DeleteProductFeatureResultInput!
    $condition: ModelProductFeatureResultConditionInput
  ) {
    deleteProductFeatureResult(input: $input, condition: $condition) {
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
export const createUserProduct = /* GraphQL */ `
  mutation CreateUserProduct(
    $input: CreateUserProductInput!
    $condition: ModelUserProductConditionInput
  ) {
    createUserProduct(input: $input, condition: $condition) {
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
        notifications {
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
export const updateUserProduct = /* GraphQL */ `
  mutation UpdateUserProduct(
    $input: UpdateUserProductInput!
    $condition: ModelUserProductConditionInput
  ) {
    updateUserProduct(input: $input, condition: $condition) {
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
        notifications {
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
export const deleteUserProduct = /* GraphQL */ `
  mutation DeleteUserProduct(
    $input: DeleteUserProductInput!
    $condition: ModelUserProductConditionInput
  ) {
    deleteUserProduct(input: $input, condition: $condition) {
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
        notifications {
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
export const createOrder = /* GraphQL */ `
  mutation CreateOrder(
    $input: CreateOrderInput!
    $condition: ModelOrderConditionInput
  ) {
    createOrder(input: $input, condition: $condition) {
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
export const updateOrder = /* GraphQL */ `
  mutation UpdateOrder(
    $input: UpdateOrderInput!
    $condition: ModelOrderConditionInput
  ) {
    updateOrder(input: $input, condition: $condition) {
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
export const deleteOrder = /* GraphQL */ `
  mutation DeleteOrder(
    $input: DeleteOrderInput!
    $condition: ModelOrderConditionInput
  ) {
    deleteOrder(input: $input, condition: $condition) {
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
export const createPayment = /* GraphQL */ `
  mutation CreatePayment(
    $input: CreatePaymentInput!
    $condition: ModelPaymentConditionInput
  ) {
    createPayment(input: $input, condition: $condition) {
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
        notifications {
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
export const updatePayment = /* GraphQL */ `
  mutation UpdatePayment(
    $input: UpdatePaymentInput!
    $condition: ModelPaymentConditionInput
  ) {
    updatePayment(input: $input, condition: $condition) {
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
        notifications {
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
export const deletePayment = /* GraphQL */ `
  mutation DeletePayment(
    $input: DeletePaymentInput!
    $condition: ModelPaymentConditionInput
  ) {
    deletePayment(input: $input, condition: $condition) {
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
        notifications {
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
export const createTransactions = /* GraphQL */ `
  mutation CreateTransactions(
    $input: CreateTransactionsInput!
    $condition: ModelTransactionsConditionInput
  ) {
    createTransactions(input: $input, condition: $condition) {
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
export const updateTransactions = /* GraphQL */ `
  mutation UpdateTransactions(
    $input: UpdateTransactionsInput!
    $condition: ModelTransactionsConditionInput
  ) {
    updateTransactions(input: $input, condition: $condition) {
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
export const deleteTransactions = /* GraphQL */ `
  mutation DeleteTransactions(
    $input: DeleteTransactionsInput!
    $condition: ModelTransactionsConditionInput
  ) {
    deleteTransactions(input: $input, condition: $condition) {
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
export const createCompany = /* GraphQL */ `
  mutation CreateCompany(
    $input: CreateCompanyInput!
    $condition: ModelCompanyConditionInput
  ) {
    createCompany(input: $input, condition: $condition) {
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
        notifications {
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
export const updateCompany = /* GraphQL */ `
  mutation UpdateCompany(
    $input: UpdateCompanyInput!
    $condition: ModelCompanyConditionInput
  ) {
    updateCompany(input: $input, condition: $condition) {
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
        notifications {
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
export const deleteCompany = /* GraphQL */ `
  mutation DeleteCompany(
    $input: DeleteCompanyInput!
    $condition: ModelCompanyConditionInput
  ) {
    deleteCompany(input: $input, condition: $condition) {
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
        notifications {
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
export const createScript = /* GraphQL */ `
  mutation CreateScript(
    $input: CreateScriptInput!
    $condition: ModelScriptConditionInput
  ) {
    createScript(input: $input, condition: $condition) {
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
export const updateScript = /* GraphQL */ `
  mutation UpdateScript(
    $input: UpdateScriptInput!
    $condition: ModelScriptConditionInput
  ) {
    updateScript(input: $input, condition: $condition) {
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
export const deleteScript = /* GraphQL */ `
  mutation DeleteScript(
    $input: DeleteScriptInput!
    $condition: ModelScriptConditionInput
  ) {
    deleteScript(input: $input, condition: $condition) {
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
export const createRate = /* GraphQL */ `
  mutation CreateRate(
    $input: CreateRateInput!
    $condition: ModelRateConditionInput
  ) {
    createRate(input: $input, condition: $condition) {
      id
      currency
      value
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateRate = /* GraphQL */ `
  mutation UpdateRate(
    $input: UpdateRateInput!
    $condition: ModelRateConditionInput
  ) {
    updateRate(input: $input, condition: $condition) {
      id
      currency
      value
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteRate = /* GraphQL */ `
  mutation DeleteRate(
    $input: DeleteRateInput!
    $condition: ModelRateConditionInput
  ) {
    deleteRate(input: $input, condition: $condition) {
      id
      currency
      value
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createToken = /* GraphQL */ `
  mutation CreateToken(
    $input: CreateTokenInput!
    $condition: ModelTokenConditionInput
  ) {
    createToken(input: $input, condition: $condition) {
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
export const updateToken = /* GraphQL */ `
  mutation UpdateToken(
    $input: UpdateTokenInput!
    $condition: ModelTokenConditionInput
  ) {
    updateToken(input: $input, condition: $condition) {
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
export const deleteToken = /* GraphQL */ `
  mutation DeleteToken(
    $input: DeleteTokenInput!
    $condition: ModelTokenConditionInput
  ) {
    deleteToken(input: $input, condition: $condition) {
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
export const createClaimedToken = /* GraphQL */ `
  mutation CreateClaimedToken(
    $input: CreateClaimedTokenInput!
    $condition: ModelClaimedTokenConditionInput
  ) {
    createClaimedToken(input: $input, condition: $condition) {
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
export const updateClaimedToken = /* GraphQL */ `
  mutation UpdateClaimedToken(
    $input: UpdateClaimedTokenInput!
    $condition: ModelClaimedTokenConditionInput
  ) {
    updateClaimedToken(input: $input, condition: $condition) {
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
export const deleteClaimedToken = /* GraphQL */ `
  mutation DeleteClaimedToken(
    $input: DeleteClaimedTokenInput!
    $condition: ModelClaimedTokenConditionInput
  ) {
    deleteClaimedToken(input: $input, condition: $condition) {
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