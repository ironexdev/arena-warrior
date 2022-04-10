<template>
  <h1>{{ t.translate("authorization_page_title") }}</h1>
  <p class="h1-subtitle">

    <template v-if="action === activateUserAction">
      <span v-if="state === 'initial'">{{ t.translate("authorization_page_activation_loading") }}</span>
      <span v-else-if="state === 'success'">
        {{ t.translate("authorization_page_activation_success_part1") }}<router-link :to="{name: 'login'}">{{ t.translate("authorization_page_activation_success_link") }}</router-link>{{ t.translate("authorization_page_activation_success_part2") }}
      </span>
      <span v-else>{{ t.translate("authorization_page_activation_error") }}</span>
    </template>

    <template v-if="action === loginWithoutPasswordAction">
      <span v-if="state === 'initial'">{{ t.translate("authorization_page_login_loading") }}</span>
      <span v-else>
        {{ t.translate("authorization_page_error_part1") }}<router-link :to="{name: 'loginWithoutPassword'}">{{ t.translate("authorization_page_error_link") }}</router-link>{{ t.translate("authorization_page_error_part2") }}
      </span>
    </template>

  </p>
</template>

<script lang="ts">
import {defineComponent, inject, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import {AuthorizationActionEnum} from "@/enum/AuthorizationActionEnum";
import AuthenticationServiceInterface from "@/service/Authentication/AuthenticationServiceInterface";
import UserServiceInterface from "@/service/User/UserServiceInterface";
import TranslatorServiceInterface from "@/service/Translator/TranslatorServiceInterface";

export default defineComponent({
  name: "Authorization",
  setup() {
    // Services
    const authenticationService = inject("AuthenticationServiceInterface") as AuthenticationServiceInterface
    const translatorService = inject("TranslatorServiceInterface") as TranslatorServiceInterface
    const userService = inject("UserServiceInterface") as UserServiceInterface
    // Other
    const router = useRouter()
    const route = useRoute()
    const query = route.query
    const action = query.action
    const authorizationCode = query.code ? query.code.toString() : ""
    const state = ref("initial")
    const activateUserAction = AuthorizationActionEnum.ACTIVATE_USER
    const loginWithoutPasswordAction = AuthorizationActionEnum.LOGIN_WITHOUT_PASSWORD

    if (action === activateUserAction) { // ACTIVATE USER
      activateUser(authorizationCode)
    } else if (action === loginWithoutPasswordAction) { // LOGIN WITHOUT PASSWORD
      loginWithoutPassword(authorizationCode)
    } else { // REDIRECT TO HOMEPAGE
      router.push("home")
    }

    async function activateUser(authorizationCode: string) {
      try {
        await userService.activateUser(authorizationCode)
        state.value = "success"
      } catch (error: any) {
        state.value = "error"
      }
    }

    async function fetchUserData() {
      // Fetch User data
      await userService.fetchCurrentUser()
    }

    async function loginWithoutPassword(authorizationCode: string) {
      try {
        await authenticationService.loginWithoutPassword(authorizationCode)
        await fetchUserData()
        await router.push("profile")
      } catch (error: any) {
        state.value = "error"
      }
    }

    return {
      action,
      activateUserAction,
      loginWithoutPasswordAction,
      state,
      t: translatorService
    }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.h1-subtitle {
  margin: 20px 0 0 0;
}
</style>
