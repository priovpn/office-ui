<template>
  <v-app>
    <v-card>
      <v-layout style="height: 100vh">
        <default-bar />
        <default-view />
      </v-layout>
    </v-card>
  </v-app>
</template>

<script setup>
// import userStore from "@/store/user.store";
import DefaultBar from "./AppBar.vue";
import DefaultView from "./View.vue";
</script>
<script>
export default {
  mounted() {
    // if (!userStore.token) {
    //   this.$router.push("/auth/sign-in");
    // }
  },
};
</script>
