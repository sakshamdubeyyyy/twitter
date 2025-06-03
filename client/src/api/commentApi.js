import axios from "axios"

const API_URL = "http://localhost:3000/api/v1/comment"

export const getPostComments = async (id) => {
    const res = await axios.get(`${API_URL}/post/${id}`);
    return res.data;
}

export const makeNewComment = async (data) => {
    const res = await axios.post(`${API_URL}`, data);
    return res.data;
}