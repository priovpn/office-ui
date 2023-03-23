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

<script setup>
import DefaultView from "../View.vue";
</script>
<script>
import userStore from "@/store/user.store.js";

export default {
  mounted() {
    if (userStore.token) {
      this.$router.push("/");
    }
  },
};
</script>
