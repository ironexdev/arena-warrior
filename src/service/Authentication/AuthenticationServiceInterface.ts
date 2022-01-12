export default interface AuthenticationServiceInterface {
   login(email: string, password: string, remember: boolean): Promise<boolean>

   loginWithoutPassword(authorizationToken: string, remember: boolean): Promise<boolean>;

   logout(): Promise<boolean>;
}
