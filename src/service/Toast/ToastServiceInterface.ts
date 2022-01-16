export default interface ToastServiceInterface {
    error(message: string, options?: object): void

    info(message: string, options?: object): void

    success(message: string, options?: object): void

    warning(message: string, options?: object): void
}
