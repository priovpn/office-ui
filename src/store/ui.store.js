import consts from "@/consts";
import { reactive } from "vue";

export default reactive({
  drawer: {
    show: localStorage.getItem(consts.drawerKey)
      ? localStorage.getItem(consts.drawerKey) === "true"
      : true,
    rail: true,
  },

  locale: localStorage.getItem(consts.localeKey),

  changeLocale(locale) {
    this.locale = locale;
    localStorage.setItem(consts.localeKey, locale);
  },
});
