import FieldInterface from "@/components/Form/Field/FieldInterface";
import ApiError from "@/api/Error/ApiError";

export default abstract class AbstractForm {
    public valid: boolean = false

    public validate(): void {
        const fields = this.getFields()

        this.valid = true
        fields.forEach((field: FieldInterface) => {
            field.validate()

            if (!field.valid) {
                this.valid = false
            }
        })
    }

    protected abstract getFields(): FieldInterface[]

    protected clearFieldErrors(): void {
        this.getFields().forEach((field: FieldInterface) => {
            field.valid = true
            field.errors = []
        })
    }

    protected getFieldByName(name: string): FieldInterface {
        return (<any>this)[name]
    }

    protected handleFieldValidationErrors(errors: ApiError[]): string|null {
        this.clearFieldErrors()

        for (let error of errors) {
            const category = error.extensions.category ?? null

            if(category === "exceptionMessage")
            {
                return error.message
            }

            if (category !== "Validate" || !error.extensions.field) {
                throw new Error()
            }
        }

        for (let error of errors) {
            const fieldName = error.extensions.field
            const message = error.message
            const field = fieldName ? this.getFieldByName(fieldName) : null

            if (field) {
                field.valid = false
                field.errors.push(message)
            }
        }

        return null
    }
}
