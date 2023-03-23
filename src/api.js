import axios from "axios";
import consts from "./consts";

export const getToken = () =>
  sessionStorage.getItem(consts.tokenKey) ||
  localStorage.getItem(consts.tokenKey) ||
  null;

const instance = axios.create({
  baseURL: consts.apiUrl,
});

instance.interceptors.request.use((config) => {
  config.headers["Authorization"] = getToken()
    ? "Bearer " + getToken()
    : undefined;
  return config;
});

export default instance;
