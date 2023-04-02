/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

// Composables
import { createVuetify } from "vuetify";
import { VDataTableServer } from "vuetify/labs/VDataTable";
import consts from "@/consts";
import en from "@/locales/en.js";
import ru from "@/locales/ru.js";

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    themes: {
      light: {
        colors: {
          primary: "#19252f",
          secondary: "#5CBBF6",
          background: "#f5f5f5",
        },
      },
    },
  },
  locale: {
    locale: localStorage.getItem(consts.localeKey),
    fallback: "en",
    messages: { en, ru },
  },
  components: {
    VDataTableServer,
  },
});
