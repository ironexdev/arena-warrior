import {ENVIRONMENT} from "@/../config/config";
import {EnvironmentEnum} from "@/enum/EnvironmentEnum";
import LoggerServiceInterface from "@/service/Logger/LoggerServiceInterface";

export default class LoggerService implements LoggerServiceInterface {
    public info(message: string): void {
        if (ENVIRONMENT === EnvironmentEnum.PRODUCTION) {
            // TODO Sentry
        } else {
            console.log(message)
        }
    }

    public error(message: string, error: any): void {
        if (ENVIRONMENT === EnvironmentEnum.PRODUCTION) {
            // TODO Sentry
        } else {
            console.error(message, error)
        }
    }

    public uncaughtError(error: any): void{
        if(ENVIRONMENT === "production")
        {
            // TODO Sentry
        }
        else
        {
            console.error("UNCAUGHT_ERROR", error)
        }
    }
}
