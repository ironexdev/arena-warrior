import FormInterface from "@/components/Form/FormInterface";
import FieldInterface from "@/components/Form/Field/FieldInterface";

export default abstract class AbstractForm implements FormInterface {
    public valid: boolean = false

    public abstract getFields(): FieldInterface[]

    validate(): void {
        const fields = this.getFields()

        this.valid = true
        fields.forEach((field: FieldInterface) => {
            field.validate()

            if (!field.valid) {
                this.valid = false
            }
        })
    }
}
