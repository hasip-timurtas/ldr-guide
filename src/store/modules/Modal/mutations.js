export default {
  ["SHOW_MODAL"]: (state, { header, body, footer, buttons }) => {
    console.log(buttons);
    state.modal = { header, body, footer, buttons, showModal: true };
  },
  ["HIDE_MODAL"]: (state) => {
    state.modal.showModal = false;
  }
};
