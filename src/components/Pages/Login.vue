<template>
  <div class="login">
    <v-card v-if="!loggedIn" width="500" class="mx-auto mt-10">
      <v-card-title>Giriş</v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field v-model="email" label="Email Adres" prepend-icon="mdi-account-circle" />
          <v-text-field
            v-model="pass"
            label="Şifre"
            :type="showPassword ? 'text' : 'password'"
            prepend-icon="mdi-lock"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword = !showPassword"
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn color="success" @click="handleRegister">Kayıt Ol</v-btn>
        <v-spacer></v-spacer>
        <v-btn color="info" @click="login">Giriş</v-btn>
      </v-card-actions>
    </v-card>
    <div v-else class="login__aready-login">
      <h2>Giriş yapıldı. Yönlendiriliyorsunuz..</h2>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showPassword: false,
      dialog: true,
      email: "",
      pass: ""
    };
  },
  methods: {
    handleRegister() {
      this.setDialog({
        dialogName: "generalDialog",
        status: true,
        dialogMessage: "Kayıt işlemi şu anda yapılmamaktadır. Lütfen yetkili ile iletişime geçiniz."
      });
    },
    login() {
      if (this.email != "" && this.pass != "") {
        this.singIn({ email: this.email, pass: this.pass });
      } else {
        this.setDialog({
          dialogName: "generalDialog",
          status: true,
          dialogMessage: "kullanıcı adı yada şifre boş olamaz."
        });
      }
    },
    logout() {
      this.signOut();
    }
  },
  created() {
    if (this.user) {
      this.$router.push({ name: "Admin" });
    }
  }
};
</script>
