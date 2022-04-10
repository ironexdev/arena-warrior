import axios from "axios";
import {API_GRAPHQL_ENDPOINT} from "@/../config/config";
import {LOGOUT_MUTATION} from "@/api/Authentication/Logout/LogoutRequest";
import {LOGIN_MUTATION} from "@/api/Authentication/Login/LoginRequest";
import {LOGIN_WITHOUT_PASSWORD_MUTATION} from "@/api/Authentication/LoginWithoutPassword/LoginWithoutPasswordRequest";
import UserModule from "@/store/UserModule";
import InvalidEmailOrPasswordException from "@/exception/InvalidEmailOrPasswordException";
import AuthenticationServiceInterface from "@/service/Authentication/AuthenticationServiceInterface";
import {ResponseStatusCodeEnum} from "@/enum/ResponseStatusCodeEnum";
import LoginResponse from "@/api/Authentication/Login/LoginResponse";
import LoginWithoutPasswordResponse from "@/api/Authentication/LoginWithoutPassword/LoginWithoutPasswordResponse";

export default class AuthenticationService implements AuthenticationServiceInterface {
    constructor(private userModule: UserModule) {
    }

    public async login(email: string, password: string): Promise<LoginResponse> {
        try {
            const response = await axios.request({
                    url: API_GRAPHQL_ENDPOINT,
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    withCredentials: true,
                    data: {
                        query: LOGIN_MUTATION,
                        variables: {
                            loginInput: {
                                email: email,
                                password: password
                            }
                        }
                    }
                }
            )

            const responseData = response.data.data.login
            this.userModule.login({authenticationCode: responseData.authenticationCode, storeCookie: true})

            return responseData
        } catch (errorResponse: any) {
            if (errorResponse?.response?.status === ResponseStatusCodeEnum.FORBIDDEN) {
                throw new InvalidEmailOrPasswordException()
            }

            throw errorResponse
        }
    }

    public async loginWithoutPassword(authorizationCode: string): Promise<LoginWithoutPasswordResponse> {
        const response = await axios.request({
                url: API_GRAPHQL_ENDPOINT,
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
                data: {
                    query: LOGIN_WITHOUT_PASSWORD_MUTATION,
                    variables: {
                        loginWithoutPasswordInput: {
                            authorizationCode: authorizationCode
                        }
                    }
                }
            }
        )

        const responseData = response.data.data.loginWithoutPassword
        this.userModule.login({authenticationCode: responseData.authenticationCode, storeCookie: true})

        return responseData
    }

    public async logout(): Promise<boolean> {
        const response = await axios.request({
                url: API_GRAPHQL_ENDPOINT,
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + this.userModule.authenticationCode,
                    "Content-Type": "application/json"
                },
                withCredentials: true,
                data: {
                    query: LOGOUT_MUTATION
                }
            }
        )

        this.userModule.logout()

        return response.data.data.logout
    }
}
