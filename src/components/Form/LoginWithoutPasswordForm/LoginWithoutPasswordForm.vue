<template>
  <form class="form" @submit.prevent="onSubmit()" novalidate>

    <!-- E-mail -->
    <div class="form__field" :class="{ 'form__field--error' : !form.email.valid}">
      <input class="form__input" :placeholder="form.email.title" :title="form.email.title" v-model="form.email.value" name="email" type="email">
      <div class="form__errors">
        <div class="form__error" v-for="error in form.email.errors">{{ error }}</div>
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

    <button class="form__submit" type="submit" :disabled="loading">{{ t.translate("lwp_form_submit") }}</button>
  </form>
</template>

<script lang="ts">
import {computed, defineComponent, inject, reactive} from "vue";
import LoginWithoutPasswordForm from "@/components/Form/LoginWithoutPasswordForm/LoginWithoutPasswordForm";
import InvalidFormException from "@/exception/InvalidFormException";
import {LoggerEnum} from "@/enum/LoggerEnum";
import ErrorHandlerServiceInterface from "@/service/ErrorHandler/ErrorHandlerServiceInterface";
import TranslatorServiceInterface from "@/service/Translator/TranslatorServiceInterface";
import ToastServiceInterface from "@/service/Toast/ToastServiceInterface";
import {loaderModule} from "@/store/LoaderModule";

export default defineComponent({
  name: "LoginWithoutPasswordForm",
  setup(props, context) {
    // Service
    const errorHandlerService = inject("ErrorHandlerServiceInterface") as ErrorHandlerServiceInterface
    const toastService = inject("ToastServiceInterface") as ToastServiceInterface
    const translatorService = inject("TranslatorServiceInterface") as TranslatorServiceInterface
    // Form
    const form = reactive(inject("LoginWithoutPasswordForm") as LoginWithoutPasswordForm)
    // Other
    const loading = computed(() => !!loaderModule.progress)

    const onSubmit = () => {
      form.validate()

      if (form.valid) {
        loginWithoutPassword()
      }
    }

    async function loginWithoutPassword() {
      try {
        loaderModule.start()

        // Login Without Password
        await form.send()
        context.emit("lwpSuccess", true)

        toastService.success(translatorService.translate("lwp_form_success"))
      } catch (error: any) {
        if (error instanceof InvalidFormException) {
          toastService.error(error.message)
        } else {
          errorHandlerService.handle(LoggerEnum.LOGIN_FAILED, error)
        }
      } finally {
        loaderModule.finish()
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
