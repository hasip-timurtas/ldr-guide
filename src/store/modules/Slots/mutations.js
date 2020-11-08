export default {
  ["LOAD_SLOTS"]: (state, slots) => {
    console.log(slots);
    state.slots = slots;
  },
  ["DELETE_SLOT"]: (state, slotId) => {
    state.slots = state.slots.filter((e) => e._id != slotId);
  },
  ["ADD_SLOT"]: (state, newSlot) => {
    state.slots.push(newSlot);
  },
  ["UPDATE_SLOT"]: (state, updatedSlot) => {
    const slotIndexInState = state.slots.findIndex((e) => e._id === updatedSlot._id);
    state.slots[slotIndexInState] = updatedSlot;
  }
};
