import RuleInterface from "@/components/Form/Rule/RuleInterface";
import FieldInterface from "@/components/Form/Field/FieldInterface";

export default abstract class AbstractField implements FieldInterface {
    public abstract title: string;
    public abstract value: any;
    public abstract rules: RuleInterface[];
    public abstract errors: string[];
    public abstract valid: boolean

    public validate() {
        this.errors = []
        this.rules.forEach((rule: RuleInterface) => {
            if (!rule.validate(this)) {
                this.errors.push(rule.getErrorMessage(this))
            }
        })

        this.valid = this.errors.length === 0
    }
}
