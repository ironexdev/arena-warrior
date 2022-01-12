import axios from "axios";
import {API_GRAPHQL_ENDPOINT} from "@/../config/config";
import {LOGOUT_MUTATION} from "@/api/Authentication/Logout/LogoutRequest";
import {LOGIN_MUTATION} from "@/api/Authentication/Login/LoginRequest";
import {LOGIN_WITHOUT_PASSWORD_MUTATION} from "@/api/Authentication/LoginWithoutPassword/LoginWithoutPasswordRequest";
import UserModule from "@/store/UserModule";
import InvalidEmailOrPasswordException from "@/exception/InvalidEmailOrPasswordException";
import AuthenticationServiceInterface from "@/service/Authentication/AuthenticationServiceInterface";
import {ResponseStatusCodeEnum} from "@/enum/ResponseStatusCodeEnum";

export default class AuthenticationService implements AuthenticationServiceInterface {

    constructor(private userModule: UserModule) {
    }

    public async login(email: string, password: string, remember: boolean): Promise<boolean> {
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
                                password: password,
                                remember: remember
                            }
                        }
                    }
                }
            )

            this.userModule.setAuthenticated(true)

            return response.data.data.login
        } catch (errorResponse: any) {
            if(errorResponse?.response?.status === ResponseStatusCodeEnum.FORBIDDEN)
            {
                throw new InvalidEmailOrPasswordException()
            }

            throw errorResponse
        }
    }

    public async loginWithoutPassword(authorizationToken: string, remember: boolean): Promise<boolean> {
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
                            authorizationToken: authorizationToken,
                            remember: remember
                        }
                    }
                }
            }
        )

        this.userModule.setAuthenticated(true)

        return response.data.data.loginWithoutPassword
    }

    public async logout(): Promise<boolean> {
        const response = await axios.request({
                url: API_GRAPHQL_ENDPOINT,
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
                data: {
                    query: LOGOUT_MUTATION
                }
            }
        )

        this.userModule.setAuthenticated(false)

        return response.data.data.logout
    }
}
