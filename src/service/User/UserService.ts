import axios from "axios";
import {API_GRAPHQL_ENDPOINT} from "@/../config/config";
import {CREATE_USER_MUTATION} from "@/api/User/CreateUser/CreateUserRequest";
import {ACTIVATE_USER_MUTATION} from "@/api/User/ActivateUser/ActivateUserRequest";
import {FETCH_CURRENT_USER_QUERY} from "@/api/User/FetchCurrentUser/FetchCurrentUserRequest";
import FetchCurrentUserResponse from "@/api/User/FetchCurrentUser/FetchCurrentUserResponse";
import UserModule from "@/store/UserModule";
import UserServiceInterface from "@/service/User/UserServiceInterface";

export default class UserService implements UserServiceInterface {
    constructor(private userModule: UserModule) {
    }

    public async activateUser(authorizationToken: string): Promise<boolean> {
        const response = await axios.request({
                url: API_GRAPHQL_ENDPOINT,
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
                data: {
                    query: ACTIVATE_USER_MUTATION,
                    variables: {
                        activateUserInput: {
                            authorizationToken: authorizationToken
                        }
                    }
                }
            }
        )

        return response.data.data.activateUser
    }

    public async createUser(firstName: string, lastName: string, nickname: string, email: string, password: string): Promise<boolean> {
        const response = await axios.request({
                url: API_GRAPHQL_ENDPOINT,
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
                data: {
                    query: CREATE_USER_MUTATION,
                    variables: {
                        createUserInput: {
                            firstName: firstName,
                            lastName: lastName,
                            nickname: nickname,
                            email: email,
                            password: password
                        }
                    }
                }
            }
        )

        return response.data.data.createUser
    }

    public async fetchCurrentUser(): Promise<FetchCurrentUserResponse> {
        const response = await axios.request({
            url: API_GRAPHQL_ENDPOINT + "?query=" + FETCH_CURRENT_USER_QUERY.replace(/\s/g, ""),
            method: "GET",
            withCredentials: true
        })

        return response.data.data.fetchCurrentUser
    }
}
