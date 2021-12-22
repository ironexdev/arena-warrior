import RuleInterface from "@/components/Form/Rule/RuleInterface";
import FieldInterface from "@/components/Form/Field/FieldInterface";

export default class RequiredRule implements RuleInterface {
    validate(field: FieldInterface): boolean{
        return !!field.value
    }

    getErrorMessage(field: FieldInterface): string
    {
        return field.title + " is required."
    }
}
