export const LOGIN_WITHOUT_PASSWORD_MUTATION = `
mutation ($loginWithoutPasswordInput: LoginWithoutPasswordInput!){
  loginWithoutPassword(
    loginWithoutPasswordInput: $loginWithoutPasswordInput
  )
}
`

