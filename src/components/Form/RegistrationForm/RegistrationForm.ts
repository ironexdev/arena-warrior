import AbstractForm from "@/components/Form/AbstractForm";
import RequiredRule from "@/components/Form/Rule/RequiredRule";
import FieldInterface from "@/components/Form/Field/FieldInterface";
import Field from "@/components/Form/Field/Field";

export default class RegistrationForm extends AbstractForm {

    public firstName: FieldInterface
    public lastName: FieldInterface
    public nickname: FieldInterface
    public email: FieldInterface
    public password: FieldInterface

    constructor() {
        super()

        this.firstName = new Field("First Name", null, [new RequiredRule()])
        this.lastName = new Field("Last Name", null, [new RequiredRule()])
        this.nickname = new Field("Nickname", null, [new RequiredRule()])
        this.email = new Field("E-mail", null, [new RequiredRule()])
        this.password = new Field("Password", null, [new RequiredRule()])
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
}
