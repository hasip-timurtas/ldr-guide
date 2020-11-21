<template>
  <div>
    <v-app-bar class="header" :clipped-left="$vuetify.breakpoint.lgAndUp" app color="blue darken-3" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title style="width: 300px;" class="ml-0 pl-4">
        <router-link to="/">
          <v-img src="@/assets/logo.svg" alt="Payvolut Logo" width="100px"></v-img>
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="signOut">
        <v-icon>mdi-exit-to-app</v-icon>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" :clipped="$vuetify.breakpoint.lgAndUp" app>
      <v-list dense>
        <template v-for="item in selectedMenu">
          <v-list-item v-if="!item.children" :key="item.text" :to="item.link" link @click="item.click ? item.click() : false">
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ item.text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-group v-else :key="item.text" v-model="item.model" :prepend-icon="item.model ? item.icon : item['icon-alt']" append-icon>
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>{{ item.text }}</v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item v-for="(child, i) in item.children" :key="i" :to="child.link" link>
              <v-list-item-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>{{ child.text }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
        </template>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      drawer: null,
      items: [
        {
          text: "İşlemler",
          link: "/pending-transactions-list",
          icon: "mdi-bank-transfer"
        },
        {
          text: "Hesaplar",
          icon: "mdi-badge-account-horizontal-outline",
          link: "/slots-list"
        },
        {
          text: "Firmalar",
          icon: "mdi-domain",
          link: "/companies-list"
        },
        {
          text: "Ayarlar",
          link: "/settings",
          icon: "mdi-cog-outline"
        },
        {
          text: "Eski Siteye Dön",
          icon: "mdi-arrow-left-bold-box-outline",
          click: () => (window.location.href = "https://ide.payvolut.com")
        }
      ]
    };
  }
};
</script>

<style lang="scss">
.header {
  /*
  height: 55px;
  background: #2f353a;
  display: flex;
  align-items: center;
  position: fixed;
  z-index: 100;
  width: 100%;


  @include tablet-to {
    justify-content: center;
  }
  */

  width: 100%;
  height: $header-height;
  background-image: $gradient !important;
  //display: flex;
  //align-items: center;
  position: fixed;
  z-index: 100;

  &__logo {
    cursor: pointer;
    width: 150px;

    @include tablet-from {
      margin-left: 15px;
    }
  }
}
</style>
