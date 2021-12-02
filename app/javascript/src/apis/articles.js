import axios from "axios";

const getCount = () => axios.get("/get_articles_count");
const list = () => axios.get("/articles");
const create = payload => axios.post("/articles/", payload);

const articlesApi = {
  getCount,
  list,
  create,
};
export default articlesApi;
