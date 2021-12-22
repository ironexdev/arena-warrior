<template>
  <div>
    <form @submit.prevent="onSubmit(userService)" novalidate>

      <!-- E-mail -->
      <div class="field" :class="{ 'field--error' : !form.email.valid}">
        <input :placeholder="form.email.title" :title="form.email.title" v-model="form.email.value" name="email" type="email">
        <div class="errors">
          <div class="error" v-for="error in form.email.errors">{{ error }}</div>
        </div>
      </div>

      <!-- Password -->
      <div class="field" :class="{ 'field--error' : !form.password.valid}">
        <input :placeholder="form.password.title" :title="form.password.title" v-model="form.password.value" name="password" type="password">
        <div class="errors">
          <div class="error" v-for="error in form.password.errors">{{ error }}</div>
        </div>
      </div>

      <!-- Remember Me -->
      <div class="field" :class="{ 'field--error' : !form.remember.valid}">
        <input :placeholder="form.remember.title" :title="form.remember.title" v-model="form.remember.value" name="remember" type="checkbox">
        <div class="errors">
          <div class="error" v-for="error in form.remember.errors">{{ error }}</div>
        </div>
      </div>

      <button type="submit">Submit</button>

    </form>
  </div>
</template>

<script lang="ts">
import {defineComponent, inject, reactive, ref} from "vue";
import UserService from "@/service/UserService";
import LoginForm from "@/components/Form/LoginForm/LoginForm";
import {useStore} from "vuex";

export default defineComponent({
  name: "LoginForm",
  setup() {
    const store = useStore()
    const userService = inject("UserService") as UserService
    const form = reactive(inject("LoginForm") as LoginForm)

    const onSubmit = (userService: UserService) => {
      form.validate()

      if (form.valid) {
        userService.login(
            form.email.value,
            form.password.value,
            !!form.remember.value
        ).then(response => {
          store.dispatch("UserModule/setSecurelyAuthenticated")
        })
      }
    }

    return {
      form,
      userService,
      onSubmit
    }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
