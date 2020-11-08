export default {
  ["SET_USER_NAME"]: (state, newUserName) => {
    state.user.name = newUserName;
  },
  ["SET_LOGGED_IN"]: (state, value) => {
    state.loggedIn = value;
  },
  ["SET_USER"]: (state, data) => {
    state.user = data;
  },
  ["SET_USER_LEVEL"]: (state, userLevel) => {
    state.userLevel = userLevel;
  },
  ["SET_LOGIN_ERROR"]: (state, err) => {
    state.loginError = err;
  }
};
