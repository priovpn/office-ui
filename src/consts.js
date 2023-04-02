export default {
  apiUrl:
    process.env.NODE_ENV !== "production"
      ? "http://localhost:20302/api"
      : "https://oapi.priovpn.cc/api",
  localeKey: "pvLocale",
  drawerKey: "pvDrawer",
  tokenKey: "pvak",
  accountsKey: "pvas",
};
