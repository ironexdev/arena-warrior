import {ErrorMessageEnum} from "@/enum/ErrorMessageEnum";
import {RouteLocationNormalizedLoaded, Router} from "vue-router";
import UserModule from "@/store/UserModule";
import ErrorHandlerServiceInterface from "@/service/ErrorHandler/ErrorHandlerServiceInterface";
import ToastServiceInterface from "@/service/Toast/ToastServiceInterface";
import LoggerServiceInterface from "@/service/Logger/LoggerServiceInterface";
import TranslatorServiceInterface from "@/service/Translator/TranslatorServiceInterface";
import {ResponseStatusCodeEnum} from "@/enum/ResponseStatusCodeEnum";

export default class ErrorHandlerService implements ErrorHandlerServiceInterface {
    constructor(
        private loggerService: LoggerServiceInterface,
        private toastService: ToastServiceInterface,
        private translatorService: TranslatorServiceInterface,
        private router: Router,
        private route: RouteLocationNormalizedLoaded,
        private userModule: UserModule) {
    }

    public handle(message: string, error: any): void {
        const status = error.response?.status ?? 0

        if (status === ResponseStatusCodeEnum.UNAUTHORIZED) { // Redirect to login
            this.userModule.setAuthenticated(false)
            this.router.push("/login?redirect=" + this.route.path);
        } else if (status >= ResponseStatusCodeEnum.INTERNAL_SERVER_ERROR) { // Show server error
            this.toastService.error(this.translatorService.translate(ErrorMessageEnum.SERVER_ERROR))
            this.loggerService.error(message, error)
        } else { // Show general error
            this.toastService.error(this.translatorService.translate(ErrorMessageEnum.GENERAL_ERROR))
            this.loggerService.error(message, error)
        }
    }
}
