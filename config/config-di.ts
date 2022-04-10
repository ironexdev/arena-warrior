import {ToastInterface, useToast} from "vue-toastification";
import {userModule} from "@/store/UserModule";
import {App} from "vue";

import RegistrationForm from "@/components/Form/RegistrationForm/RegistrationForm";
import LoginForm from "@/components/Form/LoginForm/LoginForm";
import LoginWithoutPasswordForm from "@/components/Form/LoginWithoutPasswordForm/LoginWithoutPasswordForm";
import {RouteLocationNormalizedLoaded, Router} from "vue-router";
import RuleFactoryInterface from "@/components/Form/Rule/RuleFactoryInterface";
import RuleFactory from "@/components/Form/Rule/RuleFactory";
import AuthenticationService from "@/service/Authentication/AuthenticationService";
import AuthorizationService from "@/service/Authorization/AuthorizationService";
import LoggerService from "@/service/Logger/LoggerService";
import ToastService from "@/service/Toast/ToastService";
import TranslatorService from "@/service/Translator/TranslatorService";
import ErrorHandlerService from "@/service/ErrorHandler/ErrorHandlerService";
import UserService from "@/service/User/UserService";
import AuthorizationServiceInterface from "@/service/Authorization/AuthorizationServiceInterface";
import AuthenticationServiceInterface from "@/service/Authentication/AuthenticationServiceInterface";
import ErrorHandlerServiceInterface from "@/service/ErrorHandler/ErrorHandlerServiceInterface";
import LoggerServiceInterface from "@/service/Logger/LoggerServiceInterface";
import ToastServiceInterface from "@/service/Toast/ToastServiceInterface";
import TranslatorServiceInterface from "@/service/Translator/TranslatorServiceInterface";
import UserServiceInterface from "@/service/User/UserServiceInterface";

export default {
    install: (app: App) => {
        const router: Router = app.config.globalProperties.$router
        const route: RouteLocationNormalizedLoaded = app.config.globalProperties.$route
        const toast: ToastInterface = useToast()

        // Services
        const authenticationService = new AuthenticationService(userModule)
        const authorizationService = new AuthorizationService()
        const loggerService = new LoggerService()

        const toastService = new ToastService(toast)
        // vue-intl.locale === language iso2 (en) instead of locale (en_US)
        const translatorService = new TranslatorService(app.config.globalProperties.$intl)
        const errorHandlerService = new ErrorHandlerService(
            loggerService,
            toastService,
            translatorService,
            router,
            route,
            userModule
        )
        const userService = new UserService(userModule)

        // Factories
        const ruleFactory = new RuleFactory(translatorService)

        // Services
        app.provide<AuthenticationServiceInterface>("AuthenticationServiceInterface", authenticationService)
        app.provide<AuthorizationServiceInterface>("AuthorizationServiceInterface", authorizationService)
        app.provide<ErrorHandlerServiceInterface>("ErrorHandlerServiceInterface", errorHandlerService)
        app.provide<LoggerServiceInterface>("LoggerServiceInterface", loggerService)
        app.provide<ToastServiceInterface>("ToastServiceInterface", toastService)
        app.provide<TranslatorServiceInterface>("TranslatorServiceInterface", translatorService)
        app.provide<UserServiceInterface>("UserServiceInterface", userService)

        // Forms
        app.provide<RegistrationForm>("RegistrationForm", new RegistrationForm(translatorService, userService, ruleFactory))
        app.provide<LoginForm>("LoginForm", new LoginForm(authenticationService, translatorService, ruleFactory))
        app.provide<LoginWithoutPasswordForm>("LoginWithoutPasswordForm", new LoginWithoutPasswordForm(authorizationService, translatorService, ruleFactory))

        // Factories
        app.provide<RuleFactoryInterface>("RuleFactoryInterface", ruleFactory)
    }
}
