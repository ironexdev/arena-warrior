<template>
  <h1>{{ t.translate("login_page_title") }}</h1>
  <LoginForm/>
  <p class="info info--first">
    {{ t.translate("login_page_info_login_with_email") }}
    <router-link :to="{name: 'loginWithoutPassword' }">{{ t.translate("login_page_info_login_with_email_link") }}</router-link>
  </p>
  <p class="info">
    {{ t.translate("login_page_info_registration") }}
    <router-link :to="{ name: 'registration' }">{{ t.translate("login_page_info_registration_link") }}</router-link>
  </p>
</template>

<script lang="ts">
import {defineComponent, inject} from "vue";
import LoginForm from "@/components/Form/LoginForm/LoginForm.vue";
import TranslatorServiceInterface from "@/service/Translator/TranslatorServiceInterface";

export default defineComponent({
  name: "Login",
  components: {
    LoginForm
  },
  setup() {
    const translatorService = inject("TranslatorServiceInterface") as TranslatorServiceInterface

    return {
      t: translatorService
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../assets/styles/variables.scss";

.info {
  color: $tundora;
  font-size: 14px;

  &--first {
    margin: 20px 0 10px 0;
  }
}
</style>
