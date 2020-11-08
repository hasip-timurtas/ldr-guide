export const paymentMethods = (state) => state.paymentMethods;
//export const slotGroups = (state) => state.slotGroups; // DEACTIVATED, veritabanından çekiyoruz.
export const getDialog = (state) => (dialogName) => state.dialogs[dialogName];
export const dialogMessage = (state) => state.dialogs.dialogMessage;
export const dialogType = (state) => state.dialogs.dialogType;
export const selectedMenu = (state) => state.selectedMenu;
export const btcPrice = (state) => state.btcPrice;
