<template>
  <Header></Header>
  <div class="main">
    <router-view/>
  </div>
</template>

<script lang="ts">
import {defineComponent, inject} from "vue";
import Header from "@/components/Header.vue";
import {userModule} from "@/store/UserModule";
import {LoggerEnum} from "@/enum/LoggerEnum";
import {CookieEnum} from "@/enum/CookieEnum";
import Cookies from "js-cookie";
import ErrorHandlerServiceInterface from "@/service/ErrorHandler/ErrorHandlerServiceInterface";
import UserServiceInterface from "@/service/User/UserServiceInterface";

export default defineComponent({
  name: "App",
  components: {
    Header
  },
  setup() {
    const errorHandlerService = inject("ErrorHandlerServiceInterface") as ErrorHandlerServiceInterface
    const userService = inject("UserServiceInterface") as UserServiceInterface

    if (Cookies.get(CookieEnum.AUTHENTICATION_TOKEN)) {
      initUser()
    }

    async function initUser() {
      userModule.setAuthenticated(true)

      try {
        const user = await userService.fetchCurrentUser()
        userModule.setEmail(user.email)
      } catch (error: any) {
        errorHandlerService.handle(LoggerEnum.INIT_USER_FAILED, error)
      }
    }
  }
});
</script>

<style lang="scss">
@import "../node_modules/vue-toastification/dist/index.css";
@import "./assets/styles/index.scss";
</style>
