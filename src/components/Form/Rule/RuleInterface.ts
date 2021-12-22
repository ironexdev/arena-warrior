import FieldInterface from "@/components/Form/Field/FieldInterface";

export default interface RuleInterface {
    validate(field: FieldInterface): boolean

    getErrorMessage(field: FieldInterface): string
}
