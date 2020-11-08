import { mapActions, mapGetters } from "vuex";
//import { debounce } from "lodash";
//import router from "@/router/index";

const Global = {
  install(Vue) {
    Vue.mixin({
      methods: {
        ...mapActions("auth", ["singIn", "signOut", "setUserLevel", "changePassword"]),
        ...mapActions("common", ["setDialog", "setMenu", "setBtcPrice", "setSuccess", "setError", "setWarning"]),
        ...mapActions("modal", ["showModal", "hideModal"]),
        ...mapActions("slots", ["loadSlots", "deleteSlot", "addSlot", "updateSlot"]),
        ...mapActions("slotGroups", ["loadSlotGroups", "deleteSlotGroup", "addSlotGroup", "updateSlotGroup"]),
        ...mapActions("companies", ["loadCompanies", "deleteCompany", "addCompany", "updateCompany"]),
        ...mapActions("transactions", [
          "loadTransactions",
          "loadPendingTransactions",
          "loadCompanyTransactions",
          "updateTransaction",
          "updatePendingTransaction"
        ])
      },
      computed: {
        ...mapGetters("auth", ["user", "loggedIn", "loginError", "userLevel"]),
        ...mapGetters("common", ["paymentMethods", "getDialog", "dialogMessage", "dialogType", "selectedMenu", "btcPrice"]),
        ...mapGetters("modal", ["modal"]),
        ...mapGetters("slots", ["slots", "getSlot"]),
        ...mapGetters("slotGroups", ["slotGroups", "getSlotGroups"]),
        ...mapGetters("companies", ["companies", "getCompany"]),
        ...mapGetters("transactions", [
          "transactions",
          "pendingTransactions",
          "companyTransactions",
          "getTransaction",
          "getPendingTransaction",
          "getCompanyTransaction"
        ])
      }
    });
  }
};

export default Global;
