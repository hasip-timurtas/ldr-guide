<template>
  <div class="transactions">
    <v-btn to="/transactions-list" color="info" text class="mb-2">
      Tamamlanan İşlemler
      <v-icon right>mdi-arrow-right-bold</v-icon>
    </v-btn>
    <v-card>
      <v-card-title>
        Bekleyen İşlemler
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Ara"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        v-if="pendingTransactions"
        class="my-data-table"
        :headers="headers"
        :items="pendingTransactions"
        :search="search"
        :items-per-page="25"
        :footer-props="{ itemsPerPageOptions:[10,25,50,100] }"
      >
        <template v-slot:item.type="{ item }">
          <v-btn
            text
            small
            :color="item.type == 'deposit' ? ' success' : 'error'"
          >{{ item.type == "deposit" ? "Yatırım" : "Çekim" }}</v-btn>
        </template>
        <template v-slot:item.status="{ item }">
          <v-btn text small :color="statusButtons[item.status]">{{ statusTexts[item.status] }}</v-btn>
        </template>
        <template v-slot:item.createdOn="{item}">
          {{new Date(item.createdOn).toLocaleDateString() + ' '}}
          <small>{{new Date(item.createdOn).toLocaleTimeString()}}</small>
        </template>
        <template v-slot:item.view="{ item }">
          <v-icon @click="handleRedirect(item)" class="mx-auto d-block">mdi-eye-settings-outline</v-icon>
        </template>
        <template v-slot:no-data>
          <v-alert
            :value="true"
            color="info"
            icon="mdi-thumb-up-outline"
            class="mt-3"
            text
          >Bütün işlemler tamamlandı, henüz işlem yok.</v-alert>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "pending-transactions",
  data() {
    return {
      selectedItem: {},
      search: "",
      headers: [
        { text: "ID", align: "start", value: "_id" },
        { text: "Firma", value: "company.name" },
        { text: "İşlem Tipi", value: "type" },
        { text: "Müşteri", value: "customer.fullName" },
        { text: "Tutar", value: "payment.amount" },
        { text: "Durum", value: "status" },
        { text: "Oluşturulma Tarihi", value: "createdOn" },
        { text: "Görüntüle", value: "view", align: "center" }
      ],
      statuses: [
        { text: "Beklemede", value: "pending" },
        { text: "İşlemde", value: "processing" },
        { text: "Tamamlandı", value: "completed" },
        { text: "İptal", value: "cancelled" }
      ],
      statusButtons: {
        pending: "warning",
        processing: "info",
        completed: "success",
        cancelled: "error"
      },
      statusTexts: {
        pending: "Beklemede",
        processing: "İşlemde",
        completed: "Tamamlandı",
        cancelled: "İptal"
      }
    };
  },
  methods: {
    handleRedirect(transaction) {
      console.log(transaction);
      this.$router.push(
        "/view-transaction/" + transaction._id + "/" + transaction.status
      );
    }
  },
  created() {
    console.log("Pending Transactions", this.userLevel);
    if (this.userLevel == "company") {
      this.$router.push({ name: "CompanyTransactions" });
    }
    this.loadPendingTransactions();
    this.interval = setInterval(() => this.loadPendingTransactions(), 5000);
  }
};
</script>
