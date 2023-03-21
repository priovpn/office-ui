<template>
  <div></div>
</template>

<script>
import userStore from "@/store/user.store.js";

export default {
  created() {
    userStore.signOut();
    this.$router.push("/auth/sign-in");
  },
};
</script>
