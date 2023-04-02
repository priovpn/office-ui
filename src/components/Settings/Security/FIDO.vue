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
  <div v-if="!isFidoSupported">
    {{ $vuetify.locale.t("$vuetify.errors.fidoNotSupported") }}
  </div>
  <div v-else>
    <v-btn
      variant="tonal"
      block
      @click="enableFIDO"
      :loading="loading"
      v-if="!userStore.user.isEnabledFido"
    >
      {{ $vuetify.locale.t("$vuetify.main.actions.enableFIDO") }}
    </v-btn>
    <v-btn variant="tonal" block @click="disableFIDO" :loading="loading" v-else>
      {{ $vuetify.locale.t("$vuetify.main.actions.disableFIDO") }}
    </v-btn>
  </div>
</template>
<script>
import userStore from "@/store/user.store";

export default {
  setup() {
    return {
      userStore,
    };
  },

  data() {
    return {
      loading: false,
      error: null,
    };
  },

  created() {
    this.isFidoSupported = "credentials" in navigator;
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

    async enableFIDO() {
      await this._withLoading(async () => {
        // Get credentials
        const car = await userStore.enableFIDO();
        // Send credentials to server
        await userStore.enableFIDO(car);
        await userStore.fetch();
      });
    },

    async disableFIDO() {
      await this._withLoading(async () => {
        await userStore.disableFIDO();
        await userStore.fetch();
      });
    },
  },
};
</script>
