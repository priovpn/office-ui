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
  <div v-if="!userStore.user.isEnabled2fa">
    <div v-if="!qrCode2FA">
      <v-btn variant="tonal" block @click="enable2FA" :loading="loading">{{
        $vuetify.locale.t("$vuetify.main.actions.enable2FA")
      }}</v-btn>
    </div>
    <div v-else>
      <v-col :cols="12" class="d-flex justify-center mt-2">
        <img :src="qrCode2FA" v-if="qrCode2FA" width="300" />
      </v-col>
      <v-col :cols="12">
        <v-text-field
          :label="$vuetify.locale.t('$vuetify.main.labels.enterCode')"
          hide-details="auto"
          variant="underlined"
          v-model="code2FA"
        />
      </v-col>
      <v-col :cols="12">
        <v-btn variant="tonal" block @click="confirm2FA" :loading="loading">{{
          $vuetify.locale.t("$vuetify.main.actions.confirm")
        }}</v-btn>
      </v-col>
    </div>
  </div>
  <div v-else>
    <v-col :cols="12" class="d-flex justify-center mt-2">
      <v-btn variant="tonal" block @click="disable2FA" :loading="loading">{{
        $vuetify.locale.t("$vuetify.main.actions.disable2FA")
      }}</v-btn>
    </v-col>
  </div>
</template>
<script>
import qrcode from "qrcode";
import userStore from "@/store/user.store";

export default {
  setup() {
    return {
      userStore,
    };
  },

  data() {
    return {
      qrCode2FA: null,
      code2FA: null,
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

    async enable2FA() {
      await this._withLoading(async () => {
        const data = await userStore.enable2FA();
        this.qrCode2FA = await qrcode.toDataURL(data.url);
      });
    },

    async disable2FA() {
      await this._withLoading(async () => {
        await userStore.disable2FA();
        await userStore.fetch();
      });
    },

    async confirm2FA() {
      await this._withLoading(async () => {
        await userStore.confirm2FA(this.code2FA);
        await userStore.fetch();
      });
    },
  },
};
</script>
