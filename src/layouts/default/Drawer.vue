<template>
  <v-navigation-drawer
    v-model="uiStore.drawer.show"
    expand-on-hover
    rail
    v-if="userStore.user"
    @update:rail="uiStore.drawer.rail = $event"
  >
    <v-list class="d-flex justify-center">
      <img
        src="@/assets/logo_slim_dark.svg"
        v-if="!uiStore.drawer.rail"
        height="40"
        class="pr-2"
      />
      <img src="@/assets/favicon_dark.svg" width="40" class="pa-1" v-else />
    </v-list>

    <v-divider></v-divider>

    <v-list density="compact" nav>
      <v-list-item
        prepend-icon="mdi-home"
        :title="$vuetify.locale.t('$vuetify.menubar.home')"
        value="home"
        to="/"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-connection"
        :title="$vuetify.locale.t('$vuetify.menubar.myVpns')"
        value="myVpns"
        to="/vpns"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-devices"
        :title="$vuetify.locale.t('$vuetify.menubar.myDevices')"
        value="devices"
        to="/devices"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-account-credit-card"
        :title="$vuetify.locale.t('$vuetify.menubar.sub')"
        value="subscription"
        to="/sub"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-cog"
        :title="$vuetify.locale.t('$vuetify.menubar.settings')"
        value="settings"
        to="/settings"
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
<script>
import consts from "@/consts";
import uiStore from "@/store/ui.store";
import userStore from "@/store/user.store";
import * as parsers from "@/utils/parsers";

export default {
  setup() {
    return {
      uiStore,
      userStore,
      parsers,
    };
  },
  watch: {
    "uiStore.drawer.show"(show) {
      localStorage.setItem(consts.drawerKey, show);
    },
  },
};
</script>
