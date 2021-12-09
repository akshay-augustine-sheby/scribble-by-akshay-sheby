import axios from "axios";

const list = () => axios.get("/categories");
const create = payload => axios.post("/categories/", payload);
const updatePosition = ({ position, payload }) =>
  axios.put(`/update_position/${position}`, payload);

const categoriesApi = {
  list,
  create,
  updatePosition,
};
export default categoriesApi;
