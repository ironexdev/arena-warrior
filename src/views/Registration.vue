<template>
  <h1>{{ t.translate("registration_page_title") }}</h1>
  <RegistrationForm @registrationSuccess="registrationStatusListener($event)" v-if="!registrationStatus"></RegistrationForm>
  <p class="registration-success" v-else>
    <b>{{ t.translate("registration_page_success_bold") }}</b>{{ t.translate("registration_page_success_part2") }}
  </p>
</template>

<script lang="ts">
import {defineComponent, inject, ref} from "vue";
import RegistrationForm from "@/components/Form/RegistrationForm/RegistrationForm.vue";
import TranslatorServiceInterface from "@/service/Translator/TranslatorServiceInterface";

export default defineComponent({
  name: "Registration",
  components: {
    RegistrationForm
  },
  setup() {
    // Services
    const translatorService = inject("TranslatorServiceInterface") as TranslatorServiceInterface
    // Other
    const registrationStatus = ref(false)
    const registrationStatusListener = (value: boolean) => {
      registrationStatus.value = value
    }

    return {
      registrationStatus,
      registrationStatusListener,
      t: translatorService
    }
  }
});
</script>

<style lang="scss">
.registration-success {
  margin-top: 20px;
}
</style>
