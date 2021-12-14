import axios from "axios";

const updateSiteData = payload => axios.put("/update_site_data/", payload);
const fetchSiteData = () => axios.get("/get_site_data");
const fetchAuthenticationStatus = () => axios.get("/get_authentication_status");
const authenticateUsingPassword = payload =>
  axios.post("/authenticate_using_password", payload);

const settingsApi = {
  updateSiteData,
  fetchSiteData,
  fetchAuthenticationStatus,
  authenticateUsingPassword,
};
export default settingsApi;
