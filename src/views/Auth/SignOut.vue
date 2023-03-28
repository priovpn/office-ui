<template>
  <div></div>
</template>

<script>
import userStore from "@/store/user.store.js";

export default {
  async created() {
    await userStore.signOut();
  },
};
</script>
