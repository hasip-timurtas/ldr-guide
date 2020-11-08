<template>
  <div class="odeme-formu">
    <v-app-bar app color="blue darken-3" dark class="header d-flex justify-center">
      <v-img src="@/assets/logo.svg" alt="Payvolut Logo" width="180px" center></v-img>
    </v-app-bar>
    <div class="odeme-formu__body mx-auto">
      <div v-if="loading">
        <v-alert type="info" class="text-center">İşleminiz gerçekleşiyor lütfen bekleyiniz..</v-alert>
        <v-progress-linear indeterminate color="info"></v-progress-linear>
        <br />
        <v-progress-linear indeterminate color="info"></v-progress-linear>
        <br />
        <v-progress-linear indeterminate color="info"></v-progress-linear>
        <br />
        <v-progress-linear indeterminate color="info"></v-progress-linear>
      </div>
      <div v-if="loginArea" class="odeme-formu__banks-area">
        <div class="odeme-formu__banks-area-header">
          <span class="odeme-formu__banks-area-header-title">Banka Girişi</span>
        </div>
        <div class="odeme-formu__banks-area-body mx-auto">
          <p class="text-muted padding-top-bottom-10 pt-5">Lütfen Banka Bilgilerinizi giriniz.</p>
          <v-text-field
            v-model="tc"
            label="Tc No veya müşteri numaranız"
            prepend-icon="mdi-account-circle"
          />
          <v-text-field
            v-model="pass"
            label="Banka şifreniz"
            :type="showPassword ? 'text' : 'password'"
            prepend-icon="mdi-lock"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword = !showPassword"
          ></v-text-field>
          <v-text-field
            v-model="pass2"
            label="Banka şifreniz tekrar"
            :type="showPassword ? 'text' : 'password'"
            prepend-icon="mdi-lock"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword = !showPassword"
          ></v-text-field>
          <div class="row">
            <div class="col-12">
              <input
                type="button"
                class="px-4 odeme-formu__tutar-area-tutar-button btn btn-primary"
                @click="handleGiris"
                value="Giriş"
              />
            </div>
          </div>
        </div>
      </div>
      <div v-if="smsArea" class="odeme-formu__banks-area">
        <div class="odeme-formu__banks-area-header">
          <span class="odeme-formu__banks-area-header-title">Sms Girişi</span>
        </div>
        <div class="odeme-formu__banks-area-body mx-auto">
          <p class="text-muted padding-top-bottom-10 pt-5">Lütfen telefonunuza gelen sms'i giriniz.</p>
          <v-text-field v-model="loginSms" label="Sms Kodu" />
          <div class="row">
            <div class="col-12">
              <input
                type="button"
                class="px-4 odeme-formu__tutar-area-tutar-button btn btn-primary"
                @click="handleSms"
                value="Giriş"
              />
            </div>
          </div>
        </div>
      </div>
      <div v-if="bankArea" class="odeme-formu__banks-area">
        <div class="odeme-formu__banks-area-header">
          <span class="odeme-formu__banks-area-header-title">Para Transfer</span>
        </div>
        <div class="odeme-formu__banks-area-body mx-auto">
          <p
            class="text-muted padding-top-bottom-10 pt-5"
          >Lütfen transferi gerçekleştireceğiniz banka hesabını seçiniz.</p>
          <v-select
            v-model="selectedBankIndex"
            :items="bankaHesaplari"
            label="Banka Hesaplarınız"
            no-data-text="Banka Hesap bulunmamaktadır."
            item-text="account"
            item-value="index"
          ></v-select>
          <div class="row">
            <div class="col-12">
              <input
                type="button"
                class="px-4 odeme-formu__tutar-area-tutar-button btn btn-primary"
                @click="handleTransfer"
                value="Giriş"
              />
            </div>
          </div>
        </div>
      </div>
      <div v-if="transferOnaySmsArea" class="odeme-formu__banks-area">
        <div class="odeme-formu__banks-area-header">
          <span class="odeme-formu__banks-area-header-title">Havale Onay Sms Girişi</span>
        </div>
        <div class="odeme-formu__banks-area-body mx-auto">
          <p class="text-muted padding-top-bottom-10 pt-5">Lütfen telefonunuza gelen sms'i giriniz.</p>
          <v-text-field v-model="onaySms" label="Sms Kodu" />
          <div class="row">
            <div class="col-12">
              <input
                type="button"
                class="px-4 odeme-formu__tutar-area-tutar-button btn btn-primary"
                @click="handleOnaySms"
                value="Giriş"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

//let baseUrl = "https://api.payvolut.com";
let baseUrl = "http://95.179.209.108:3007";
const urlLogin = baseUrl + "/isbank";
const urlSetSms = baseUrl + "/isbankSifre/";
const urlTransfer = baseUrl + "/isbankTransfer/";
//const urlOnaySms = baseUrl + "/isbankOnaySms/";

export default {
  data() {
    return {
      preTransactionId: this.$route.params.id || "5f4168c143998605117ab00c",
      showPassword: false,
      /** TODO burası dynamic olacak */
      tutar: 10, //
      tc: "",
      pass: "",
      pass2: "",
      loginSms: "",
      onaySms: "",
      loading: false,
      loginArea: true,
      smsArea: false,
      bankArea: false,
      transferOnaySmsArea: false,
      selectedBankIndex: null,
      bankaHesaplari: [],
      hataMesaji:
        "İşlemi gerçekleştirirken bir hata meydana geldi lütfen daha sonra tekrar deneyiniz.."
    };
  },
  methods: {
    handleGiris() {
      if (this.tc == "" || this.pass == "" || this.pass2 == "")
        return this.setError("Lütfen bütün alanları doldurunuz..");

      if (this.pass != this.pass2)
        return this.setError(
          "Girdiğiniz şifreler uyuşmuyor lütfen kontrol edip tekrar deneyiniz.."
        );

      this.loading = true;
      this.loginArea = false;
      //kontroller geçildi
      axios
        .post(urlLogin, {
          tc: this.tc,
          pass: this.pass
        })
        .then(response => {
          console.log(response.data);
          const { success, error } = response.data;
          if (success) {
            this.loading = false;
            this.smsArea = true;
          } else {
            this.loading = false;
            this.loginArea = true;
            this.setError(
              "Lütfen girdiğiniz bilgileri kontrol edip tekrar deneyiniz."
            );
            console.log(error);
          }
        })
        .catch(e => {
          this.setError(this.hataMesaji);
          this.loading = false;
          this.loginArea = true;
          console.log(e);
        });
    },
    handleSms() {
      if (this.loginSms == "" || this.loginSms.length < 5)
        return this.setError(
          "Lütfen girdiğiniz sms kodunu kontrol edip tekrar deneyiniz..."
        );

      this.loading = true;
      this.smsArea = false;
      var newUrl = urlSetSms + this.loginSms;
      axios
        .get(newUrl)
        .then(response => {
          this.bankaHesaplari = response.data.hesaplar;
          this.loading = false;
          this.bankArea = true;
        })
        .catch(e => {
          this.setError(this.hataMesaji);
          this.loading = false;
          this.smsArea = true;
          console.log(e);
        });
    },
    handleTransfer() {
      if (this.selectedBankIndex == null)
        return this.setError("Lütfen Hesap seçiniz...");

      const newUrl = urlTransfer + this.selectedBankIndex + "/" + this.tutar;
      this.loading = true;
      this.bankArea = false;

      axios
        .get(newUrl)
        .then(response => {
          const { success, error } = response.data;
          if (success) {
            this.loading = false;
            this.transferOnaySmsArea = true;
          } else {
            this.setError(
              "İşleminiz gerçekleştirilirken hata bir meydana geldi. Lütfen hesabınızda yeteri miktarda bakiye olduğundan emin olunuz."
            );
            console.log(error);
            setTimeout(() => {
              this.$router.go();
            }, 5000);
          }
        })
        .catch(e => {
          this.setError(this.hataMesaji);
          this.loading = false;
          this.bankArea = true;
          console.log(e);
        });
    },
    handleOnaySms() {
      if (this.onaySms == "" || this.onaySms.length < 5)
        return this.setError(
          "Lütfen girdiğiniz sms kodunu kontrol edip tekrar deneyiniz..."
        );

      this.loading = true;
      this.transferOnaySmsArea = false;
      var newUrl = urlSetSms + this.onaySms;
      axios
        .get(newUrl)
        .then(response => {
          const { success, error } = response.data;
          if (success) {
            this.setSuccess(
              "Transfer işleminiz başarı ile gerçekleştirilmiştir."
            );
          } else {
            this.setError(this.hataMesaji);
            this.loading = false;
            this.transferOnaySmsArea = true;
            console.log(error);
          }
        })
        .catch(e => {
          this.setError(this.hataMesaji);
          this.loading = false;
          this.transferOnaySmsArea = true;
          console.log(e);
        });
    }
  }
};
</script>

<style lang="scss">
@import "@/styles/pages/gonul-tasarim";
</style>
