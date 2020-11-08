<template>
  <v-card>
    <v-card-title>Hesap Düzenle</v-card-title>
    <v-container>
      <v-row class="mx-2">
        <v-col cols="12">
          <v-text-field v-model="company.name" label="Firma Adı" />
        </v-col>
        <v-col cols="12">
          <v-text-field v-model="company.website" label="Website" />
        </v-col>
        <v-col cols="12">
          <v-text-field v-model="company.firmaEmail" label="Mail Adresi" />
        </v-col>
        <v-col cols="12">
          <v-text-field v-model="company.companyApiKey" label="Api Key" disabled />
        </v-col>
        <v-col cols="12">
          <v-text-field v-model="company.firmaSifre" label="Şifre" />
        </v-col>
        <v-col cols="12">
          <v-text-field v-model="company.firmaSifre2" label="Şİfre Tekrar" />
        </v-col>
        <v-col cols="12">
          <v-switch v-model="company.active" :label="company.active ? 'Aktif' : 'Deaktif'"></v-switch>
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
  name: "view-company",
  data() {
    return {
      company: null
    };
  },
  methods: {
    handleUpdate() {
      this.$swal({
        title: "Firma Güncelleme Onayı",
        text: this.company._id + " numaralı firmayı güncellemek istediğinizden emin misiniz?",
        icon: "warning",
        buttons: {
          cancel: "İptal",
          ok: "Güncelle"
        }
      }).then((confirm) => {
        if (confirm) {
          this.updateCompany(this.company);
        }
      });
    }
  },
  created() {
    this.company = this.getCompany(this.$route.params.id);
  }
};
</script>
