<template>
  <v-card class="ma-auto" width="300px">
    <v-card-title class="text-center d-block">Community</v-card-title>
    <v-img src="@/assets/community.png" max-width="300px" />
    <v-card-actions class="white justify-center">
      <v-btn
        v-for="(social, i) in socials"
        :key="i"
        :color="social.color"
        class="white--text"
        fab
        icon
        x-large
        :href="social.link"
      >
        <v-icon>{{ social.icon }}</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  data: () => ({
    socials: [
      {
        icon: "mdi-instagram",
        color: "red lighten-3",
        link: "https://www.instagram.com/ldrguide",
      },
      {
        icon: "mdi-facebook",
        color: "indigo",
        link: "https://www.facebook.com/ldrguide",
      },
    ],
  }),
};
</script>