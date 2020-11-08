<template>
  <v-card>
    <v-card-title>Hesap Düzenle</v-card-title>
    <v-container>
      <v-row class="mx-2">
        <v-col cols="12">
          <v-select v-model="slot.paymentMethod" :items="paymentMethods" label="Ödeme Yöntemi" />
        </v-col>
        <v-col cols="12">
          <v-select v-model="slot.slotGroup" :items="selectedSlotGroups" label="Ödeme Sağlayıcısı" />
        </v-col>
        <v-col cols="12">
          <v-text-field v-model="slot.accountHolder" label="Hesap Sahibi" />
        </v-col>
        <v-col cols="12">
          <v-text-field v-model="slot.iban" label="İban yada Cüzdan numarası" />
        </v-col>
        <v-col cols="12">
          <v-combobox item-text="name" item-value="_id" v-model="slot.selectedStores" :items="companies" label="Gösterilecek firmalar" multiple />
        </v-col>
        <v-col cols="12">
          <v-switch v-model="slot.active" :label="slot.active ? 'Aktif' : 'Deaktif'"></v-switch>
        </v-col>
      </v-row>
    </v-container>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn text color="primary" @click="$router.go(-1)">Geri</v-btn>
      <v-btn text @click="handleUpdate">Güncelle</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "view-slot",
  data() {
    return {
      slot: null
    };
  },
  computed: {
    selectedSlotGroups() {
      return this.slotGroups.filter((e) => e.paymentMethod == this.slot.paymentMethod);
    }
  },
  methods: {
    handleUpdate() {
      this.$swal({
        title: "Hesap Güncelleme Onayı",
        text: this.slot._id + " numaralı hesabı güncellemek istediğinizden emin misiniz?",
        icon: "warning",
        buttons: {
          cancel: "İptal",
          ok: "Güncelle"
        }
        //dangerMode: true
      }).then((confirm) => {
        if (confirm) {
          this.updateSlot(this.slot);
        }
      });
    }
  },
  created() {
    this.slot = this.getSlot(this.$route.params.id);
  }
};
</script>
