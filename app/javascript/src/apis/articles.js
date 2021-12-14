import axios from "axios";

const getCount = () => axios.get("/get_articles_count");
const list = () => axios.get("/articles");
const create = payload => axios.post("/articles/", payload);
const show = slug => axios.get(`/articles/${slug}`);
const update = ({ slug, payload }) => axios.put(`/articles/${slug}`, payload);
const destroy = slug => axios.delete(`/articles/${slug}`);

const articlesApi = {
  getCount,
  list,
  create,
  show,
  update,
  destroy,
};
export default articlesApi;
