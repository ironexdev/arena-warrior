import {IntlShape} from "@formatjs/intl";
import TranslatorServiceInterface from "@/service/Translator/TranslatorServiceInterface";

export default class TranslatorService implements TranslatorServiceInterface {
    constructor(private translator: IntlShape<string>) {

    }

    translate(message: string, values?: object) {
        return this.translator.formatMessage({id: message, defaultMessage: "MISSING TRANSLATION"}, values)
    }
}
