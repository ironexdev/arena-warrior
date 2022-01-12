export const CREATE_USER_MUTATION = `
mutation ($createUserInput: CreateUserInput!){
  createUser(
    createUserInput: $createUserInput
  )
}
`
