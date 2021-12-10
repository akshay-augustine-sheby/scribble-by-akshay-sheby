import axios from "axios";

const updateSiteData = payload => axios.put("/update_site_data/", payload);
const fetchSiteData = () => axios.get("/get_site_data");
const fetchAuthenticationStatus = () => axios.get("/get_authentication_status");

const settingsApi = {
  updateSiteData,
  fetchSiteData,
  fetchAuthenticationStatus,
};
export default settingsApi;
