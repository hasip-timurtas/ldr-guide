export const companies = (state) => state.companies;
export const getCompany = (state) => (companyId) => state.companies.find((e) => e._id == companyId);
