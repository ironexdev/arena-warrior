<template>
  <h1>{{ t.translate("profile_page_title") }}</h1>
</template>

<script lang="ts">
import {defineComponent, inject} from "vue";
import TranslatorServiceInterface from "@/service/Translator/TranslatorServiceInterface";

export default defineComponent({
  name: "Profile",
  setup() {
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
