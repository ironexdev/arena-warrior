import AbstractForm from "@/components/Form/AbstractForm";
import FieldInterface from "@/components/Form/Field/FieldInterface";
import Field from "@/components/Form/Field/Field";
import InvalidFormException from "@/exception/InvalidFormException";
import ApiError from "@/api/Error/ApiError";
import RuleFactoryInterface from "@/components/Form/Rule/RuleFactoryInterface";
import {ResponseStatusCodeEnum} from "@/enum/ResponseStatusCodeEnum";
import AuthorizationServiceInterface from "@/service/Authorization/AuthorizationServiceInterface";
import TranslatorServiceInterface from "@/service/Translator/TranslatorServiceInterface";

export default class LoginWithoutPasswordForm extends AbstractForm {

    public email: FieldInterface
    public remember: FieldInterface

    constructor(
        private authorizationService: AuthorizationServiceInterface,
        private translatorService: TranslatorServiceInterface,
        private ruleFactory: RuleFactoryInterface
    ) {
        super()

        this.email = new Field(this.translatorService.translate("lwp_form_email"), "", [this.ruleFactory.createRequiredRule()])
        this.remember = new Field(this.translatorService.translate("lwp_form_remember"), true, [])
    }

    public getFields(): FieldInterface[] {
        return [
            this.email,
            this.remember
        ]
    }

    public async send(): Promise<boolean> {
        if (!this.valid) {
            throw new InvalidFormException()
        }

        try {
            return await this.authorizationService.createAuthorizationToken(
                this.email.value,
                "login_without_password",
                this.remember.value
            )
        } catch (errorResponse: any) {
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
