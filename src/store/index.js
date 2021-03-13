import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

// STORES
import common from "./modules/Common";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        common
    },
    plugins: [
        createPersistedState({
            key: "baris6",
            reducer(val) {
                if (!val.auth.loggedIn) {
                    return {};
                }
                return val;
            }
        })
    ]
});
