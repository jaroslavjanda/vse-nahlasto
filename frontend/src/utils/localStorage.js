export const getDataFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("quacker-auth"))
}
