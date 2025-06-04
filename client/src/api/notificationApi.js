import axios from "axios";

const API_URL = "http://localhost:3000"
export const fetchNotifications = async (userId) => {
  const res = await axios.get(`${API_URL}/${userId}`);
  return res.data;
};
