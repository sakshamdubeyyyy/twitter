import axios from 'axios';

const API_URL = 'http://13.127.33.33:3000/api/v1/auth';

export const registerUser = async (data) => {
  const res = await axios.post(`${API_URL}/register`, data);
  return res.data;
};

export const loginUser = async (data) => {
  const res = await axios.post(`${API_URL}/login`, data);
  return res.data;
};

export const logoutUser = async() => {
  const res = await axios.post(`${API_URL}/logout`)
  return res.data;
}