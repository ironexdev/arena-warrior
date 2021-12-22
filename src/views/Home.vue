<template>
  <div>
    <h1>Home</h1>
    Do. Or do not. There is no try.

    <div v-show="!userIsAuthenticated">
      <h2>Login</h2>
      <LoginForm></LoginForm>
    </div>

    <div v-if="userIsAuthenticated">
      <button @click.prevent="onLogout(userService)">Logout</button>
    </div>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, inject, ref} from "vue";
import LoginForm from "@/components/Form/LoginForm/LoginForm.vue";
import {Store, useStore} from "vuex";
import UserService from "@/service/UserService";
import {useRouter} from "vue-router";

export default defineComponent({
  name: "Home",
  components: {
    LoginForm
  },
  setup() {
    const store = useStore()
    const router = useRouter()
    const userService = inject("UserService") as UserService

    const onLogout = (userService: UserService) => {
      userService.logout().then(() => {
        console.log("Successfully Logged Out")
        location.href = "/"
      })
    }

    return {
      userIsAuthenticated: computed(() => store.getters["UserModule/securelyAuthenticated"]),
      userService,
      onLogout
    }
  }
});
</script>
