export const slotGroups = (state) => state.slotGroups;
export const getSlotGroup = (state) => (slotGroupId) => state.slotGroups.find((slotGroup) => slotGroup._id == slotGroupId);
