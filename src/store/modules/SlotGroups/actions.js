import axios from "axios";

const baseUrl = "https://api.payvolut.com/";
const apiKey = "3ad103bc12f645a3a889f5d6355e1ad9";

export default {
  loadSlotGroups({ commit }) {
    axios
      .get(baseUrl + "allSlotGroups/" + apiKey)
      .then((response) => {
        commit("LOAD_SLOTGROUPS", response.data);
      })
      .catch((err) => console.log(err));
  },

  deleteSlotGroup({ commit }, slotId) {
    axios
      .post(baseUrl + "deleteSlotGroup", {
        _id: slotId,
        apiKey
      })
      .then(() => {
        commit("DELETE_SLOTGROUP", slotId);
      })
      .catch((err) => console.log(err));
  },

  addaddSlotGroupSlot({ commit }, newSlot) {
    axios
      .post(baseUrl + "addSlotGroup", {
        apiKey,
        ...newSlot
      })
      .then(() => {
        commit("ADD_SLOTGROUP", newSlot);
      })
      .catch((err) => console.log(err));
  },

  updateSlotGroup({ commit }, newSlot) {
    axios
      .post(baseUrl + "updateSlotGroup", {
        apiKey,
        ...newSlot
      })
      .then(() => {
        commit("UPDATE_SLOTGROUP", newSlot);
      })
      .catch((err) => console.log(err));
  }
};
