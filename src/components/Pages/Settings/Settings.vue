<template>
  <v-card>
    <v-card-title>Şifre Değiştir</v-card-title>
    <v-card-text>
      <v-form>
        <v-text-field
          v-model="password"
          label="Şifre"
          :type="showPassword ? 'text' : 'password'"
          prepend-icon="mdi-lock"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPassword = !showPassword"
        ></v-text-field>
        <v-text-field
          v-model="password2"
          label="Şifre Tekrar"
          :type="showPassword ? 'text' : 'password'"
          prepend-icon="mdi-lock"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPassword = !showPassword"
        ></v-text-field>
      </v-form>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn color="info" @click="handleChangePassword">Tamam</v-btn>
    </v-card-actions>
  </v-card>
</template> 

<script>
export default {
  name: "settings",
  data() {
    return {
      showPassword: false,
      password: null,
      password2: null
    };
  },
  methods: {
    handleChangePassword() {
      if (!this.password && this.password != this.password2) {
        this.setDialog({
          dialogName: "generalDialog",
          status: true,
          dialogMessage:
            "Şifreler uyuşmuyor lütfen kontrol edip tekar deneyiniz.."
        });
      }

      this.changePassword(this.password);
    }
  }
};
</script>