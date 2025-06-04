import axios from 'axios';

const API_URL = 'http://localhost:3000/api/v1/post';

export const getAllPosts = async () => {
  const res = await axios.get(`${API_URL}`);
  return res;
};

export const createPost = async (data) => {
    const res = axios.post(`${API_URL}`, data);
    return res;
} 

export const getUserPost = async (id) => {
    const res = await axios.get(`${API_URL}/user/${id}`);
    console.log("Fetched user posts")
    return res;
}

export const deletePost = async (id) => {
    const res = await axios.delete(`${API_URL}/${id}`);
    return res;
}

export const updatePost = async(id, data) => {
    const res = await axios.put(`${API_URL}/${id}`, data);
    return res;
}

export const getUsersDeletedPosts = (userId) => {
    const res = axios.get(`${API_URL}/user/deleted/${userId}`)
    return res
}

export const restorePost = async(id) => {
    const res = await axios.put(`${API_URL}/restore/${id}`);
    return res;
}