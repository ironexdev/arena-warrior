import AbstractForm from "@/components/Form/AbstractForm";
import FieldInterface from "@/components/Form/Field/FieldInterface";
import Field from "@/components/Form/Field/Field";
import ApiError from "@/api/Error/ApiError";
import InvalidFormException from "@/exception/InvalidFormException";
import RuleFactoryInterface from "@/components/Form/Rule/RuleFactoryInterface";
import {ResponseStatusCodeEnum} from "@/enum/ResponseStatusCodeEnum";
import AuthenticationServiceInterface from "@/service/Authentication/AuthenticationServiceInterface";
import TranslatorServiceInterface from "@/service/Translator/TranslatorServiceInterface";

export default class LoginForm extends AbstractForm {

    public email: FieldInterface
    public password: FieldInterface
    public remember: FieldInterface

    constructor(
        private authenticationService: AuthenticationServiceInterface,
        private translatorService: TranslatorServiceInterface,
        private ruleFactory: RuleFactoryInterface
    ) {
        super()

        this.email = new Field(this.translatorService.translate("login_form_email"), "", [this.ruleFactory.createRequiredRule()])
        this.password = new Field(this.translatorService.translate("login_form_password"), "", [this.ruleFactory.createRequiredRule()])
        this.remember = new Field(this.translatorService.translate("login_form_remember"), true, [this.ruleFactory.createRequiredRule()])
    }

    public getFields(): FieldInterface[] {
        return [
            this.email,
            this.password,
            this.remember
        ]
    }

    public async send(): Promise<boolean> {
        if (!this.valid) {
            throw new InvalidFormException()
        }

        try {
            return await this.authenticationService.login(
                this.email.value,
                this.password.value,
                this.remember.value
            )
        } catch (errorResponse: any) {
            // TODO refactor DRY
            const responseStatus = errorResponse?.response?.status;
            const responseData = errorResponse?.response?.data;

            if (responseStatus === ResponseStatusCodeEnum.BAD_REQUEST && responseData) {
                let exceptionMessage = null
                if (responseData) {
                    const errors: ApiError[] = responseData.errors
                    exceptionMessage = this.handleFieldValidationErrors(errors)
                }

                if (exceptionMessage) {
                    throw new InvalidFormException(exceptionMessage)
                } else {
                    throw new InvalidFormException()
                }
            }

            throw errorResponse
        }
    }
}
