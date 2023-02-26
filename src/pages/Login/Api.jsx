import axios from "axios";

const API_URL = "http://localhost:3000";

export const login = async (username, password) => {
  const response = await axios.get(
    `${API_URL}/users?username=${username}&password=${password}`
  );
  return response.data[0];
};

export const isAuthenticated = () => {
  console.log(localStorage.getItem("user"));
  console.log(localStorage.getItem("token"));
  return localStorage.getItem("user") !== null;
};

export const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
};
