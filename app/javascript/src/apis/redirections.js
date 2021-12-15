import axios from "axios";

const list = () => axios.get("/redirections");
const create = payload => axios.post("/redirections/", payload);
const destroy = redirectionId => axios.delete(`/redirections/${redirectionId}`);
const update = ({ redirectionId, payload }) =>
  axios.put(`/redirections/${redirectionId}`, payload);

const redirectionsApi = {
  list,
  create,
  destroy,
  update,
};
export default redirectionsApi;
