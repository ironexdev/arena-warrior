export default interface AuthorizationServiceInterface {
    createAuthorizationToken(email: string, action: string, remember: boolean): Promise<boolean>
}
