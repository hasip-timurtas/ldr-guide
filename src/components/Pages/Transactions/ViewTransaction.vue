<template>
  <v-card>
    <v-card-title>İşlem Düzenle</v-card-title>
    <v-container>
      <v-row class="mx-2">
        <v-app-bar color="info" dark>İşlem Bilgileri</v-app-bar>
        <v-col cols="12">
          <v-text-field v-model="transaction._id" label="İşlem Numarası" class="disable-events" />
          <v-text-field v-model="transaction.type" label="İşlem Tipi" class="disable-events" />
          <v-text-field v-model="transaction.company.name" label="Firma" class="disable-events" />
          <v-text-field v-model="transaction.slot.paymentMethod" label="Ödeme Yöntemi" class="disable-events" />

          <div class="caption grey--text">Oluşturulma Tarihi</div>
          {{ new Date(transaction.createdOn).toLocaleDateString() + " " }}
          <small>{{ new Date(transaction.createdOn).toLocaleTimeString() }}</small>
          <v-divider class="mb-5"></v-divider>

          <template v-if="transaction.processedOn">
            <div class="caption grey--text">Düzenlenme Tarihi</div>
            {{ new Date(transaction.processedOn).toLocaleDateString() + " " }}
            <small>{{ new Date(transaction.processedOn).toLocaleTimeString() }}</small>
            <v-divider></v-divider>
          </template>
        </v-col>
        <v-app-bar color="info lighten-1" dark>Müşteri Bilgileri</v-app-bar>
        <v-col cols="12">
          <v-text-field v-model="transaction.customer.fullName" label="İsim ve Soyisim" class="disable-events" />
          <v-text-field v-if="transaction.customer.phone" v-model="transaction.customer.phone" label="Telefon Numarası" class="disable-events" />
          <v-text-field v-if="transaction.customer.email" v-model="transaction.customer.email" label="Email Adresi" class="disable-events" />
          <v-text-field v-model="transaction.payment.amount" label="Ödeme Tutarı" class="disable-events" />
          <v-text-field v-if="transaction.customer.bank" v-model="transaction.customer.bank" label="Ödeme Sağlayıcısı" class="disable-events" />
          <v-text-field v-if="transaction.customer.iban" v-model="transaction.customer.iban" label="IBAN" class="disable-events" />
        </v-col>
        <v-app-bar v-if="transaction.type == 'deposit'" color="info lighten-1" dark>Ödemenin Yapıldığı Hesap Bilgisi</v-app-bar>
        <v-col v-if="transaction.type == 'deposit'" cols="12">
          <v-text-field v-model="transaction.slot.slotGroup" label="Bank" class="disable-events" />
          <v-text-field v-model="transaction.slot.iban" label="IBAN" class="disable-events" />
          <v-text-field v-model="transaction.slot.accountHolder" label="Hesap Sahibi" class="disable-events" />
        </v-col>
        <v-app-bar color="info lighten-2" dark>Aksiyonlar</v-app-bar>
        <v-col cols="12">
          <v-select v-model="transaction.status" :items="statuses" label="Durum" :disabled="!pendingTransaction" />
          <v-text-field v-model="transaction.comment" label="Not" />
          <v-text-field v-if="transaction.userEmail" v-model="transaction.userEmail" label="İşlemi Gerçekleştiren" class="disable-events" />
        </v-col>
      </v-row>
    </v-container>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn text color="primary" @click="$router.go(-1)">Geri</v-btn>
      <v-btn v-if="canUpdate" text @click="handleUpdate">Güncelle</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "view-transaction",
  data() {
    return {
      transaction: null,
      confirmationDialog: false,
      canUpdate: false,
      statuses: [
        { text: "Beklemede", value: "pending" },
        { text: "İşlemde", value: "processing" },
        { text: "Tamamlandı", value: "completed" },
        { text: "İptal", value: "cancelled" }
      ]
    };
  },
  methods: {
    handleUpdate() {
      this.$swal({
        title: "İşlem Güncelleme Onayı",
        text: this.transaction._id + " numaralı işlemi güncellemek istediğinizden emin misiniz?",
        icon: "warning",
        buttons: {
          cancel: "İptal",
          ok: "Güncelle"
        }
      }).then((confirm) => {
        if (confirm) {
          this.updatePendingTransaction(this.transaction);
        }
      });
    }
  },
  created() {
    // eğer type pending
    this.pendingTransaction = ["pending", "processing"].includes(this.$route.params.type);

    if (this.pendingTransaction) {
      this.transaction = this.getPendingTransaction(this.$route.params.id);
    } else if (this.$route.params.type == "company") {
      this.transaction = this.getCompanyTransaction(this.$route.params.id);
    } else {
      this.transaction = this.getTransaction(this.$route.params.id);
    }

    /*
    // Slot Group'u slectte gösterdiğimiz gibi valuesini baz alıp text'ini gösteriyoruz.
    this.transaction.slot.slotGroup = this.slotGroups.find(
      e => e.value == this.transaction.slot.slotGroup
    ).text;

    // Payment Moethodu selecte gösterdiğimiz gibi textini yazıyoruz.
    this.transaction.payment.paymentMethod = this.paymentMethods.find(
      e => e.value == this.transaction.payment.paymentMethod
    ).text;

    */
    this.canUpdate = this.pendingTransaction || !this.$route.params.type == "company";
  }
};
</script>
