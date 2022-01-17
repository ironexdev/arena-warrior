import {Module, VuexModule, Mutation, getModule} from "vuex-module-decorators"
import {store} from "@/store/index";

@Module({dynamic: true, namespaced: true, name: "loaderModule", store})
export default class LoaderModule extends VuexModule {
    _progress: number = 0

    @Mutation
    start() {
        this._progress = 80
    }

    @Mutation
    finish() {
        this._progress = 100

        setTimeout(() => {
            this._progress = 0
        }, 250)
    }

    get progress(): number {
        return this._progress
    }
}

export const loaderModule = getModule(LoaderModule);

