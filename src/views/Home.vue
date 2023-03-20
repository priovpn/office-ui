<template>
  <div></div>
</template>

<script>
import userStore from "@/store/user.store.js";

export default {
  mounted() {
    if (!userStore.token) {
      this.$router.push("/auth/sign-in");
    }
  },
};
</script>
