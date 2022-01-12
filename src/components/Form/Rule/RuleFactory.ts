import RuleInterface from "@/components/Form/Rule/RuleInterface";
import TranslatorService from "@/service/Translator/TranslatorService";
import RequiredRule from "@/components/Form/Rule/RequiredRule";
import RuleFactoryInterface from "@/components/Form/Rule/RuleFactoryInterface";

export default class RuleFactory implements RuleFactoryInterface {
    constructor(private translatorService: TranslatorService) {
    }

    createRequiredRule(): RuleInterface
    {
        return new RequiredRule(this.translatorService)
    }
}
