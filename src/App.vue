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
import {DOMAIN} from "../config/config";

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
      try {
        const user = await userService.fetchCurrentUser()

        if (user) {
          userModule.setAuthenticated(true)
          userModule.setEmail(user.email)
        } else { // If user has token in Cookies, but it is deleted from server, then user gets redirected to login page
          Cookies.remove(CookieEnum.AUTHENTICATION_TOKEN, {domain: "." + DOMAIN})
        }
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
