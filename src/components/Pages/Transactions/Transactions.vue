<template>
  <div class="transactions">
    <v-card>
      <v-card-title>
        <v-row class="pa-4">
          <v-text-field v-model="depositAmount" label=" YATIRIM ( TL )" readonly outlined></v-text-field>
          <v-text-field v-model="WithdrawalAmount" label=" ÇEKİM ( TL )" readonly outlined></v-text-field>
          <v-text-field v-model="totalAmount" label="TOPLAM ( TL )" readonly outlined></v-text-field>
          <v-text-field v-model="komisyon" label=" KOMİSYON ( TL )" readonly outlined></v-text-field>
          <v-text-field v-model="komisyonTotal" label="KOMİSYON TOPLAMI( TL )" readonly outlined></v-text-field>
          <v-text-field v-model="btcAmount" label=" BTC DEĞERİ" readonly outlined></v-text-field>

          <v-col cols="12">
            <v-row>
              <v-menu
                v-model="datePicker1"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="startDate"
                    label="Başlangıç Tarihi"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="startDate"
                  @input="datePicker1 = false"
                  :show-current="false"
                ></v-date-picker>
              </v-menu>
              <v-menu
                v-model="datePicker2"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="endDate"
                    label="Bitiş Tarihi"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="endDate" @input="datePicker2 = false" :show-current="false"></v-date-picker>
              </v-menu>
            </v-row>
            <v-divider class="my-5"></v-divider>
            <v-row>
              İşlemler
              <v-spacer></v-spacer>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Ara"
                single-line
                hide-details
              ></v-text-field>
              <v-spacer></v-spacer>
              <v-btn color="info" small @click="handleDownloadExcel">Excel İndİr</v-btn>
            </v-row>
          </v-col>
        </v-row>
      </v-card-title>
      <v-data-table
        v-if="newTransactions"
        class="my-data-table"
        :headers="headers"
        :items="newTransactions"
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
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import { json2excel } from "js2excel";
import moment from "moment";

export default {
  name: "transactions",
  data() {
    return {
      datePicker1: false,
      datePicker2: false,
      startDate: null,
      endDate: null,
      selectedItem: {},
      search: "",
      selectedType: "all",
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
  computed: {
    newTransactions() {
      return this.transactions.filter(
        e =>
          e.status == "completed" &&
          moment(e.createdOn).format("YYYY-MM-DD") >= this.startDate &&
          moment(e.createdOn).format("YYYY-MM-DD") <= this.endDate
      );
    },
    depositAmount() {
      return this.newTransactions
        .filter(e => e.type === "deposit")
        .map(e => {
          return Number(e.payment.amount);
        })
        .reduce((t, c) => t + c, 0);
    },
    WithdrawalAmount() {
      return this.newTransactions
        .filter(e => e.type === "withdrawal")
        .map(e => {
          return Number(e.payment.amount);
        })
        .reduce((t, c) => t + c, 0);
    },
    totalAmount() {
      return this.depositAmount - this.WithdrawalAmount;
    },
    komisyon() {
      return (this.depositAmount / 100) * 8;
    },
    komisyonTotal() {
      return this.totalAmount - this.komisyon;
    },
    btcAmount() {
      return (this.komisyonTotal / this.btcPrice).toFixed(8);
    }
  },
  methods: {
    handleRedirect(transaction) {
      this.$router.push(
        "/view-transaction/" + transaction._id + "/" + transaction.status
      );
    },
    handleDownloadExcel() {
      // format data for downloading
      const data = this.transactions.map(e => {
        return {
          ID: e._id,
          Firma: e.company.name,
          "İşlem Tipi": e.type == "deposit" ? "Yatırım" : "Çekim",
          Müşteri: e.customer.fullName,
          Tutar: e.payment.amount,
          Durum: this.statusTexts[e.status],
          "Oluşturulma Tarihi": moment(e.createdOn).format(
            "MMM DD YYYY HH:mm:ss"
          )
        };
      });
      try {
        json2excel({
          data,
          name: "Transactions List_" + new Date().getUTCMilliseconds(),
          formateDate: "dd.mm.yyyy hh:ss"
        });
      } catch (e) {
        console.error("export error");
      }
    },
    setDates() {
      this.startDate = moment()
        .startOf("month")
        .format("YYYY-MM-DD");
      this.endDate = moment().format("YYYY-MM-DD");
    }
  },
  created() {
    if (this.userLevel == "company") {
      // user company ise bu sayfayı görmesin company transactionsa gitsin.
      this.$router.push({ name: "CompanyTransactions" });
    }

    this.setDates();
    this.loadTransactions();
  }
};
</script>
