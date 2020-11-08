export const getUserName = (state) => state.user.name;
export const getUserItem = (state) => (item) => state[item];
export const user = (state) => state.user;
export const userLevel = (state) => state.userLevel;
export const loggedIn = (state) => state.loggedIn;
export const loginError = (state) => state.loginError;
