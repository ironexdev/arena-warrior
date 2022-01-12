export default interface ErrorHandlerServiceInterface {
    handle(message: string, error: any): void
}
