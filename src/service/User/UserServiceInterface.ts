import FetchCurrentUserResponse from "@/api/User/FetchCurrentUser/FetchCurrentUserResponse";

export default interface UserServiceInterface {
    activateUser(authorizationCode: string): Promise<boolean>

    createUser(firstName: string, lastName: string, nickname: string, email: string, password: string): Promise<boolean>

    fetchCurrentUser(): Promise<FetchCurrentUserResponse>
}
