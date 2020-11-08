export default {
  showModal({ commit }, { header, body, footer, buttonsOrCallback }) {
    const defaultButton = {
      callback: null,
      label: "Tamam"
    };

    let buttons = [];
    if (buttonsOrCallback != null && Array.isArray(buttonsOrCallback)) {
      for (let button of buttonsOrCallback) {
        // button must contain the properties of this.defaultButton
        buttons.push(button);
      }
    } else {
      if (typeof buttonsOrCallback === "function") {
        defaultButton.callback = buttonsOrCallback;
      }
      buttons = [defaultButton];
    }

    commit("SHOW_MODAL", { header, body, footer, buttons });
  },

  hideModal({ commit }) {
    commit("HIDE_MODAL");
  }
};
