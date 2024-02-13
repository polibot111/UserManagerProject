
let globalToken = '';

export const setGlobalToken = (token) => {
  globalToken = token;
};

export const getGlobalToken = () => {
  return globalToken;
};