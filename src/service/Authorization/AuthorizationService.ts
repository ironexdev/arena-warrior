import axios from "axios";
import {API_GRAPHQL_ENDPOINT} from "@/../config/config";
import {CREATE_AUTHORIZATION_TOKEN_MUTATION} from "@/api/Authorization/CreateAuthorizationToken/CreateAuthorizationTokenRequest";
import AuthorizationServiceInterface from "@/service/Authorization/AuthorizationServiceInterface";

export default class AuthorizationService implements AuthorizationServiceInterface {
    constructor() {
    }

    public async createAuthorizationToken(email: string, action: string): Promise<boolean> {
        const response = await axios.request({
                url: API_GRAPHQL_ENDPOINT,
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
                data: {
                    query: CREATE_AUTHORIZATION_TOKEN_MUTATION,
                    variables: {
                        createAuthorizationTokenInput: {
                            email: email,
                            action: action
                        }
                    }
                }
            }
        )

        return response.data.data.createAuthorizationToken
    }
}
