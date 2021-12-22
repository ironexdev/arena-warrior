export const CREATE_USER_MUTATION = `
mutation ($userInput: UserInput!){
  createUser(
    userInput: $userInput
  ){
    firstName,
    lastName,
    nickname,
    email,
    password
  }
}
`
