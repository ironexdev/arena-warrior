import {createStore} from "vuex"
import XsrfModule from "@/store/XsrfModule";
import UserModule from "@/store/UserModule";

export interface State {

}

export default createStore({
    modules: {
        UserModule,
        XsrfModule
    }
})
