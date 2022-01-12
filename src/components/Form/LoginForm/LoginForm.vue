<template>
  <form class="form" @submit.prevent="onSubmit()" novalidate>

    <!-- E-mail -->
    <div class="form__field" :class="{ 'form__field--error' : !form.email.valid}">
      <input class="form__input" :placeholder="form.email.title" :title="form.email.title" v-model="form.email.value" name="email" type="email">
      <div class="form__errors">
        <div class="form__error" v-for="error in form.email.errors">{{ error }}</div>
      </div>
    </div>

    <!-- Password -->
    <div class="form__field" :class="{ 'form__field--error' : !form.password.valid}">
      <input class="form__input" :placeholder="form.password.title" :title="form.password.title" v-model="form.password.value" name="password" type="password">
      <div class="form__errors">
        <div class="form__error" v-for="error in form.password.errors">{{ error }}</div>
      </div>
    </div>

    <!-- Remember Me -->
    <div class="form__field form__field--float" :class="{ 'form__field--error' : !form.remember.valid}">
      <label class="form__checkbox-label">
        <input class="form__checkbox" :placeholder="form.remember.title" :title="form.remember.title" v-model="form.remember.value" name="remember" type="checkbox">
        <span class="form__checkbox-title">{{ form.remember.title }}</span>
      </label>
      <div class="form__errors">
        <div class="form__error" v-for="error in form.remember.errors">{{ error }}</div>
      </div>
    </div>

    <button class="form__submit" type="submit" :disabled="loading">{{ t.translate("login_form_submit") }}</button>
  </form>
</template>

<script lang="ts">
import {defineComponent, inject, reactive, ref} from "vue";
import LoginForm from "@/components/Form/LoginForm/LoginForm";
import {useRoute, useRouter} from "vue-router";
import InvalidFormException from "@/exception/InvalidFormException";
import {userModule} from "@/store/UserModule";
import InvalidEmailOrPasswordException from "@/exception/InvalidEmailOrPasswordException";
import {LoggerEnum} from "@/enum/LoggerEnum";
import ErrorHandlerServiceInterface from "@/service/ErrorHandler/ErrorHandlerServiceInterface";
import TranslatorServiceInterface from "@/service/Translator/TranslatorServiceInterface";
import ToastServiceInterface from "@/service/Toast/ToastServiceInterface";
import UserServiceInterface from "@/service/User/UserServiceInterface";

export default defineComponent({
  name: "LoginForm",
  setup() {
    // Services
    const errorHandlerService = inject("ErrorHandlerServiceInterface") as ErrorHandlerServiceInterface
    const toastService = inject("ToastServiceInterface") as ToastServiceInterface
    const translatorService = inject("TranslatorServiceInterface") as TranslatorServiceInterface
    const userService = inject("UserServiceInterface") as UserServiceInterface
    // Form
    const form = reactive(inject("LoginForm") as LoginForm)
    // Other
    const loading = ref(false)
    const router = useRouter()
    const route = useRoute()
    const redirect = route.query?.redirect ?? null
    const redirectRoute = redirect ? {name: "profile", query: {redirect: redirect}} : {name: "profile"}

    const onSubmit = () => {
      form.validate()

      if (form.valid) {
        login()
      }
    }

    async function login() {
      try {
        // Login
        loading.value = true
        await form.send()

        // Fetch User data
        const user = await userService.fetchCurrentUser()
        userModule.setEmail(user.email)

        await router.push(redirectRoute)
        toastService.success(translatorService.translate("login_form_success"))
      } catch (error: any) {
        if (error instanceof InvalidFormException || error instanceof InvalidEmailOrPasswordException) {
          toastService.error(error.message)
        } else {
          errorHandlerService.handle(LoggerEnum.LOGIN_FAILED, error)
        }
      } finally {
        loading.value = false
      }
    }

    return {
      form,
      loading: loading,
      t: translatorService,
      onSubmit
    }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.form {
  margin-top: 25px;
}
</style>
