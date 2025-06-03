import axios from 'axios';

const API_URL = 'http://localhost:3000/api/v1/user';

export const getAllUsers = async () => {
  const res = await axios.get(`${API_URL}`);
  return res;
};

export const getUserById = async (id) => {
    const res = await axios.get(`${API_URL}/${id}`);
    return res;
}

export const updateUser = (userId, updatedFields) => {
  return axios.put(`${API_URL}/${userId}`, updatedFields);
};

