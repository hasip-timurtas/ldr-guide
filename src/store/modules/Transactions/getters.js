export const transactions = (state) => state.transactions;
export const getTransaction = (state) => (transactionId) => state.transactions.find((e) => e._id == transactionId);
export const pendingTransactions = (state) => state.pendingTransactions;
export const getPendingTransaction = (state) => (transactionId) => state.pendingTransactions.find((e) => e._id == transactionId);
export const companyTransactions = (state) => state.companyTransactions;
export const getCompanyTransaction = (state) => (transactionId) => state.companyTransactions.find((e) => e._id == transactionId);
