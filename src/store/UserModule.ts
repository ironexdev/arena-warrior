import {Module, VuexModule, Mutation, getModule} from "vuex-module-decorators"
import {store} from "@/store/index";
import Cookies from "js-cookie";
import {CookieEnum} from "@/enum/CookieEnum";

@Module({dynamic: true, namespaced: true, name: "userModule", store})
export default class UserModule extends VuexModule {
    _authenticated: boolean = false
    _email: string = ""

    @Mutation
    setAuthenticated(authenticated: boolean) {
        if(!authenticated)
        {
            Cookies.remove(CookieEnum.AUTHENTICATION_TOKEN)
        }

        this._authenticated = authenticated
    }

    get authenticated(): boolean {
        return this._authenticated
    }

    @Mutation
    setEmail(email: string) {
        this._email = email
    }

    get email(): string {
        return this._email
    }
}

export const userModule = getModule(UserModule);

