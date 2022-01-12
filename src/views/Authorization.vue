<template>
  <h1>{{ t.translate("authorization_page_title") }}</h1>
  <p class="h1-subtitle">

    <template v-if="action === activateUserAction">
      <span v-if="state === 'initial'">{{ t.translate("authorization_page_activation_loading") }}</span>
      <span v-else-if="state === 'success'">
        {{ t.translate("authorization_page_activation_success") }}
      </span>
      <span v-else>{{ t.translate("authorization_page_activation_error") }}</span>
    </template>

    <template v-if="action === loginWithoutPasswordAction">
      <span v-if="state === 'initial'">{{ t.translate("authorization_page_login_loading") }}</span>
      <span v-else>{{ t.translate("authorization_page_error") }}</span>
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
    const authorizationToken = query.token ? query.token.toString() : ""
    const state = ref("initial")
    const activateUserAction = AuthorizationActionEnum.ACTIVATE_USER
    const loginWithoutPasswordAction = AuthorizationActionEnum.LOGIN_WITHOUT_PASSWORD

    if (action === activateUserAction) { // ACTIVATE USER
      activateUser(authorizationToken)
    } else if (action === loginWithoutPasswordAction) { // LOGIN WITHOUT PASSWORD
      loginWithoutPassword(authorizationToken)
    } else { // REDIRECT TO HOMEPAGE
      router.push("home")
    }

    function activateUser(authorizationToken: string) {
      userService.activateUser(authorizationToken)
          .then((response: boolean) => {
            state.value = "success"
          })
          .catch((errorResponse: Error) => {
            state.value = "error"
          })
    }

    function loginWithoutPassword(authorizationToken: string) {
      const remember = query.remember === "true"

      authenticationService.loginWithoutPassword(authorizationToken, remember)
          .then((response: boolean) => {
            router.push("profile")
          })
          .catch((errorResponse: Error) => {
            state.value = "error"
          })
    }

    return {
      action,
      activateUserAction,
      loginWithoutPasswordAction,
      state,
      t: translatorService
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.h1-subtitle {
  margin: 20px 0 0 0;
}
</style>
