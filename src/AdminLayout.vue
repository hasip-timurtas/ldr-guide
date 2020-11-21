<template>
  <div>
    <router-view name="headerAndMenu" />
    <v-main class="main">
      <v-container padding="20px">
        <router-view />
      </v-container>
    </v-main>
    <v-dialog name="dialogMessage" :value="getDialog('generalDialog')" width="500px" @input="handleDialogInput">
      <v-card>
        <v-card-title>{{ dialogType }}</v-card-title>
        <v-container class="px-6">{{ dialogMessage }}</v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="handleCancel">Tamam</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "admin-app",
  props: {
    source: String
  },
  data: () => ({
    dialog: false,
    drawer: null
  }),
  methods: {
    loadInitialDatas() {
      if (!this.user) return;
      const userLevel = this.user.email.includes("firma") ? "company" : "admin";
      this.setUserLevel(userLevel);
      this.setMenu(userLevel);
      this.setBtcPrice();
      if (userLevel == "admin") {
        this.loadSlotGroups();
        this.loadSlots();
        this.loadCompanies();
        this.loadTransactions();
      } else {
        this.loadCompanyTransactions();
      }
    },
    handleDialogInput(e) {
      this.setDialog({ dialogName: "generalDialog", status: e });
    },
    handleCancel() {
      this.setDialog({ dialogName: "generalDialog", status: false });
    }
  },
  created() {
    this.loadInitialDatas();
  }
};
</script>

<style lang="scss">
.disable-events {
  pointer-events: none;
}

.header {
  background: black;
}
.main {
  background-color: $gradient-white !important;
}
</style>
