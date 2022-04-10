export const LOGIN_MUTATION = `
mutation ($loginInput: LoginInput!){
  login(
    loginInput: $loginInput
  )
  {
    authenticationCode
  }  
}
`
