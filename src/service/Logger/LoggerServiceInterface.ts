export default interface LoggerServiceInterface {
    info(message: string): void

    error(message: string, error: any): void

    uncaughtError(error: any): void
}
