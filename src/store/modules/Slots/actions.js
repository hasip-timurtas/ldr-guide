import axios from "axios";

const baseUrl = "https://api.payvolut.com/";
const apiKey = "3ad103bc12f645a3a889f5d6355e1ad9";

export default {
  loadSlots({ commit, dispatch }) {
    axios
      .get(baseUrl + "allSlots/" + apiKey)
      .then((response) => {
        const slots = response.data.sort((a, b) => new Date(b.addedDate) - new Date(a.addedDate));
        console.log(slots);
        commit("LOAD_SLOTS", slots);
      })
      .catch((err) => {
        dispatch("common/setError", "Hesapları Yüklerken bir hata meydana geldi, lütfen daha sonra tekrar deneyiniz.!", { root: true });
        console.log(err);
      });
  },

  deleteSlot({ commit, dispatch }, slotId) {
    axios
      .post(baseUrl + "deleteSlot", {
        _id: slotId,
        apiKey
      })
      .then(() => {
        commit("DELETE_SLOT", slotId);
        dispatch("common/setSuccess", "Hesap Başarıyla Silindi!", { root: true });
      })
      .catch((err) => {
        console.log(err);
        dispatch("common/setError", "Hesap Silerken bir hata meydana geldi, lütfen daha sonra tekrar deneyiniz.!", { root: true });
      });
  },

  addSlot({ dispatch }, newSlot) {
    axios
      .post(baseUrl + "addSlot", {
        apiKey,
        ...newSlot
      })
      .then(() => {
        dispatch("loadSlots");
        dispatch("common/setSuccess", "Hesap Başarıyla Eklendi!", { root: true });
      })
      .catch((err) => {
        console.log(err);
        dispatch("common/setError", "Hesap Eklerken bir hata meydana geldi, lütfen daha sonra tekrar deneyiniz.!", { root: true });
      });
  },

  updateSlot({ commit, dispatch }, newSlot) {
    axios
      .post(baseUrl + "updateSlot", {
        apiKey,
        ...newSlot
      })
      .then(() => {
        commit("UPDATE_SLOT", newSlot);
        dispatch("common/setSuccess", "Hesap Başarıyla Güncellendi!", { root: true });
      })
      .catch((err) => {
        console.log(err);
        dispatch("common/setError", "Hesap Güncellerken bir hata meydana geldi, lütfen daha sonra tekrar deneyiniz.!", { root: true });
      });
  }
};
