import axios from "axios";

const getCount = () => axios.get("/get_articles_count");
const list = () => axios.get("/articles");

const articlesApi = {
  getCount,
  list,
};
export default articlesApi;
