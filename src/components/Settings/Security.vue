<template>
  <v-row justify="center" dense no-gutters="">
    <v-col :cols="12" :lg="5">
      <v-card class="ma-4" prepend-icon="mdi-qrcode">
        <template v-slot:title>
          {{ $vuetify.locale.t("$vuetify.main.actions.setting2FA") }}
        </template>
        <v-card-text>
          <C2FA />
        </v-card-text>
      </v-card>
    </v-col>
    <v-col :cols="12" :lg="5">
      <v-card class="ma-4" prepend-icon="mdi-fingerprint">
        <template v-slot:title>
          {{ $vuetify.locale.t("$vuetify.main.actions.settingFIDO") }}
        </template>
        <v-card-text>
          <CFIDO />
        </v-card-text>
      </v-card>
    </v-col>
    <v-col :cols="12" :lg="5">
      <v-card class="ma-4" prepend-icon="mdi-key-change">
        <template v-slot:title>
          {{ $vuetify.locale.t("$vuetify.main.actions.resetKey") }}
        </template>
        <v-card-text>
          <CResetKey />
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import userStore from "@/store/user.store";
import C2FA from "./Security/2FA.vue";
import CFIDO from "./Security/FIDO.vue";
import CResetKey from "./Security/ResetKey.vue";

export default {
  components: { C2FA, CFIDO, CResetKey },

  setup() {
    return {
      userStore,
    };
  },

  data() {
    return {};
  },

  methods: {},
};
</script>
