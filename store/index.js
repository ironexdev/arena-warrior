export const state = () => ({
  xsrfToken: null
})

export const mutations = {
  setXsrfToken(state, xsrfToken) {
    state.xsrfToken = xsrfToken;
  },
}

export const actions = {
  fetchXsrfToken(context, $cookies) {
    this.$axios.get("http://arena.local:8080/xsrf", {
        withCredentials: true
      }
    ).then(response => {
      let xsrfToken = response.headers["xsrf-token"];

      $cookies.set("xsrf-token", xsrfToken);
      context.commit("setXsrfToken", xsrfToken);
    }).catch(error => {
      console.log(error);
    })
  },
  initXsrfToken(context, xsrfToken) {
    context.commit("setXsrfToken", xsrfToken);
  }
}

export const getters = {
  xsrfToken(state) {
    return state.xsrfToken
  }
}
