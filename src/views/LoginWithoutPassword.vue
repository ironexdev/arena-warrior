<template>
  <h1>{{ t.translate("lwp_page_title") }}</h1>
  <LoginWithoutPasswordForm/>
</template>

<script lang="ts">
import {defineComponent, inject} from "vue";
import LoginWithoutPasswordForm from "@/components/Form/LoginWithoutPasswordForm/LoginWithoutPasswordForm.vue";
import TranslatorServiceInterface from "@/service/Translator/TranslatorServiceInterface";

export default defineComponent({
  name: "LoginWithoutPassword",
  components: {
    LoginWithoutPasswordForm
  },
  setup: function () {
    // Services
    const translatorService = inject("TranslatorServiceInterface") as TranslatorServiceInterface

    return {
      t: translatorService
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
