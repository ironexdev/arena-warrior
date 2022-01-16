<template>
  <h1>{{ t.translate("lwp_page_title") }}</h1>
  <LoginWithoutPasswordForm @lwpSuccess="lwpStatusListener($event)" v-if="!lwpStatus"/>
  <div class="lwp-success" v-else v-html="t.translate('lwp_page_success')"></div>
</template>

<script lang="ts">
import {defineComponent, inject, ref} from "vue";
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
    // Other
    const lwpStatus = ref(false)
    const lwpStatusListener = (value: boolean) => {
      lwpStatus.value = value
    }

    return {
      lwpStatus,
      lwpStatusListener,
      t: translatorService
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .lwp-success{
    margin-top: 20px;
  }
</style>
