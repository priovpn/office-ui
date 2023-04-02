<template>
  <v-app>
    <v-card v-if="userStore.user">
      <v-layout style="height: 100vh">
        <v-container>
          <app-bar />
          <app-view />
        </v-container>
      </v-layout>
    </v-card>
    <v-card v-else>
      <v-layout
        style="height: 100vh"
        class="flex justify-center align-center flex-column"
      >
        <img
          src="@/assets/favicon_dark.svg"
          width="256"
          class="loading__logo"
        />
      </v-layout>
    </v-card>
  </v-app>
</template>
<script>
import api from "@/api";
import userStore from "@/store/user.store";
import statusStore from "@/store/status.store";
import { useLocale } from "vuetify/lib/framework.mjs";
import uiStore from "@/store/ui.store";
import AppBar from "./AppBar.vue";
import AppView from "./View.vue";

export default {
  components: { AppBar, AppView },

  setup() {
    const lang = useLocale();
    return { lang, uiStore, userStore };
  },

  async mounted() {
    const user = await userStore.fetch();
    if (!user) this.$router.push("/auth/sign-in");

    const { alive } = await api.status();
    if (!alive) statusStore.status = "issues";
    else statusStore.status = "stable";
  },

  watch: {
    "uiStore.locale"(locale) {
      this.lang.current.value = locale;
    },
  },
};
</script>
<style scoped>
.loading__logo {
  animation: loading__logo 0.9s infinite;
}

@keyframes loading__logo {
  0% {
    transform: scale(0.92);
  }
  100% {
    transform: scale(1);
  }
}
</style>
