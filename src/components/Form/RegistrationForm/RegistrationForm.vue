<template>
  <form class="form" @submit.prevent="onSubmit()" novalidate>

    <!-- First Name -->
    <div class="form__field" :class="{ 'form__field--error' : !form.firstName.valid}">
      <input class="form__input" :placeholder="form.firstName.title" :title="form.firstName.title" v-model="form.firstName.value" name="firstName" type="text">
      <div class="form__errors">
        <div class="form__error" v-for="error in form.firstName.errors">{{ error }}</div>
      </div>
    </div>

    <!-- Last Name -->
    <div class="form__field" :class="{ 'form__field--error' : !form.lastName.valid}">
      <input class="form__input" :placeholder="form.lastName.title" :title="form.lastName.title" v-model="form.lastName.value" name="lastName" type="text">
      <div class="form__errors">
        <div class="form__error" v-for="error in form.lastName.errors">{{ error }}</div>
      </div>
    </div>

    <!-- Nickname -->
    <div class="form__field" :class="{ 'form__field--error' : !form.nickname.valid}">
      <input class="form__input" :placeholder="form.nickname.title" :title="form.nickname.title" v-model="form.nickname.value" name="nickname" type="text">
      <div class="form__errors">
        <div class="form__error" v-for="error in form.nickname.errors">{{ error }}</div>
      </div>
    </div>

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

    <!-- Password Match -->
    <div class="form__field" :class="{ 'form__field--error' : !passwordMatch}">
      <input class="form__input" v-model="passwordCheck" type="password" placeholder="Password Again">
      <div class="form__errors">
        <div class="form__error" v-if="!passwordMatch">{{ t.translate("registration_form_error_password_match") }}</div>
      </div>
    </div>

    <button class="form__submit" type="submit" :disabled="loading">{{ t.translate("registration_form_submit") }}</button>
  </form>
</template>

<script lang="ts">
import {computed, defineComponent, inject, reactive, ref} from "vue";
import RegistrationForm from "@/components/Form/RegistrationForm/RegistrationForm";
import InvalidFormException from "@/exception/InvalidFormException";
import {LoggerEnum} from "@/enum/LoggerEnum";
import ErrorHandlerServiceInterface from "@/service/ErrorHandler/ErrorHandlerServiceInterface";
import TranslatorServiceInterface from "@/service/Translator/TranslatorServiceInterface";
import ToastServiceInterface from "@/service/Toast/ToastServiceInterface";
import {loaderModule} from "@/store/LoaderModule";

export default defineComponent({
  name: "RegistrationForm",
  setup(props, context) {
    // Service
    const errorHandlerService = inject("ErrorHandlerServiceInterface") as ErrorHandlerServiceInterface
    const toastService = inject("ToastServiceInterface") as ToastServiceInterface
    const translatorService = inject("TranslatorServiceInterface") as TranslatorServiceInterface
    // Form
    const form = reactive(inject("RegistrationForm") as RegistrationForm)
    // Other
    const loading = computed(() => !!loaderModule.progress)
    const passwordCheck = ref(null)
    const passwordMatch = ref(true)

    const onSubmit = () => {
      form.validate()
      passwordMatch.value = passwordCheck.value === form.password.value

      if (form.valid && passwordMatch.value) {
        registration()
      }
    }

    async function registration() {
      try {
        loaderModule.start()

        // Register
        await form.send()
        context.emit("registrationSuccess", true)

        toastService.success(translatorService.translate("registration_form_success"))
      } catch (error: any) {
        if (error instanceof InvalidFormException) {
          toastService.error(error.message)
        } else {
          errorHandlerService.handle(LoggerEnum.REGISTRATION_FAILED, error)
        }
      } finally {
        loaderModule.finish()
      }
    }

    return {
      form,
      loading: loading,
      passwordCheck,
      passwordMatch,
      t: translatorService,
      onSubmit
    }
  },
  methods: {}
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.form {
  margin-top: 25px;
}
</style>
