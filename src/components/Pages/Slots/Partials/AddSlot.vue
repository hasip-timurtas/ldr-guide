<template>
  <v-dialog :value="getDialog('addSlot')" width="500px" @input="handleDialogInput">
    <v-card>
      <v-card-title>Hesap Ekle</v-card-title>
      <v-container>
        <v-row class="mx-2">
          <v-col cols="12">
            <v-select v-model="newSlotData.paymentMethod" :items="paymentMethods" label="Ödeme Yöntemi" />
            <v-select v-model="newSlotData.slotGroup" :items="selectedSlotGroups" label="Ödeme Sağlayıcısı" />
            <v-text-field v-model="newSlotData.accountHolder" label="Hesap Sahibi" />
            <v-text-field v-model="newSlotData.iban" label="İban yada Cüzdan numarası" />
            <v-combobox
              item-text="name"
              item-value="_id"
              v-model="newSlotData.selectedStores"
              :items="companies"
              label="Gösterilecek firmalar"
              multiple
            />
            <v-switch v-model="newSlotData.active" :label="newSlotData.active ? 'Aktif' : 'Deaktif'"></v-switch>
          </v-col>
        </v-row>
      </v-container>
      <v-card-actions>
        <v-btn text color="primary" @click="handleCancel">İptal</v-btn>
        <v-spacer></v-spacer>
        <v-btn text @click="handleAddSlot">Ekle</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "add-slot",
  data() {
    return {
      dialog: false,
      newSlotData: {
        paymentMethod: null,
        slotGroup: null,
        accountHolder: null,
        iban: null,
        selectedStores: null,
        active: true
      }
    };
  },
  computed: {
    selectedSlotGroups() {
      return this.slotGroups.filter((e) => e.paymentMethod == this.newSlotData.paymentMethod);
    }
  },
  methods: {
    handleAddSlot() {
      for (const key in this.newSlotData) {
        if (!this.newSlotData[key]) {
          return this.setWarning("Lütfen bütün alanları doldurunuz");
        }
      }
      this.addSlot(this.newSlotData);
      this.setDialog({ dialogName: "addSlot", status: false });
    },
    handleDialogInput(e) {
      this.setDialog({ dialogName: "addSlot", status: e });
    },
    handleCancel() {
      this.setDialog({ dialogName: "addSlot", status: false });
    }
  }
};
</script>
