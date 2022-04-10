export default interface AuthorizationServiceInterface {
    createAuthorizationToken(email: string, action: string): Promise<boolean>
}
