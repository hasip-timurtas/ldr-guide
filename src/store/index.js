import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

// STORES
import auth from "./modules/Auth";
import modal from "./modules/Modal";
import common from "./modules/Common";
import slots from "./modules/Slots";
import slotGroups from "./modules/SlotGroups";
import companies from "./modules/Companies";
import transactions from "./modules/Transactions";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    common,
    modal,
    slots,
    slotGroups,
    companies,
    transactions
  },
  plugins: [
    createPersistedState({
      key: "baris5",
      reducer(val) {
        if (!val.auth.loggedIn) {
          return {};
        }
        return val;
      }
    })
  ]
});
