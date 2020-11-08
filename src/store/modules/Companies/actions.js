import axios from "axios";

const baseUrl = "https://api.payvolut.com/";
const apiKey = "3ad103bc12f645a3a889f5d6355e1ad9";

export default {
  loadCompanies({ commit }) {
    axios
      .get(baseUrl + "allCompanies/" + apiKey)
      .then((response) => {
        commit("LOAD_COMPANIES", response.data);
      })
      .catch((err) => console.log(err));
  },

  deleteCompany({ commit, dispatch }, companyId) {
    axios
      .post(baseUrl + "deleteCompany", {
        _id: companyId,
        apiKey
      })
      .then(() => {
        commit("DELETE_COMPANY", companyId);
        dispatch("common/setSuccess", "Firma Başarıyla Silindi!", { root: true });
      })
      .catch((err) => {
        console.log(err);
        dispatch("common/setError", "Firma Silerken bir hata meydana geldi, lütfen daha sonra tekrar deneyiniz.!", { root: true });
      });
  },

  addCompany({ commit, dispatch }, newCompany) {
    axios
      .post(baseUrl + "addCompany", {
        apiKey,
        ...newCompany
      })
      .then(() => {
        commit("ADD_COMPANY", newCompany);
        dispatch("common/setSuccess", "Firma Başarıyla EKlendi!", { root: true });
      })
      .catch((err) => {
        console.log(err);
        dispatch("common/setError", "Firma EKlerken bir hata meydana geldi, lütfen daha sonra tekrar deneyiniz.!", { root: true });
      });
  },

  updateCompany({ commit, dispatch }, newCompany) {
    axios
      .post(baseUrl + "updateCompany", {
        apiKey,
        ...newCompany
      })
      .then(() => {
        commit("UPDATE_COMPANY", newCompany);
        dispatch("common/setSuccess", "Firma Başarıyla Güncellendi!", { root: true });
      })
      .catch((err) => {
        console.log(err);
        dispatch("common/setError", "Firma Güncellerken bir hata meydana geldi, lütfen daha sonra tekrar deneyiniz.!", { root: true });
      });
  }
};
