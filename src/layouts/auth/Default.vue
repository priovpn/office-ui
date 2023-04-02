<template>
  <v-app>
    <v-container
      class="d-flex justify-center align-center text-h5"
      style="min-height: 100vh"
    >
      <default-view />
    </v-container>
  </v-app>
</template>
<script>
import DefaultView from "./View.vue";
import userStore from "@/store/user.store.js";
import uiStore from "@/store/ui.store";
import { useLocale } from "vuetify/lib/framework.mjs";

export default {
  components: { DefaultView },

  setup() {
    const lang = useLocale();

    return { lang };
  },

  data() {
    return {
      uiStore,
    };
  },

  mounted() {
    if (userStore.token) {
      this.$router.push("/");
    }
  },

  watch: {
    "uiStore.locale"(locale) {
      this.lang.current.value = locale;
    },
  },
};
</script>
