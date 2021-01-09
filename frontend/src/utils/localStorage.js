export const getDataFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem('auth'));
};
