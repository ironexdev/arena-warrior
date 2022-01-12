import {ToastInterface} from "vue-toastification";
import ToastServiceInterface from "@/service/Toast/ToastServiceInterface";

export default class ToastService implements ToastServiceInterface {
    constructor(private toast: ToastInterface) {
    }

    public error(message: string): void {
        this.toast.error(message, {
            icon: {
                iconClass: "material-icons",
                iconChildren: "error",
                iconTag: "i"
            }
        })
    }

    public info(): void {
    }

    public success(message: string): void {
        this.toast.success(message, {
            icon: {
                iconClass: "material-icons",
                iconChildren: "success",
                iconTag: "i"
            }
        })
    }

    public warning(): void {
    }
}
