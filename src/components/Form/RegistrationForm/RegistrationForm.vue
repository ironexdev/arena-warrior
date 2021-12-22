<template>
  <div>
    <form @submit.prevent="onSubmit(userService)" novalidate>

      <!-- First Name -->
      <div class="field" :class="{ 'field--error' : !form.firstName.valid}">
        <input :placeholder="form.firstName.title" :title="form.firstName.title" v-model="form.firstName.value" name="firstName" type="text">
        <div class="errors">
          <div class="error" v-for="error in form.firstName.errors">{{ error }}</div>
        </div>
      </div>

      <!-- Last Name -->
      <div class="field" :class="{ 'field--error' : !form.lastName.valid}">
        <input :placeholder="form.lastName.title" :title="form.lastName.title" v-model="form.lastName.value" name="lastName" type="text">
        <div class="errors">
          <div class="error" v-for="error in form.lastName.errors">{{ error }}</div>
        </div>
      </div>

      <!-- Nickname -->
      <div class="field" :class="{ 'field--error' : !form.nickname.valid}">
        <input :placeholder="form.nickname.title" :title="form.nickname.title" v-model="form.nickname.value" name="nickname" type="text">
        <div class="errors">
          <div class="error" v-for="error in form.nickname.errors">{{ error }}</div>
        </div>
      </div>

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

      <!-- Password Match -->
      <div class="field" :class="{ 'field--error' : !passwordMatch}">
        <input v-model="passwordCheck" type="password" placeholder="Password Again">
        <div class="errors">
          <div class="error" v-if="!passwordMatch">Passwords have to match.</div>
        </div>
      </div>

      <button type="submit">Submit</button>

    </form>
  </div>
</template>

<script lang="ts">
import {defineComponent, getCurrentInstance, inject, onUnmounted, reactive, ref} from "vue";
import RegistrationForm from "@/components/Form/RegistrationForm/RegistrationForm";
import UserService from "@/service/UserService";

export default defineComponent({
  name: "RegistrationForm",
  setup() {
    const userService = inject("UserService") as UserService
    const form = reactive(inject("RegistrationForm") as RegistrationForm)
    const passwordCheck = ref(null)
    const passwordMatch = ref(true)

    const onSubmit = (userService: UserService) => {
      form.validate()
      passwordMatch.value = passwordCheck.value === form.password.value

      if (form.valid && passwordMatch.value) {
        userService.create(
            form.firstName.value,
            form.lastName.value,
            form.nickname.value,
            form.email.value,
            form.password.value
        )
      }
    }

    return {
      form,
      passwordCheck,
      passwordMatch,
      userService,
      onSubmit
    }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
