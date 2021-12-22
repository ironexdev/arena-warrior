import RuleInterface from "@/components/Form/Rule/RuleInterface";

export default interface FieldInterface {
    title: string
    value: any
    rules: RuleInterface[]
    errors: string[]
    valid: boolean

    validate(): void;
}
