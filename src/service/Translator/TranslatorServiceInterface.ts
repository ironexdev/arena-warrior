export default interface TranslatorServiceInterface {
    translate(message: string, values?: object): string
}
