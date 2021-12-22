<template>
  <div id="nav">
    <router-link to="/">Home</router-link>
    <router-link to="/registration">Registration</router-link>
  </div>
  <router-view/>
</template>

<script lang="ts">
import {defineComponent, provide} from "vue";
import {useStore} from "vuex";
import UserService from "@/service/UserService";
import RegistrationForm from "@/components/Form/RegistrationForm/RegistrationForm";
import LoginForm from "@/components/Form/LoginForm/LoginForm";

export default defineComponent({
  name: "App",
  setup() {
    const store = useStore()

    store.dispatch("XsrfModule/init").then(() => {
      console.log("Xsrf Token: " + store.getters["XsrfModule/token"])
    }).then(() => {
      store.dispatch("UserModule/init").then(() => {
        if (store.getters["UserModule/securelyAuthenticated"]) {
          console.log("User is securely authenticated")
        } else if (store.getters["UserModule/authenticated"]) {
          console.log("User is authenticated")
        } else {
          console.log("User is not authenticated")
        }
      })
    })

    provide<UserService>("UserService", new UserService(store))
    provide<RegistrationForm>("RegistrationForm", new RegistrationForm())
    provide<LoginForm>("LoginForm", new LoginForm())
  }
});
</script>

<style lang="scss">
</style>
