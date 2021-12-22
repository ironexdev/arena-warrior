import {ActionContext} from "vuex";
import {State} from "@/store/index";
import axios from "axios";
import {API_AUTHENTICATION_ENDPOINT, API_XSRF_ENDPOINT} from "@/Config";

type Context = ActionContext<UserState, State>;

export interface UserState {
    authenticated: boolean,
    securelyAuthenticated: boolean // true = authenticated via password or e-mail link, false = authenticated via cookies
}

export default {
    namespaced: true,
    state: (): UserState => ({
        authenticated: false,
        securelyAuthenticated: false
    }),

    mutations: {
        setAuthenticated(state: UserState, authenticated: boolean) {
            state.authenticated = authenticated
        },
        setSecurelyAuthenticated(state: UserState, securelyAuthenticated: boolean) {
            state.securelyAuthenticated = securelyAuthenticated
        },
    },
    actions: {
        init(context: Context) {
            return axios.request({
                    url: API_AUTHENTICATION_ENDPOINT,
                    method: "GET",
                    withCredentials: true
                }
            ).then(response => {
                const authenticated = response.data["authenticated"]
                const securelyAuthenticated = response.data["securely_authenticated"]

                if (securelyAuthenticated) {
                    context.dispatch("setSecurelyAuthenticated")
                } else if (authenticated) {
                    context.dispatch("setAuthenticated")
                }
            })
        },
        setUnauthenticated(context: Context) {
            context.commit("setAuthenticated", false)
            context.commit("setSecurelyAuthenticated", false)
        },
        setAuthenticated(context: Context) {
            context.commit("setAuthenticated", true)
            context.commit("setSecurelyAuthenticated", false)
        },
        setSecurelyAuthenticated(context: Context) {
            context.commit("setAuthenticated", true)
            context.commit("setSecurelyAuthenticated", true)
        }
    },
    getters: {
        authenticated(state: UserState): boolean {
            return state.authenticated
        },
        securelyAuthenticated(state: UserState): boolean {
            return state.securelyAuthenticated
        }
    }
}
