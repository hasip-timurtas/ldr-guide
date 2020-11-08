<template>
  <v-dialog :value="getDialog('addCompany')" width="500px" @input="handleDialogInput">
    <v-card>
      <v-card-title>Firma Ekle</v-card-title>
      <v-container>
        <v-row class="mx-2">
          <v-col cols="12">
            <v-text-field v-model="newCompanyData.name" label="Firma Adı" />
            <v-text-field v-model="newCompanyData.website" label="Website" />
            <v-text-field v-model="newCompanyData.companyApiKey" label="Api Key" />
            <v-text-field v-model="newCompanyData.firmaEmail" label="Mail Adresi" />
            <v-text-field
              v-model="newCompanyData.firmaSifre"
              label="Şifre"
              :type="showPassword ? 'text' : 'password'"
              prepend-icon="mdi-lock"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="showPassword = !showPassword"
            ></v-text-field>
            <v-text-field
              v-model="newCompanyData.firmaSifre2"
              label="Şifre Tekrar"
              :type="showPassword ? 'text' : 'password'"
              prepend-icon="mdi-lock"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="showPassword = !showPassword"
            ></v-text-field>
            <v-switch v-model="newCompanyData.active" :label="newCompanyData.active ? 'Aktif' : 'Deaktif'"></v-switch>
          </v-col>
        </v-row>
      </v-container>
      <v-card-actions>
        <v-btn text color="primary" @click="handleCancel">İptal</v-btn>
        <v-spacer></v-spacer>
        <v-btn text @click="handleAddCompany">Ekle</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { v4 as uuidv4 } from "uuid";

export default {
  name: "add-company",
  data() {
    return {
      dialog: false,
      showPassword: false,
      newCompanyData: {
        name: null,
        website: null,
        companyApiKey: uuidv4(),
        active: true,
        firmaEmail: null,
        firmaSifre: null,
        firmaSifre2: null
      }
    };
  },
  methods: {
    handleAddCompany() {
      for (const key in this.newCompanyData) {
        if (!this.newCompanyData[key]) {
          return this.setWarning("Lütfen bütün alanları doldurunuz");
        }
      }

      if (this.newCompanyData.firmaSifre != this.newCompanyData.firmaSifre2) {
        return this.setWarning("Şifreler uyuşmuyor, Lütfen kontrol edip tekrar deneyiniz.");
      }

      this.addCompany(this.newCompanyData);
      this.setDialog({ dialogName: "addCompany", status: false });
    },
    handleDialogInput(e) {
      this.setDialog({ dialogName: "addCompany", status: e });
    },
    handleCancel() {
      this.setDialog({ dialogName: "addCompany", status: false });
    }
  }
};
</script>
