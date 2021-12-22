import AbstractForm from "@/components/Form/AbstractForm";
import RequiredRule from "@/components/Form/Rule/RequiredRule";
import FieldInterface from "@/components/Form/Field/FieldInterface";
import Field from "@/components/Form/Field/Field";

export default class LoginForm extends AbstractForm {

    public email: FieldInterface
    public password: FieldInterface
    public remember: FieldInterface

    constructor() {
        super()

        this.email = new Field("E-mail", null, [new RequiredRule()])
        this.password = new Field("Password", null, [new RequiredRule()])
        this.remember = new Field("Remember Me", true, [])
    }

    public getFields(): FieldInterface[] {
        return [
            this.email,
            this.password,
            this.remember
        ]
    }
}
