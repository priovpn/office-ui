<template>
  <drawer />

  <v-app-bar prominent v-if="userStore.user" elevation="3">
    <v-app-bar-title style="font-weight: 800">
      {{ $vuetify.locale.t(`$vuetify.menubar.${$route.name}`) }}
    </v-app-bar-title>

    <v-spacer></v-spacer>

    <v-app-bar-nav-icon
      variant="text"
      @click.stop="uiStore.drawer.show = !uiStore.drawer.show"
    ></v-app-bar-nav-icon>

    <v-menu min-width="100px" rounded>
      <template v-slot:activator="{ props }">
        <v-btn v-bind="props" icon>
          <v-icon>mdi-earth</v-icon>
        </v-btn>
      </template>

      <v-card>
        <v-btn
          variant="text"
          href="#"
          @click.prevent="() => uiStore.changeLocale('en')"
          block
        >
          English
        </v-btn>
        <v-btn
          variant="text"
          href="#"
          @click.prevent="() => uiStore.changeLocale('ru')"
          block
        >
          Русский
        </v-btn>
      </v-card>
    </v-menu>

    <v-menu min-width="100px" rounded>
      <template v-slot:activator="{ props }">
        <v-btn variant="flat" v-bind="props">
          {{ userStore.user.login }}
        </v-btn>
      </template>
      <v-card>
        <v-btn variant="text" to="/sign-out">
          {{ $vuetify.locale.t("$vuetify.menubar.signOut") }}
        </v-btn>
      </v-card>
    </v-menu>
  </v-app-bar>
</template>

<script>
import uiStore from "@/store/ui.store";
import userStore from "@/store/user.store";
import statusStore from "@/store/status.store";
import * as parsers from "@/utils/parsers";
import { useLocale } from "vuetify/lib/framework.mjs";
//import SystemBar from "./SystemBar.vue";
import Drawer from "./Drawer.vue";

export default {
  components: {
    //SystemBar,
    Drawer,
  },
  setup() {
    const { current } = useLocale();
    return {
      userStore,
      changeLocale: (locale) => (current.value = locale),
      statusStore,
      parsers,
      uiStore,
    };
  },

  methods: {},
};
</script>
