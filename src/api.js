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

const deleteTokens = async (d) => {
  sessionStorage.removeItem(consts.tokenKey);
  localStorage.removeItem(consts.tokenKey);
  return d;
};

export default {
  auth: {
    fetch: () => instance.get("/user").then(({ data }) => data),
    signIn: (data) => instance.post("/signIn", data).then(({ data }) => data),
    signUp: (data) => instance.post("/signUp", data).then(({ data }) => data),
    signOut: () => instance.post("/signOut").then(deleteTokens),
  },
  sessions: {
    fetch: (params) =>
      instance.get("/sessions", { params }).then(({ data }) => data),
    close: (id) =>
      instance.post(`/sessions/${id}/close`).then(({ data }) => data),
    block: (id) =>
      instance.post(`/sessions/${id}/block`).then(({ data }) => data),
    closeAll: () =>
      instance.post(`/sessions/closeAll`).then(({ data }) => data),
  },
  devices: {
    fetch: (params) =>
      instance.get("/devices", { params }).then(({ data }) => data),
    create: (data) => instance.post("/devices", data).then(({ data }) => data),
    delete: (id) => instance.delete(`/devices/${id}`).then(({ data }) => data),
  },
  settings: {
    key: {
      reset: () => instance.post("/settings/resetKey").then(({ data }) => data),
    },
    twofa: {
      enable: () =>
        instance.post("/settings/enable2FA").then(({ data }) => data),
      confirm: (code) =>
        instance
          .post("/settings/confirm2FA", { code })
          .then(({ data }) => data),
      disable: () =>
        instance.post("/settings/disable2FA").then(({ data }) => data),
    },
    fido: {
      enable: (car) =>
        instance.post("/settings/enableFIDO", { car }).then(({ data }) => data),
      confirm: () =>
        instance.post("/settings/confirmFIDO").then(({ data }) => data),
      disable: () =>
        instance.post("/settings/disableFIDO").then(({ data }) => data),
    },
    data: {
      delete: () =>
        instance
          .post("/settings/deleteData")
          .then(deleteTokens)
          .then(({ data }) => data),
    },
  },
  status: () => instance.get("/status").then(({ data }) => data),
};
export { instance };
