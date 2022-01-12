import RuleInterface from "@/components/Form/Rule/RuleInterface";
import FieldInterface from "@/components/Form/Field/FieldInterface";
import TranslatorServiceInterface from "@/service/Translator/TranslatorServiceInterface";

export default class RequiredRule implements RuleInterface {
    constructor(private translatorService: TranslatorServiceInterface) {
    }

    validate(field: FieldInterface): boolean {
        return !!field.value
    }

    getErrorMessage(field: FieldInterface): string {
        return this.translatorService.translate("form_required_rule", {title: field.title})
    }
}
