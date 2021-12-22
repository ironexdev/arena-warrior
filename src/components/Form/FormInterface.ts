import FieldInterface from "@/components/Form/Field/FieldInterface";

export default interface FormInterface {
    valid: boolean

    getFields(): FieldInterface[]

    validate(): void;
}
