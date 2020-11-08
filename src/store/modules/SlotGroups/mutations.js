export default {
  ["LOAD_SLOTGROUPS"]: (state, slotGroups) => {
    state.slotGroups = slotGroups;
  },
  ["DELETE_SLOTGROUP"]: (state, slotGroupId) => {
    state.slotGroups = state.slotGroups.filter((e) => e._id != slotGroupId);
  },
  ["ADD_SLOTGROUP"]: (state, newSlotGroup) => {
    state.slotGroups.push(newSlotGroup);
  },
  ["UPDATE_SLOTGROUP"]: (state, updatedSlotGroup) => {
    const slotGroupIndexInState = state.slotGroups.findIndex((e) => e._id === updatedSlotGroup._id);
    state.slotGroups[slotGroupIndexInState] = updatedSlotGroup;
  }
};
