<template>
  <v-app>
    <v-card v-if="userStore.user">
      <v-layout style="height: 100vh">
        <default-bar />
        <default-view />
      </v-layout>
    </v-card>
    <v-card v-else>
      <v-layout style="height: 100vh" class="flex justify-center align-center">
        <v-progress-circular
          indeterminate
          color="primary"
          :size="64"
          :width="10"
        ></v-progress-circular>
      </v-layout>
    </v-card>
  </v-app>
</template>

<script setup>
// import userStore from "@/store/user.store";
import api from "@/api";
import DefaultBar from "./AppBar.vue";
import DefaultView from "./View.vue";
import userStore from "@/store/user.store";
import statusStore from "@/store/status.store";
</script>
<script>
export default {
  async mounted() {
    const user = await userStore.fetch();
    if (!user) this.$router.push("/auth/sign-in");

    const { alive } = await api.status();
    if (!alive) statusStore.status = "issues";
    else statusStore.status = "stable";
  },
};
</script>
