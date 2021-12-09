import axios from "axios";

const list = () => axios.get("/categories");
const create = payload => axios.post("/categories/", payload);
const updatePosition = ({ position, payload }) =>
  axios.put(`/update_position/${position}`, payload);
const destroy = categoryId => axios.delete(`/categories/${categoryId}`);
const update = ({ categoryId, payload }) =>
  axios.put(`/categories/${categoryId}`, payload);

const categoriesApi = {
  list,
  create,
  updatePosition,
  destroy,
  update,
};
export default categoriesApi;
