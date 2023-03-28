<template>
  <v-system-bar color="white" window>
    <a
      href="https://status.priovpn.cc"
      target="_blank"
      class="text-decoration-none"
      style="color: unset"
    >
      <v-icon
        icon="mdi-clock"
        class="me-2"
        style="color: gray"
        v-if="!statusStore.status"
      ></v-icon>
      <v-icon
        icon="mdi-check"
        class="me-2"
        style="color: green"
        v-if="statusStore.status === 'stable'"
      ></v-icon>
      <v-icon
        icon="mdi-alert-circle-outline"
        class="me-2"
        style="color: darkorange"
        v-if="statusStore.status === 'issues'"
      ></v-icon>
      <v-icon
        icon="mdi-server-network-off"
        class="me-2"
        style="color: red"
        v-if="statusStore.status === 'down'"
      ></v-icon>
      <span>{{
        $vuetify.locale.t(`$vuetify.systembar.status.${statusStore.status}`)
      }}</span>
    </a>

    <v-spacer></v-spacer>

    <span>v{{ version }}</span>
  </v-system-bar>
  <v-navigation-drawer
    v-model="drawer"
    expand-on-hover
    rail
    v-if="userStore.user"
  >
    <v-list>
      <v-list-item
        prepend-avatar="/icon_circle.png"
        :title="userStore.user.login"
        :subtitle="parsers.cutUserId(userStore.user._id)"
      ></v-list-item>
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
      <v-list-item
        prepend-icon="mdi-logout"
        :title="$vuetify.locale.t('$vuetify.menubar.signOut')"
        value="signOut"
        to="/sign-out"
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>

  <v-app-bar
    prominent
    :title="$vuetify.locale.t(`$vuetify.menubar.${$route.name}`)"
    v-if="userStore.user"
  >
    <v-spacer></v-spacer>

    <v-app-bar-nav-icon
      variant="text"
      @click.stop="drawer = !drawer"
    ></v-app-bar-nav-icon>

    <v-menu open-on-hover>
      <template v-slot:activator="{ props }">
        <v-btn v-bind="props" icon>
          <v-icon>mdi-earth</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item href="#" @click.prevent="() => changeLang('en')">
          <v-list-item-title>English </v-list-item-title>
        </v-list-item>
        <v-list-item href="#" @click.prevent="() => changeLang('ru')">
          <v-list-item-title> Русский </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
import userStore from "@/store/user.store";
import statusStore from "@/store/status.store";
import consts from "@/consts";
import * as parsers from "@/utils/parsers";
import { useLocale } from "vuetify/lib/framework.mjs";

export default {
  setup() {
    const { current } = useLocale();

    return {
      userStore,
      version: process.env.version,
      changeLocale: (locale) => (current.value = locale),
      statusStore,
      parsers,
    };
  },

  data() {
    return {
      drawer: localStorage.getItem(consts.drawerKey)
        ? localStorage.getItem(consts.drawerKey) === "true"
        : true,
    };
  },

  watch: {
    drawer(drawer) {
      localStorage.setItem(consts.drawerKey, drawer);
    },
  },

  methods: {
    changeLang(lang) {
      this.changeLocale(lang);
      localStorage.setItem(consts.localeKey, lang);
    },
  },
};
</script>
