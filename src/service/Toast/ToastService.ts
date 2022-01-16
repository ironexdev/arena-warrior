import {ToastInterface} from "vue-toastification";
import ToastServiceInterface from "@/service/Toast/ToastServiceInterface";

export default class ToastService implements ToastServiceInterface {
    constructor(private toast: ToastInterface) {
    }

    public error(message: string, options?: object): void {
        this.toast.error(message, {
            icon: {
                iconClass: "material-icons",
                iconChildren: "error",
                iconTag: "i"
            }
        })
    }

    public info(message: string, options?: object): void {
    }

    public success(message: string, options?: object): void {
        options = options ?? {
            iconClass: "material-icons",
            iconChildren: "success",
            iconTag: "i"
        };

        this.toast.success(message, options)
    }

    public warning(message: string, options?: object): void {
    }
}
