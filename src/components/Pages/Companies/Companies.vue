<template>
  <div class="companies">
    <v-card>
      <v-card-title>
        Firmalar
        <v-spacer></v-spacer>
        <v-text-field v-model="search" append-icon="mdi-magnify" label="Ara" single-line hide-details></v-text-field>
      </v-card-title>
      <v-data-table v-if="companies" class="my-data-table" :headers="headers" :items="companies" :search="search" :items-per-page="5">
        <template v-slot:item.active="{ item }">
          <v-btn text small :color="item.active == true ? ' success' : 'error'">{{ item.active == true ? "AKTİF" : "DEAKTİF" }}</v-btn>
        </template>
        <template v-slot:item.view="{ item }">
          <v-icon @click="handleRedirect(item._id)">mdi-pencil</v-icon>
        </template>
      </v-data-table>
    </v-card>
    <v-btn bottom color="pink" dark fab fixed right @click="handleOpenDialog">
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <add-company />
  </div>
</template>

<script>
import AddCompany from "./Partials/AddCompany";
export default {
  name: "companies",
  components: { AddCompany },
  data() {
    return {
      search: "",
      headers: [
        { text: "ID", align: "start", value: "_id" },
        { text: "Firma Adı", value: "name" },
        { text: "Aktif", value: "active" },
        { text: "Aksiyonlar", value: "view" }
      ]
    };
  },
  methods: {
    openDialog(item) {
      // //<v-icon @click="openDialog(item)">mdi-delete</v-icon>  // mdi-pencil in alintaydi. kaldirdik simdilik
      this.$swal({
        title: "Firma Silme Onayı",
        text: item._id + " numaralı firmayı silmek istediğinizden emin misiniz?",
        icon: "warning",
        buttons: {
          cancel: "İptal",
          confirm: { text: "Sil", className: "sweet-warning" }
        }
      }).then((confirm) => {
        if (confirm) {
          this.deleteCompany(item._id);
        }
      });
    },
    handleRedirect(companyId) {
      this.$router.push("/view-company/" + companyId);
    },
    handleOpenDialog() {
      this.setDialog({ dialogName: "addCompany", status: true });
    }
  },
  created() {
    this.loadCompanies();
  }
};
</script>
