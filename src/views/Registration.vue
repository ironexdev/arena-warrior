<template>
  <div>
    <h1>Registration</h1>
    <RegistrationForm></RegistrationForm>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import RegistrationForm from "@/components/Form/RegistrationForm/RegistrationForm.vue";

export default defineComponent({
  name: "Registration",
  components: {
    RegistrationForm
  },
});
</script>
