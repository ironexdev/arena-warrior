<template>
  <div class="header">
    <div class="header__menu">
      <router-link to="/" class="header__link">{{ t.translate("header_menu_home") }}</router-link>
      <template v-if="userIsAuthenticated">
        <router-link :to="{name: 'profile'}" class="header__link">{{ t.translate("header_menu_profile") }}</router-link>
      </template>
      <template v-else>
        <router-link :to="{name: 'login'}" class="header__link">{{ t.translate("header_menu_login") }}</router-link>
        <router-link :to="{name: 'loginWithoutPassword'}" class="header__link">{{ t.translate("header_menu_lwo") }}</router-link>
        <router-link :to="{name: 'registration'}" class="header__link">{{ t.translate("header_menu_registration") }}</router-link>
      </template>
    </div>
    <div class="header__profile" v-if="userIsAuthenticated">
      <router-link :to="{name: 'profile'}" class="header__email">
        {{ email }}
      </router-link>
      <button class="header__logout" @click.prevent="onLogout(authenticationService)" :title="t.translate('header_menu_logout')">
        <i class="material-icons">logout</i>
      </button>
    </div>
    <div class="header__loader">
      <div class="header__loader-progress" :style="{ width: progress + '%'}"></div>
    </div>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, inject, ref} from "vue";
import {userModule} from "@/store/UserModule";
import {useRoute} from "vue-router";
import AuthenticationServiceInterface from "@/service/Authentication/AuthenticationServiceInterface";
import TranslatorServiceInterface from "@/service/Translator/TranslatorServiceInterface";
import {loaderModule} from "@/store/LoaderModule";

export default defineComponent({
  name: "Header",
  setup() {
    // Services
    const authenticationService = inject("AuthenticationServiceInterface") as AuthenticationServiceInterface
    const translatorService = inject("TranslatorServiceInterface") as TranslatorServiceInterface
    // Other
    const authenticated = computed(() => userModule.authenticated)
    const email = computed(() => userModule.email)
    const routeName = ref(useRoute().name)

    const onLogout = async (authenticationService: AuthenticationServiceInterface) => {
      loaderModule.start()
      await authenticationService.logout()
      location.href = "/login"
    }

    const progress = computed(() => loaderModule.progress)

    return {
      authenticationService,
      t: translatorService,
      email,
      progress,
      routeName,
      userIsAuthenticated: authenticated,
      onLogout
    }
  }
})
</script>

<style scoped lang="scss">
@import "../assets/styles/variables";
@import "../assets/styles/mixins";

.header {
  background-color: $gallery;
  border-bottom: 1px solid $alto;
  height: 50px;
  position: fixed;
  width: 100%;

  &__menu {
    float: left;
    height: 100%;
  }

  &__link {
    color: $doveGray;
    display: block;
    float: left;
    font-size: 18px;
    line-height: 50px;
    padding: 0 25px 0 25px;
    text-decoration: none;

    &.router-link-exact-active {
      background-color: $athensGray;
      color: $toreaBay;
    }
  }

  &__profile {
    float: right;
    height: 100%;
  }

  &__email {
    color: $toreaBay;
    float: left;
    font-size: 14px;
    font-weight: 600;
    height: 49px;
    line-height: 49px;
    margin: 0 25px 0 0;

    &.router-link-exact-active {
      color: $black;
      cursor: default;
      text-decoration: none;
    }
  }

  &__logout {
    border: none;
    border-left: 1px solid #DDD;
    color: $gray;
    cursor: pointer;
    display: block;
    float: right;
    font-size: 12px;
    height: 100%;
    padding: 13px 15px 13px 15px;
    text-decoration: none;
  }

  &__loader {
    bottom: 0;
    height: 2px;
    left: 0;
    position: absolute;
    width: 100%;
  }

  &__loader-progress {
    background-color: $toreaBay;
    height: 100%;
    left: 0;
    position: absolute;
    width: 0;
    @include transition(0.5s ease width)
  }
}
</style>
