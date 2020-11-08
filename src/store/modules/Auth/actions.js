import { auth } from "@/plugins/firebase";
import router from "@/router/index";

export default {
  async setUserName({ commit }, userName) {
    commit("SET_USER_NAME", userName);
  },

  fetchUser({ commit }, user) {
    commit("SET_LOGGED_IN", user !== null);
    if (user) {
      commit("SET_USER", {
        userId: user.uid,
        email: user.email
      });
    } else {
      commit("SET_USER", null);
    }
  },

  async singIn({ commit, dispatch }, { email, pass }) {
    auth
      .signInWithEmailAndPassword(email, pass)
      .then((data) => {
        if (data.user) {
          commit("SET_USER", {
            userId: data.user.uid,
            email: data.user.email
          });
          commit("SET_LOGGED_IN", true);

          // Eğer user mail firma içeriyorsa userimiz firma, eğer içermiyorsa admin.
          let userLevel = data.user.email.includes("firma") ? "company" : "admin";
          commit("SET_USER_LEVEL", userLevel);
          dispatch("common/setMenu", userLevel, { root: true });
          router.push("/");
        } else {
          dispatch("common/setError", data.message, { root: true });
          commit("SET_LOGGED_IN", false);
        }
      })
      .catch((err) => {
        switch (err.code) {
          case "auth/user-not-found":
            dispatch("common/setError", "Kullanıcı adı veya şifre yanlış, lütfen bilgilerinizi kontrol edip tekrar deneyiniz.", { root: true });
            break;
          default:
            dispatch("common/setError", err.message, { root: true });
            break;
        }
        console.log(err);
      });
  },

  changePassword({ dispatch }, newPassword) {
    auth.currentUser.updatePassword(newPassword).then(
      () => {
        dispatch("common/setSuccess", "Şifre Başarıyla değiştirildi!", { root: true });

        console.log("Şifre başarıyla güncelleştirildi.");
        // Update successful.
      },
      (error) => {
        dispatch("common/setError", "Şifre değiştirilirken bir hata oluştu: Hata detayı : " + error.message, { root: true });
      }
    );
  },

  setUserLevel({ commit }, userLevel) {
    commit("SET_USER_LEVEL", userLevel);
  },

  signOut({ commit }) {
    auth.signOut().then(() => {
      commit("SET_USER", null);
      commit("SET_LOGGED_IN", false);
      commit("SET_USER_LEVEL", null);
      router.push("/login");
    });
  }
};
