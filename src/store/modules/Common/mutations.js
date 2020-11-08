import Vue from "vue";
const vue = new Vue({});

export default {
  ["SET_DIALOG"]: (state, { dialogName, status, dialogMessage, dialogType }) => {
    state.dialogs[dialogName] = status;
    if (dialogMessage) {
      state.dialogs.dialogMessage = dialogMessage;
      state.dialogs.dialogType = dialogType;
    }
  },
  ["SET_SWAL"]: (state, { title, message, type }) => {
    vue.$swal(title, message, type);
  },
  ["SET_MENU"]: (state, menu) => {
    state.selectedMenu = state.menus[menu];
  },
  ["SET_BTC_PRICE"]: (state, btcPrice) => {
    state.btcPrice = btcPrice;
  }
};
