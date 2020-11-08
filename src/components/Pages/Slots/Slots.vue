<template>
  <div class="slots">
    <v-card>
      <v-card-title>
        Hesaplar
        <v-spacer></v-spacer>
        <v-text-field v-model="search" append-icon="mdi-magnify" label="Ara" single-line hide-details></v-text-field>
      </v-card-title>
      <v-data-table v-if="slots" class="my-data-table" :headers="headers" :items="slots" :search="search" :items-per-page="5">
        <template v-slot:item.paymentMethod="{ item }">{{ formatPaymentMethod(item.paymentMethod) }}</template>
        <template v-slot:item.slotGroup="{ item }">{{ formatSlotGroup(item.slotGroup) }}</template>
        <template v-slot:item.active="{ item }">
          <v-btn text small :color="item.active ? ' success' : 'error'">{{ item.active ? "AKTİF" : "DEAKTİF" }}</v-btn>
        </template>
        <template v-slot:item.view="{ item }">
          <v-icon @click="handleRedirect(item._id)">mdi-pencil</v-icon>
          <v-icon @click="openDialog(item)">mdi-delete</v-icon>
        </template>
        <template v-slot:item.addedDate="{ item }">
          {{ new Date(item.addedDate).toLocaleDateString() + " " }}
          <small>{{ new Date(item.addedDate).toLocaleTimeString() }}</small>
        </template>
      </v-data-table>
    </v-card>
    <v-btn bottom color="pink" dark fab fixed right @click="handleOpenDialog">
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <add-slot />
  </div>
</template>

<script>
import AddSlot from "./Partials/AddSlot";
export default {
  name: "slots",
  components: { AddSlot },
  data() {
    return {
      selectedItem: {},
      search: "",
      headers: [
        {
          text: "ID",
          align: "start",
          sortable: false,
          value: "_id"
        },
        { text: "Banka", value: "slotGroup" },
        { text: "Ödeme Yöntemi", value: "paymentMethod" },
        { text: "Aktif", value: "active" },
        { text: "Hesap Sahibi", value: "accountHolder" },
        { text: "IBAN", value: "iban" },
        { text: "Oluşturma Tarihi", value: "addedDate" },
        { text: "Aksiyonlar", value: "view" }
      ]
    };
  },
  methods: {
    openDialog(item) {
      this.$swal({
        title: "Hesap Silme Onayı",
        text: item._id + " numaralı hesabı silmek istediğinizden emin misiniz?",
        icon: "warning",
        buttons: {
          cancel: "İptal",
          confirm: { text: "Sil", className: "sweet-warning" }
        },
        dangerMode: true
      }).then((confirm) => {
        if (confirm) {
          // OK seçildi
          this.deleteSlot(item._id);
        }
      });
    },
    handleRedirect(slotId) {
      this.$router.push("/view-slot/" + slotId);
    },
    handleOpenDialog() {
      this.setDialog({ dialogName: "addSlot", status: true });
    },
    formatSlotGroup(slotGroup) {
      const formattedSLotGroup = this.slotGroups.find((e) => e.value == slotGroup);
      if (formattedSLotGroup) return formattedSLotGroup.text;
      return slotGroup;
    },
    formatPaymentMethod(paymentMethod) {
      const formattedPaymentMethod = this.paymentMethods.find((e) => e.value == paymentMethod);
      if (formattedPaymentMethod) return formattedPaymentMethod.text;
      return paymentMethod;
    }
  },
  created() {
    this.loadSlots();
  }
};
</script>

<style lang="scss">
/* TABLE PAGİNATİON'U ÜSTE TAŞIMAK İÇİN

.my-data-table {
  display: flex;
  flex-direction: column;
}

.my-data-table .v-data-footer {
  order: -1;
}
*/
</style>
