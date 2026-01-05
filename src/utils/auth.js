export const register = () => {
  return Promise.resolve({ message: "Demo mode" });
};

export const authorize = () => {
  return Promise.resolve({ token: "demo-token" });
};

export const checkToken = () => {
  return Promise.resolve({
    _id: "demo-user",
    email: "demo@demo.com",
  });
};
