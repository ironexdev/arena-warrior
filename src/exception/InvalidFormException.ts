export default class InvalidFormException extends Error {
    message: string = "Form is not valid"

    constructor(message?: string) {
        super();

        if (message) {
            this.message = message
        }
    }
}
