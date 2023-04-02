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
  <v-sheet
    class="pt-6 pb-6 mx-auto"
    max-width="400"
    rounded="lg"
    :border="false"
  >
    <h4
      class="text-h5 font-weight-bold mb-4"
      v-text="$vuetify.locale.t('$vuetify.settings.cards.deleteData.title')"
    />

    <p
      class="mb-8"
      v-text="$vuetify.locale.t('$vuetify.settings.cards.deleteData.text')"
    />

    <v-btn
      block
      class="text-none text-white mb-4"
      color="red-accent-2"
      size="x-large"
      variant="flat"
      @click="deleteData"
      :loading="loading"
    >
      {{ $vuetify.locale.t("$vuetify.settings.cards.deleteData.btn") }}
    </v-btn>
  </v-sheet>
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

    async deleteData() {
      await this._withLoading(async () => {
        await userStore.deleteData();
        window.location.href = "/";
      });
    },
  },
};
</script>
