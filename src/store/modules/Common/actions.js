import axios from "axios";

export default {
  setDialog({ commit }, { dialogName, status, dialogMessage = null, dialogType = null }) {
    commit("SET_DIALOG", { dialogName, status, dialogMessage, dialogType });
  },
  setError({ commit }, errorMessage, title = "Hata!") {
    commit("SET_SWAL", { title, message: errorMessage, type: "error" });
  },
  setSuccess({ commit }, successMessage, title = "Başarılı!") {
    commit("SET_SWAL", { title, message: successMessage, type: "success" });
  },
  setWarning({ commit }, warningMessage, title = "Uyarı!") {
    commit("SET_SWAL", { title, message: warningMessage, type: "warning" });
  },
  setMenu({ commit }, menu) {
    commit("SET_MENU", menu);
  },
  setBtcPrice({ commit }) {
    axios
      .get("https://api.payvolut.com/convert-to-btc")
      .then((response) => {
        commit("SET_BTC_PRICE", response.data);
      })
      .catch((err) => console.log(err));
  }
};
