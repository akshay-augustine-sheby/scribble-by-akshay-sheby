import axios from "axios";

const getCount = () => axios.get("/get_articles_count");
const list = () => axios.get("/articles");
const create = payload => axios.post("/articles/", payload);
const show = articleId => axios.get(`/articles/${articleId}`);
const update = ({ articleId, payload }) =>
  axios.put(`/articles/${articleId}`, payload);
const destroy = articleId => axios.delete(`/articles/${articleId}`);

const articlesApi = {
  getCount,
  list,
  create,
  show,
  update,
  destroy,
};
export default articlesApi;
