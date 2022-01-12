import AbstractForm from "@/components/Form/AbstractForm";
import FieldInterface from "@/components/Form/Field/FieldInterface";
import Field from "@/components/Form/Field/Field";
import ApiError from "@/api/Error/ApiError";
import InvalidFormException from "@/exception/InvalidFormException";
import RuleFactoryInterface from "@/components/Form/Rule/RuleFactoryInterface";
import TranslatorServiceInterface from "@/service/Translator/TranslatorServiceInterface";
import UserServiceInterface from "@/service/User/UserServiceInterface";
import {ResponseStatusCodeEnum} from "@/enum/ResponseStatusCodeEnum";

export default class RegistrationForm extends AbstractForm {

    public firstName: FieldInterface
    public lastName: FieldInterface
    public nickname: FieldInterface
    public email: FieldInterface
    public password: FieldInterface

    constructor(
        private translatorService: TranslatorServiceInterface,
        private userService: UserServiceInterface,
        private ruleFactory: RuleFactoryInterface
    ) {
        super()

        this.firstName = new Field(this.translatorService.translate("registration_form_first_name"), "", [this.ruleFactory.createRequiredRule()])
        this.lastName = new Field(this.translatorService.translate("registration_form_last_name"), "", [this.ruleFactory.createRequiredRule()])
        this.nickname = new Field(this.translatorService.translate("registration_form_nickname"), "", [this.ruleFactory.createRequiredRule()])
        this.email = new Field(this.translatorService.translate("registration_form_email"), "", [this.ruleFactory.createRequiredRule()])
        this.password = new Field(this.translatorService.translate("registration_form_password"), "", [this.ruleFactory.createRequiredRule()])
    }

    public getFields(): FieldInterface[] {
        return [
            this.firstName,
            this.lastName,
            this.nickname,
            this.email,
            this.password
        ]
    }

    public async send(): Promise<boolean> {
        if (!this.valid) {
            throw new InvalidFormException()
        }

        try {
            return await this.userService.createUser(
                this.firstName.value,
                this.lastName.value,
                this.nickname.value,
                this.email.value,
                this.password.value
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
