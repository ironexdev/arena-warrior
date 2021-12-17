export default function (context){
  let token = context.app.$cookies.get("xsrf-token");

  if(token)
  {
    context.store.dispatch("initXsrfToken", token);
  }
}
