import axios from "axios";

const updateSiteData = payload => axios.put("/update_site_data/", payload);

const settingsApi = {
  updateSiteData,
};
export default settingsApi;
