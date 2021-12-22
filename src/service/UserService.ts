import axios, {AxiosResponse} from "axios";
import {Store} from "vuex";
import {CREATE_USER_MUTATION} from "@/graphql/UserGraphql";
import {API_AUTHENTICATION_ENDPOINT, API_GRAPHQL_ENDPOINT} from "@/Config";

export default class UserService {

    constructor(private store: Store<any>) {
    }

    public create(firstName: string, lastName: string, nickname: string, email: string, password: string): Promise<AxiosResponse> {
        return axios.request({
                url: API_GRAPHQL_ENDPOINT,
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-XSRF-Token": this.store.getters["XsrfModule/token"]
                },
                withCredentials: true,
                data: {
                    query: CREATE_USER_MUTATION,
                    variables: {
                        userInput: {
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
    }

    public login(email: string, password: string, remember: boolean): Promise<AxiosResponse> {
        return axios.request({
                url: API_AUTHENTICATION_ENDPOINT,
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-XSRF-Token": this.store.getters["XsrfModule/token"]
                },
                withCredentials: true,
                data: {
                    email: email,
                    password: password,
                    remember: remember
                }
            }
        )
    }

    public logout() {
        return axios.request({
                url: API_AUTHENTICATION_ENDPOINT,
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "X-XSRF-Token": this.store.getters["XsrfModule/token"]
                },
                withCredentials: true
            }
        ).then(response => {
            return this.store.dispatch("UserModule/setUnauthenticated")
        })
    }
}
