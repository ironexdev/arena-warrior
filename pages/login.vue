<template>
  <div>
    <h1>Login</h1>
    <NuxtLink to="/">Home</NuxtLink>
    <button @click.prevent="login">Login</button>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  methods: {
    login() {
      this.$axios.post("http://arena.local:8080/login", {
        "email": "name@domain.com",
        "password": "Hello123456",
        "remember": true
      }, {
        headers: {
          "X-XSRF-Token": this.$store.getters.xsrfToken
        },
        withCredentials: true
      }).then(response => {
        console.log(response);
      }).catch(error => {
      })
    }
  }
}
</script>
