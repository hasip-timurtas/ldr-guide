<template>
  <v-card class="odeme-formu__body mx-auto" flat>
    <v-card-title class="justify-center">
      <h1 class="odeme-formu__body-title">Payvolut Ödeme Sayfası</h1>
    </v-card-title>
    <v-card-text>
      <p
        class="odeme-formu__body-description text-center"
      >Lütfen İşlem yapmak istediğiniz ödeme yöntemini seçiniz ve ileri butonuna tıklayınız.</p>
      <div class="odeme-formu__banks-area">
        <div class="odeme-formu__banks-area-header">
          <span
            class="odeme-formu__banks-area-header-title"
          >İşlem Yapmak İstediğiniz Yöntemi Seçiniz</span>
        </div>
        <div class="odeme-formu__banks-area-body">
          <v-radio-group v-model="selectedPaymentMethod">
            <v-radio
              v-for="(i, key) in companyPaymentMethods"
              :key="key"
              :label="i.text"
              :value="i.value"
            ></v-radio>
          </v-radio-group>
        </div>
      </div>
    </v-card-text>
    <v-card-actions>
      <div class="odeme-formu__tutar-area">
        <div class="odeme-formu__tutar-area-tutar">
          <button
            @click="handleIleri"
            type="button"
            class="odeme-formu__tutar-area-tutar-button btn btn-secondary"
          >İleri</button>
        </div>
      </div>
    </v-card-actions>
  </v-card>
</template>

<script>
import axios from "axios";

export default {
  name: "step1",
  props: {
    preTransactionId: String
  },
  data() {
    return {
      companyPaymentMethods: null,
      selectedPaymentMethod: null
    };
  },
  created() {
    this.initial();
  },
  methods: {
    handleIleri() {
      if (!this.selectedPaymentMethod) {
        this.setError(
          "Lütfen İşlem yapmak istediğiniz ödeme yöntemini seçiniz.."
        );
        return;
      }
      if (this.selectedPaymentMethod == "anindahavale") {
        // Eğer ödeme yöntemi anaında havale ise
        this.$router.push({
          name: "AnindaHavale",
          params: { id: this.preTransactionId }
        });
      }

      this.$emit("nextPage", this.selectedPaymentMethod);
    },
    handleGeri() {
      this.$emit("prevPage");
    },
    initial() {
      axios
        .get(
          "https://api.payvolut.com/deposit-page-step1/" + this.preTransactionId
          //"http://95.179.209.108:3006/deposit-page-step1/" +
          // this.preTransactionId
        )
        .then(response => {
          this.companyPaymentMethods = response.data;
        })
        .catch(err => console.log(err));
    }
  }
};
</script>
