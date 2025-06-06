import axios from "axios";

const API_URL = "http://localhost:3000/api/v1/notifications";

export const getUserNotifications = async (id) => {
  const res = await axios.get(`${API_URL}/unseen/${id}`);
  return res.data;
};

export const markNotificationSeen = async (id) => {
  const res = await axios.patch(`${API_URL}/${id}/seen`);
  return res.data;
};

export const getDeletedNotifications = async (id) => {
  const res = await axios.get(`${API_URL}/deleted/${id}`);
  return res.data;
};

export const getAllUserNotifications = async (id) => {
  const res = await axios.get(`${API_URL}/${id}/active`);
  return res.data;
};

export const deleteNotification = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};
