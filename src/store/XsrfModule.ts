import axios from "axios";
import {ActionContext} from "vuex";
import {State} from "@/store/index";
import {API_XSRF_ENDPOINT} from "@/Config";

type Context = ActionContext<XsrfState, State>;

export interface XsrfState {
    token: string | null
}

export default {
    namespaced: true,
    state: (): XsrfState => ({
        token: null
    }),

    mutations: {
        setToken(state: XsrfState, xsrfToken: string) {
            state.token = xsrfToken;
        },
    },
    actions: {
        init(context: Context) {
            return axios.request({
                    url: API_XSRF_ENDPOINT,
                    method: "GET",
                    withCredentials: true
                }
            ).then(response => {
                const xsrfToken = response.headers["xsrf-token"];

                context.commit("setToken", xsrfToken);
            })
        },
    },
    getters: {
        token(state: XsrfState): string | null {
            return state.token
        }
    }
}
