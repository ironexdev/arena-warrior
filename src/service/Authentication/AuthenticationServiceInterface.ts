import LoginResponse from "@/api/Authentication/Login/LoginResponse";
import LoginWithoutPasswordResponse from "@/api/Authentication/LoginWithoutPassword/LoginWithoutPasswordResponse";

export default interface AuthenticationServiceInterface {
   login(email: string, password: string): Promise<LoginResponse>

   loginWithoutPassword(authorizationCode: string): Promise<LoginWithoutPasswordResponse>;

   logout(): Promise<boolean>;
}
