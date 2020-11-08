import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
//import { auth } from "./firebase";
import GlobalMixin from "@/plugins/global-mixin.js";
import vuetify from "@/plugins/vuetify";
import VueClipboard from "vue-clipboard2";
import "nprogress/nprogress.css";

/*
auth.onAuthStateChanged((user) => {
  store.dispatch("auth/fetchUser", user);
});
*/
Vue.use(VueClipboard);

Vue.config.productionTip = false;

Vue.use(GlobalMixin);
// EVENT
window.EventBus = new Vue();

// VUE SWAL
import VueSwal from "vue-swal";
Vue.use(VueSwal);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App)
}).$mount("#app");
