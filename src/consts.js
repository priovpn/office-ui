export default {
  apiUrl:
    process.env.NODE_ENV !== "production"
      ? "http://localhost:3050/api"
      : "https://oapi.priovpn.cc/api",
};
