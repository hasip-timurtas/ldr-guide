export default {
  ["LOAD_COMPANIES"]: (state, companies) => {
    console.log(companies);
    state.companies = companies;
  },
  ["DELETE_COMPANY"]: (state, companyId) => {
    state.companies = state.companies.filter((e) => e._id != companyId);
  },
  ["ADD_COMPANY"]: (state, newCompany) => {
    state.companies.push(newCompany);
  },
  ["UPDATE_COMPANY"]: (state, updatedCompany) => {
    const companyIndexInState = state.companies.findIndex((e) => e._id === updatedCompany._id);
    state.companies[companyIndexInState] = updatedCompany;
  }
};
