import {createApp} from "vue"
import App from "./App.vue"
import router from "./router"
import VueAxios from "vue-axios";
import axios from "axios";
import Toast, {PluginOptions} from "vue-toastification";
import configDi from "@/../config/config-di";
import {createIntl} from "vue-intl";
import {LANGUAGE} from "../config/config";
import messages from "@/../translations/messages.json"
import LoggerService from "@/service/Logger/LoggerService";
import LoggerServiceInterface from "@/service/Logger/LoggerServiceInterface";

let app = createApp(App)

app.use(router)
    .use(VueAxios, axios)
    .use(Toast, <PluginOptions>{
        position: "top-center",
        timeout: 5000,
        closeOnClick: true,
        pauseOnFocusLoss: true,
        pauseOnHover: true,
        draggable: true,
        draggablePercent: 0.6,
        showCloseButtonOnHover: false,
        hideProgressBar: true,
        closeButton: "button",
        icon: {
            iconClass: "material-icons",
            iconChildren: "rocket_launch",
            iconTag: "i"
        },
        rtl: false
    })
    .use(
        createIntl({
            defaultLocale: LANGUAGE,
            locale: LANGUAGE,
            messages: messages
        }))
    .use(configDi)

const loggerService = new LoggerService()
app.provide<LoggerServiceInterface>("LoggerServiceInterface", loggerService)

app.config.errorHandler = (error) => loggerService.uncaughtError(error);

app.mount("#app")

