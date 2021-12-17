<template>
  <div>
    <nuxt/>
  </div>
</template>

<script>
import {mapActions} from "vuex"

export default {
  middleware: ["xsrf"],
  mounted: function () {
    if (!this.$cookies.get("xsrf-token")) {
      this.fetchXsrfToken(this.$cookies)
    }
  },
  methods: {
    ...mapActions([
      "fetchXsrfToken"
    ])
  }
}
</script>


<style>
</style>
