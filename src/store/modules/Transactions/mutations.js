export default {
  LOAD_TRANSACTIONS(state, transactions) {
    state.transactions = transactions;
  },
  LOAD_PENDING_TRANSACTIONS(state, pendingTransactions) {
    state.pendingTransactions = pendingTransactions;
  },
  LOAD_COMPANY_TRANSACTIONS(state, transactions) {
    state.companyTransactions = transactions;
  },
  UPDATE_TRANSACTION(state, updatedTransaction) {
    const transactionIndexInState = state.transactions.findIndex((e) => e._id === updatedTransaction._id);
    state.transactions[transactionIndexInState] = updatedTransaction;
  },
  UPDATE_PENDING_TRANSACTION(state, updatedTransaction) {
    const transactionIndexInState = state.pendingTransactions.findIndex((e) => e._id === updatedTransaction._id);
    state.pendingTransactions[transactionIndexInState] = updatedTransaction;
  }
};
