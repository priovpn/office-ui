<template>
  <v-snackbar
    :timeout="5000"
    color="error"
    v-model="error"
    :close-on-content-click="true"
    location="top"
  >
    {{ error.message }}
  </v-snackbar>
  <v-btn
    variant="tonal"
    block
    @click="resetKey"
    :loading="loading"
    v-if="!mnemonic"
    >{{ $vuetify.locale.t("$vuetify.main.actions.resetKey") }}</v-btn
  >
  <v-col @click="copyMnemonic" style="cursor: pointer" v-else>
    <v-row v-for="(item, key) in mnemonic.split(' ')" :key="key">
      <span>{{ key + 1 }}. {{ item }}</span>
    </v-row>
  </v-col>
</template>
<script>
import userStore from "@/store/user.store";

export default {
  setup() {
    return {};
  },

  data() {
    return {
      loading: false,
      mnemonic: null,
      error: null,
    };
  },

  methods: {
    async _withLoading(fn) {
      this.loading = true;
      try {
        await fn();
        this.error = null;
      } catch (e) {
        this.error = {
          ...e,
          message:
            this.$vuetify.locale.messages[this.$vuetify.locale.current].errors[
              e.message
            ] ?? e.message,
        };
      }
      this.loading = false;
    },

    copyMnemonic() {
      navigator.clipboard.writeText(this.mnemonic);
    },

    async resetKey() {
      await this._withLoading(
        async () => (this.mnemonic = await userStore.resetKey())
      );
    },
  },
};
</script>
