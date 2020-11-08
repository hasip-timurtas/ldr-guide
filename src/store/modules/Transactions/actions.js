import TransactionService from "@/services/TransactionService";

export default {
  loadTransactions({ commit }) {
    TransactionService.loadTransactions()
      .then((response) => {
        commit("LOAD_TRANSACTIONS", response.data);
      })
      .catch((err) => console.log(err));
  },

  async loadPendingTransactions({ commit }) {
    await TransactionService.loadPendingTransactions()
      .then((response) => {
        commit("LOAD_PENDING_TRANSACTIONS", response.data);
      })
      .catch((err) => console.log(err));
  },

  async loadCompanyTransactions({ commit, dispatch }, firmaEmail) {
    await TransactionService.loadCompanyTransactions(firmaEmail)
      .then((response) => {
        commit("LOAD_COMPANY_TRANSACTIONS", response.data);
      })
      .catch((err) => {
        dispatch("common/setError", "İşlemleri Yüklerken bir hata meydana geldi, lütfen daha sonra tekrar deneyiniz.!", { root: true });
        console.log(err);
      });
  },

  updateTransaction({ commit, dispatch }, newTransaction) {
    const { comment, status, _id, userEmail } = newTransaction;
    TransactionService.updateTransaction({
      transactionId: _id,
      comment,
      status,
      userEmail
    })
      .then(() => {
        commit("UPDATE_TRANSACTION", newTransaction);
        dispatch("common/setSuccess", "İşlem Başarıyla güncellendi!", { root: true });
      })
      .catch((err) => {
        dispatch("common/setError", "İşlem güncellenirken bir hata meydana geldi, Lütfen daha sonra tekrar deneyiniz..!", { root: true });
        console.log(err);
      });
  },
  updatePendingTransaction({ commit, dispatch }, newTransaction) {
    const { comment, status, _id, userEmail } = newTransaction;
    TransactionService.updateTransaction({
      transactionId: _id,
      comment,
      status,
      userEmail
    })
      .then(() => {
        commit("UPDATE_TRANSACTION", newTransaction);
        dispatch("common/setSuccess", "İşlem Başarıyla güncellendi!", { root: true });
      })
      .catch((err) => {
        dispatch("common/setError", "İşlem güncellenirken bir hata meydana geldi, Lütfen daha sonra tekrar deneyiniz..!", { root: true });
        console.log(err);
      });
  }
};
