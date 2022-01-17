<template>
  <h1>{{ t.translate("home_page_title") }}</h1>
  <div v-if="userIsAuthenticated">
    <p class="h1-subtitle">{{ t.translate("home_page_subtitle", {email: email}) }}</p>
  </div>
  <div v-else>
    <p class="h1-subtitle">{{ t.translate("home_page_subtitle_visitor") }}</p>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, inject} from "vue";
import {userModule} from "@/store/UserModule";
import TranslatorServiceInterface from "@/service/Translator/TranslatorServiceInterface";
import ToastServiceInterface from "@/service/Toast/ToastServiceInterface";

export default defineComponent({
  name: "Home",
  setup() {
    // Services
    const translatorService = inject("TranslatorServiceInterface") as TranslatorServiceInterface
    // Other
    const authenticated = computed(() => userModule.authenticated)
    const email = computed(() => userModule.email)

    return {
      email,
      userIsAuthenticated: authenticated,
      t: translatorService
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.h1-subtitle {
  margin: 20px 0 0 0;
}
</style>
