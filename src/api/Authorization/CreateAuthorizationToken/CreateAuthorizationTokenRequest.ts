export const CREATE_AUTHORIZATION_TOKEN_MUTATION = `
mutation ($createAuthorizationTokenInput: CreateAuthorizationTokenInput!){
  createAuthorizationToken(
    createAuthorizationTokenInput: $createAuthorizationTokenInput
  )
}
`
