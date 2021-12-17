<template>
  <div>
    <h1>Home</h1>
    <NuxtLink to="/login">Login</NuxtLink>
    {{ xsrfToken }}
  </div>
</template>

<script>

export default {
  name: "IndexPage",
  computed: {
    xsrfToken() {
      return this.$store.getters.xsrfToken
    }
  }
}
</script>
