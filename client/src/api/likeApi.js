import axios from 'axios';

const API_URL = 'http://13.127.33.33:3000/api/v1/like';

export const addLike = async (data) => {
  const res = await axios.post(`${API_URL}`, data);
  return res;
};

export const removeLike = async (data) => {
  const res = await axios.delete(`${API_URL}`, {data});
  return res;
};
