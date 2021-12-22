import RuleInterface from "@/components/Form/Rule/RuleInterface";
import AbstractField from "@/components/Form/Field/AbstractField";

export default class Field extends AbstractField{
    public title: string;
    public value: any;
    public rules: RuleInterface[];
    public errors: string[];
    public valid: boolean

    constructor(title: string, value: any, rules: RuleInterface[]) {
        super()

        this.title = title
        this.value = value
        this.rules = rules
        this.errors = []
        this.valid = true
    }
}
