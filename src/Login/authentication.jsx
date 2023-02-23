const authentication = () => {
  const user = localStorage.getItem("user");
  const token = localStorage.getItem("token");
  const isAuthenticated = token && user;
  return isAuthenticated;
};

export default authentication;
