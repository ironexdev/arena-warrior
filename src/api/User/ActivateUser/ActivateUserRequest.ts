export const ACTIVATE_USER_MUTATION = `
mutation ($activateUserInput: ActivateUserInput!){
  activateUser(
    activateUserInput: $activateUserInput
  )
}
`
