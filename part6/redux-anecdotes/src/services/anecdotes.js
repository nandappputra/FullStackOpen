import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const save = async (data) => {
  const response = await axios.post(baseUrl, data);
  return response.data;
};

const vote = async (data) => {
  const response = await axios.put(`${baseUrl}/${data.id}`, data);
  return response.data;
};

const anecdoteService = {
  getAll,
  save,
  vote,
};

export default anecdoteService;
