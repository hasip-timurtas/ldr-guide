import axios from "axios";
import nProgress from 'nprogress'

const apiKey = "3ad103bc12f645a3a889f5d6355e1ad9";

const apiClient = axios.create({
  baseURL: "https://api.payvolut.com/",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
});

apiClient.interceptors.request.use((config) => {
  nProgress.start();
  return config;
});

apiClient.interceptors.response.use((response) => {
  nProgress.done();
  return response;
});

export default {
  loadTransactions() {
    return apiClient.get("allTransactions/" + apiKey + "/10");
  },
  loadPendingTransactions() {
    return apiClient.get("pendingTransactions/" + apiKey + "/10");
  },
  loadCompanyTransactions(firmaEmail) {
    return apiClient.get("companyTransactions/" + apiKey + "/" + firmaEmail);
  },
  updateTransaction(data) {
    data.apiKey = apiKey;
    return apiClient.post("updateTransactionStatus", data);
  },
  updatePendingTransaction(data) {
    data.apiKey = apiKey;
    return apiClient.post("updateTransactionStatus", data);
  }
};
