import {Module, VuexModule, Mutation, getModule} from "vuex-module-decorators"
import {store} from "@/store/index";
import Cookies from "js-cookie";
import {CookieEnum} from "@/enum/CookieEnum";
import {DOMAIN} from "../../config/config";

@Module({dynamic: true, namespaced: true, name: "userModule", store})
export default class UserModule extends VuexModule {
    private _authenticated: boolean = false
    private _authenticationCode: string = ""
    private _email: string = ""

    @Mutation
    login(data: {authenticationCode: string, storeCookie: boolean}) {

        if(data.storeCookie)
        {
            Cookies.set(CookieEnum.AUTHENTICATION_CODE, data.authenticationCode, {domain: "." + DOMAIN})
        }

        this._authenticationCode = data.authenticationCode
        this._authenticated = true
    }

    @Mutation
    logout() {
        Cookies.remove(CookieEnum.AUTHENTICATION_CODE, {domain: "." + DOMAIN})
        this._authenticationCode = ""
        this._authenticated = false
    }

    get authenticated(): boolean {
        return this._authenticated
    }

    get authenticationCode(): string {
        return this._authenticationCode
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

