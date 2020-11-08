<template>
  <div class="odeme-formu">
    <v-app-bar app color="blue darken-3" dark class="header d-flex justify-center">
      <v-img src="@/assets/logo.svg" alt="Payvolut Logo" width="180px" center></v-img>
    </v-app-bar>
    <v-stepper v-model="step" class="flat">
      <v-stepper-header>
        <v-stepper-step :complete="step > 1" step="1">Ödeme Yöntemi</v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="step > 2" step="2">Hesap Bilgileri</v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step step="3">Sonuç</v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <step1
            :preTransactionId="preTransactionId"
            @nextPage="forwardToStep2"
            @prevPage="backToStep1"
          ></step1>
        </v-stepper-content>

        <v-stepper-content step="2">
          <step2
            v-if="selectedPaymentMethod"
            :preTransactionId="preTransactionId"
            @nextPage="forwardToStep3"
            :selectedPaymentMethod="selectedPaymentMethod"
          ></step2>

          <v-btn text @click="step = 1" color="info">GERİ</v-btn>
        </v-stepper-content>

        <v-stepper-content step="3">
          <div v-if="result && result.success" class="text-center">
            <h1 class="pb-5">BAŞARILI</h1>
            <v-alert
              type="success"
            >Talebiniz Başarılı Bir Şekilde Tarafımıza İletilmiştir. Kısa Süre İçerisinde Sonuçlanacaktır. Siteye yönlendriliyorsunuz..</v-alert>
          </div>
          <div v-else>
            <v-alert
              type="error"
            >İşleminiz gerçekleştirilirken bir hata oluştu, lütfen daha sonra tekrar deneyiniz.</v-alert>
          </div>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </div>
</template>

<script>
import Step1 from "./Partials/Step1";
import Step2 from "./Partials/Step2";

export default {
  name: "deposit",
  components: {
    Step1,
    Step2
  },
  data() {
    return {
      preTransactionId: this.$route.params.id || "5f280301994f363b4287aeec",
      step: 1,
      selectedPaymentMethod: null,
      result: null
    };
  },
  methods: {
    forwardToStep2(selectedPaymentMethod) {
      this.selectedPaymentMethod = selectedPaymentMethod;
      this.step = 2;
    },
    backToStep1() {
      this.selectedPaymentMethod = null;
      this.step = 1;
    },
    forwardToStep3(result) {
      console.log(result);
      this.result = result;
      this.step = 3;
      if (result.success) {
        setTimeout(() => {
          console.log("Yönlendir");
          window.location.href = result.website;
        }, 5000);
      }
    },
    backToStep2() {
      this.step = 2;
    }
  }
};
</script>

<style lang="scss">
@import "@/styles/pages/gonul-tasarim";
</style>

