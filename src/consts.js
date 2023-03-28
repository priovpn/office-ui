export default {
  apiUrl:
    process.env.NODE_ENV !== "production"
      ? "http://localhost:3056/api"
      : "https://oapi.priovpn.cc/api",
  localeKey: "pvLocale",
  drawerKey: "pvDrawer",
  tokenKey: "pvak",
  mnemonicKey: "__key",
  mnemonicKeyTs: "__key_ts",
};
