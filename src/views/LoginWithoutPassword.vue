<template>
  <h1>{{ t.translate("lwp_page_title") }}</h1>
  <LoginWithoutPasswordForm @lwpSuccess="lwpStatusListener($event)" v-if="!lwpStatus"/>
  <p class="info info--first" v-if="!lwpStatus">
    {{ t.translate("lwp_page_info_registration") }}
    <router-link :to="{ name: 'registration' }">{{ t.translate("lwp_page_info_registration_link") }}</router-link>
  </p>
  <p class="lwp-success" v-else>
    <b>{{ t.translate("lwp_page_success_bold") }}</b>{{ t.translate("lwp_page_success_part2") }}
  </p>
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
@import "../assets/styles/variables.scss";

.info {
  color: $tundora;
  font-size: 14px;

  &--first {
    margin: 20px 0 10px 0;
  }
}

.lwp-success {
  margin-top: 20px;
}
</style>
