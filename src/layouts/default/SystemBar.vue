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
</template>
<script>
import statusStore from "@/store/status.store";

export default {
  setup() {
    return {
      statusStore,
      version: process.env.version,
    };
  },
};
</script>
