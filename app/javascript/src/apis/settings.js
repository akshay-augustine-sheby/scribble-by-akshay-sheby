import axios from "axios";

const updateSiteData = payload => axios.put("/update_site_data/", payload);
const fetchSiteData = () => axios.get("/get_site_data");

const settingsApi = {
  updateSiteData,
  fetchSiteData,
};
export default settingsApi;
