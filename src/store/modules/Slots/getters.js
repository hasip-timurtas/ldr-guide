export const slots = (state) => state.slots;
export const getSlot = (state) => (slotId) => state.slots.find((slot) => slot._id == slotId);
