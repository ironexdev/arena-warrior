export default interface ToastServiceInterface {
    error(message: string): void

    info(): void

    success(message: string): void

    warning(): void
}
