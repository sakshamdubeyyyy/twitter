import axios from "axios"

const API_URL = "http://13.127.33.33:3000/api/v1/comment"

export const getPostComments = async (id) => {
    const res = await axios.get(`${API_URL}/post/${id}`);
    return res.data;
}

export const makeNewComment = async (data) => {
    const res = await axios.post(`${API_URL}`, data);
    return res.data;
}

export const updateComment = async ({ comment_id, ...data }) => {
    const res = await axios.put(`${API_URL}/${comment_id}`, data).then((res) => res.data);
    return res;
}

export const deleteComment = async (commentId) => {
    const res = await axios.delete(`${API_URL}/${commentId}`);
    return res;
}