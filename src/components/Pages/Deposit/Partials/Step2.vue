<template>
  <v-card class="odeme-formu__body mx-auto" flat>
    <v-card-title class="justify-center">
      <h1 class="odeme-formu__body-title">{{ title }}</h1>
    </v-card-title>
    <v-card-text>
      <p class="odeme-formu__body-description text-center">{{ description1 }}</p>
      <div class="odeme-formu__banks-area">
        <div class="odeme-formu__banks-area-header">
          <span class="odeme-formu__banks-area-header-title">{{ title2 }}</span>
        </div>
        <div class="odeme-formu__banks-area-body">
          <v-expansion-panels flat hover v-if="data">
            <v-expansion-panel
              v-for="(item, i) in data.slotGroups"
              :key="i"
              @click="handleSetSelectedSlot(item.slot)"
            >
              <v-expansion-panel-header>{{ item.text }}</v-expansion-panel-header>
              <v-expansion-panel-content>
                <div class="odeme-formu__iban-area">
                  <p class="odeme-formu__iban-area-iban">{{ item.slot.accountHolder }}</p>
                  <p>{{ item.slot.iban }}</p>
                  <button
                    type="button"
                    class="odeme-formu__tutar-area-tutar-button btn btn-secondary"
                    @click="handleCopyIban"
                  >{{ buttonText }}</button>
                </div>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </div>
      </div>
      <p class="odeme-formu__description2 text-center">{{ description2 }}</p>
    </v-card-text>
    <v-card-actions>
      <div class="odeme-formu__tutar-area">
        <div class="odeme-formu__tutar-area-yatirim-text">
          Yatırım Miktarı :
          <strong>{{ data && data.preTransaction.payment.amount }} (TRY)</strong>
        </div>
        <div class="odeme-formu__tutar-area-tutar">
          <button
            @click="handleGonder"
            type="button"
            class="odeme-formu__tutar-area-tutar-button btn btn-secondary"
          >Gönder</button>
        </div>
      </div>
    </v-card-actions>
  </v-card>
</template>

<script>
import axios from "axios";
export default {
  name: "step2",
  props: {
    preTransactionId: String,
    selectedPaymentMethod: String
  },
  data() {
    return {
      data: null,
      selectedSlot: null,
      title: "",
      title2: "",
      description1: "",
      description2: "",
      buttonText: ""
    };
  },
  created() {
    console.log("Cretaed");
    this.initial();
  },
  watch: {
    selectedPaymentMethod(newVal) {
      console.log(newVal);
      this.getSlots();
      this.setDescriptions();
    }
  },
  methods: {
    handleGonder() {
      if (!this.selectedSlot) {
        this.setError("Lütfen İşlem yapmak istediğiniz bankayı seçiniz..");
        return;
      }

      axios
        .post(`https://api.payvolut.com/checkPreTransaction-vue`, {
          preTransactionId: this.preTransactionId,
          slotId: this.selectedSlot._id
        })
        .then(response => {
          const result = response.data;
          this.$emit("nextPage", result);
        })
        .catch(err => console.log(err));
    },
    handleSetSelectedSlot(slot) {
      console.log(slot);
      this.selectedSlot = slot;
    },
    handleCopyIban() {
      this.$copyText(this.selectedSlot.iban);
      this.buttonText = "Kopyalandı";
      setTimeout(() => {
        this.buttonText = "Tekrar kopyala";
      }, 1000);
    },
    initial() {
      this.getSlots();
      this.setDescriptions();
    },
    getSlots() {
      axios
        .get(
          `https://api.payvolut.com/deposit-page-step2/${this.preTransactionId}/${this.selectedPaymentMethod}`
        )
        .then(response => {
          this.data = response.data;
        })
        .catch(err => console.log(err));
    },
    setDescriptions() {
      switch (this.selectedPaymentMethod) {
        case "banktransfer":
          this.title = "Banka Havalesi Yatırım Formu";
          this.title2 = "İşlem Yapmak istediğiniz Bankayı Seçiniz";
          this.description1 = `Lütfen işlemi gerçekleştireceğiniz bankayı seçiniz, Daha sonra aşağıda IBAN numarası gösterilecektir. Seçilen IBAN numarasına ödemeyi
        gerçekleştirdikten sonra 'GÖNDER' butonuna tıklayınız.`;
          this.description2 = `Seçeneklerde uygun banka hesabı bulamadığınız takdirde 17:00'a kadar listedeki herhangi bir bankaya EFT işlemi gerçekleştirebilirsiniz.`;
          this.buttonText = "İbanı kopyala";
          break;
        case "wallet":
          this.title = "Sanal Cüzdan Yatırım Formu";
          this.title2 = "İşlem yapmak istediğiniz Kurumu Seçiniz";
          this.description1 = `Lütfen işlemi gerçekleştireceğiniz kurumu seçiniz, Daha sonra aşağıda hesap numarası gösterilecektir. Seçilen hesap numarasına ödemeyi
        gerçekleştirdikten sonra 'Gönder' butonuna tıklayınız.`;
          this.buttonText = "Cüzdan numarasını kopyala";
          break;
        case "crypto":
          this.title = "Kripto Para Yatırım Formu";
          this.title2 = "İşlem Yapmak istediğiniz Kripto Parayı Seçiniz";
          this.description1 = `Lütfen işlemi gerçekleştireceğiniz kripto para'yı seçiniz. Daha sonra aşağıda cüzdan bilgisi gösterilecektir. Seçilen cüzdan numarasına ödemeyi
          gerçekleştirdikten sonra 'Gönder' butonuna tıklayınız.`;
          this.buttonText = "Cüzdan numarasını kopyala";
          break;
        default:
          break;
      }
    }
  }
};
</script>

