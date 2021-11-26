import axios from "axios";

const getCount = () => axios.get("/get_count");
const articlesApi = {
  getCount,
};
export default articlesApi;
