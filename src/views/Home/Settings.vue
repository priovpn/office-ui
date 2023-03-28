<template>
  <v-container>
    <v-row justify="center" dense>
      <v-col cols="12" md="12" lg="9">
        <CTable />
      </v-col>
      <v-col cols="12" md="12" lg="3">
        <v-card
          class="mx-auto"
          prepend-icon="mdi-account"
          :loading="accountCard.loading"
        >
          <template v-slot:title>{{
            $vuetify.locale.t("$vuetify.settings.cards.account")
          }}</template>
          <v-expansion-panels variant="accordion">
            <v-alert
              type="error"
              :text="accountCard.error.message"
              v-if="accountCard.error"
            />
            <v-expansion-panel
              :title="$vuetify.locale.t('$vuetify.main.actions.setting2FA')"
            >
              <v-expansion-panel-text v-if="!userStore.user.isEnabled2fa">
                <v-row v-if="!qrCode2FA">
                  <v-btn
                    class="mt-5 mb-3"
                    variant="tonal"
                    block
                    @click="enable2FA"
                    :loading="accountCard.loading"
                    >{{
                      $vuetify.locale.t("$vuetify.main.actions.enable2FA")
                    }}</v-btn
                  >
                </v-row>
                <v-row v-else>
                  <v-col :cols="12" class="d-flex justify-center mt-2">
                    <img :src="qrCode2FA" v-if="qrCode2FA" width="162" />
                  </v-col>
                  <v-col :cols="12">
                    <v-text-field
                      :label="
                        $vuetify.locale.t('$vuetify.main.labels.enterCode')
                      "
                      hide-details="auto"
                      variant="underlined"
                      v-model="code2FA"
                    />
                  </v-col>
                  <v-col :cols="12">
                    <v-btn
                      variant="tonal"
                      block
                      @click="confirm2FA"
                      :loading="accountCard.loading"
                      >{{
                        $vuetify.locale.t("$vuetify.main.actions.confirm")
                      }}</v-btn
                    >
                  </v-col>
                </v-row>
              </v-expansion-panel-text>
              <v-expansion-panel-text v-else>
                <v-row>
                  <v-col :cols="12" class="d-flex justify-center mt-2">
                    <v-btn
                      variant="tonal"
                      block
                      @click="disable2FA"
                      :loading="accountCard.loading"
                      >{{
                        $vuetify.locale.t("$vuetify.main.actions.disable2FA")
                      }}</v-btn
                    >
                  </v-col>
                </v-row>
              </v-expansion-panel-text>
            </v-expansion-panel>
            <v-expansion-panel
              :title="$vuetify.locale.t('$vuetify.main.actions.settingFIDO')"
            >
              <v-expansion-panel-text v-if="!userStore.user.isEnabledFido">
                <v-row v-if="isFidoSupported">
                  <v-col :cols="12" class="d-flex justify-center mt-2">
                    <v-btn
                      variant="tonal"
                      block
                      @click="enableFIDO"
                      :loading="accountCard.loading"
                    >
                      {{
                        $vuetify.locale.t("$vuetify.main.actions.enableFIDO")
                      }}
                    </v-btn>
                  </v-col>
                </v-row>
                <v-row v-else>
                  <span>
                    {{ $vuetify.locale.t("$vuetify.errors.fidoNotSupported") }}
                  </span>
                </v-row>
              </v-expansion-panel-text>
              <v-expansion-panel-text v-else>
                <v-row>
                  <v-col :cols="12" class="d-flex justify-center mt-2 pb-1">
                    <v-btn
                      variant="tonal"
                      block
                      @click="disableFIDO"
                      :loading="accountCard.loading"
                    >
                      {{
                        $vuetify.locale.t("$vuetify.main.actions.disableFIDO")
                      }}
                    </v-btn>
                  </v-col>
                  <v-col :cols="12" class="d-flex justify-center">
                    <v-btn
                      variant="tonal"
                      block
                      @click="enableFIDO"
                      :loading="accountCard.loading"
                      v-if="isFidoSupported"
                    >
                      {{
                        $vuetify.locale.t(
                          "$vuetify.main.actions.linkCurrentDevice"
                        )
                      }}
                    </v-btn>
                  </v-col>
                </v-row>
              </v-expansion-panel-text>
            </v-expansion-panel>
            <v-expansion-panel
              :title="$vuetify.locale.t('$vuetify.main.actions.resetKey')"
            >
              <v-expansion-panel-text
                style="cursor: pointer"
                @click="copyMnemonic"
              >
                <v-btn
                  class="mt-2"
                  variant="tonal"
                  block
                  @click="resetKey"
                  :loading="accountCard.loading"
                  v-if="!mnemonic"
                  >{{
                    $vuetify.locale.t("$vuetify.main.actions.resetKey")
                  }}</v-btn
                >
                <v-col v-else>
                  <v-row v-for="(item, key) in mnemonic.split(' ')" :key="key">
                    <span>{{ key + 1 }}. {{ item }}</span>
                  </v-row>
                </v-col>
              </v-expansion-panel-text>
            </v-expansion-panel>
            <v-expansion-panel
              :title="$vuetify.locale.t('$vuetify.main.actions.deleteData')"
            >
              <v-expansion-panel-text>
                <v-row>
                  <v-col :cols="12" class="d-flex justify-center mt-2">
                    <v-sheet
                      class="pt-6 pb-6 mx-auto"
                      max-width="400"
                      rounded="lg"
                      :border="false"
                    >
                      <h4
                        class="text-h5 font-weight-bold mb-4"
                        v-text="
                          $vuetify.locale.t(
                            '$vuetify.settings.cards.deleteData.title'
                          )
                        "
                      />

                      <p
                        class="mb-8"
                        v-text="
                          $vuetify.locale.t(
                            '$vuetify.settings.cards.deleteData.text'
                          )
                        "
                      />

                      <v-btn
                        block
                        class="text-none text-white mb-4"
                        color="red-accent-2"
                        size="x-large"
                        variant="flat"
                        @click="deleteData"
                        :loading="accountCard.loading"
                      >
                        {{
                          $vuetify.locale.t(
                            "$vuetify.settings.cards.deleteData.btn"
                          )
                        }}
                      </v-btn>
                    </v-sheet>
                  </v-col>
                </v-row>
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import moment from "moment";
import qrcode from "qrcode";
import { useLocale } from "vuetify/lib/framework.mjs";
import sessionsStore from "@/store/sessions.store.js";
import userStore from "@/store/user.store";
import CTable from "@/components/Settings/Table.vue";

export default {
  components: { CTable },

  setup() {
    return {
      moment,
      sessionsStore,
      userStore,
      isFidoSupported: false,
    };
  },

  data() {
    const { current } = useLocale();
    return {
      locale: current.value,
      loading: false,
      mnemonic: null,
      qrCode2FA: null,
      code2FA: null,
      error: null,
      accountCard: {
        loading: false,
        error: null,
      },
    };
  },

  created() {
    this.isFidoSupported = "credentials" in navigator;
  },

  methods: {
    async _withLoading(fn, prop) {
      this[prop].loading = true;
      try {
        await fn();
        this[prop].error = null;
      } catch (e) {
        this[prop].error = {
          ...e,
          message:
            this.$vuetify.locale.messages[this.$vuetify.locale.current].errors[
              e.message
            ] ?? e.message,
        };
      }
      this[prop].loading = false;
    },

    async resetKey() {
      await this._withLoading(
        async () => (this.mnemonic = await userStore.resetKey()),
        "accountCard"
      );
    },
    async enable2FA() {
      await this._withLoading(async () => {
        const data = await userStore.enable2FA();
        this.qrCode2FA = await qrcode.toDataURL(data.url);
      }, "accountCard");
    },
    async disable2FA() {
      await this._withLoading(async () => {
        await userStore.disable2FA();
        await userStore.fetch();
      }, "accountCard");
    },
    async confirm2FA() {
      await this._withLoading(async () => {
        await userStore.confirm2FA(this.code2FA);
        await userStore.fetch();
      }, "accountCard");
    },
    async enableFIDO() {
      await this._withLoading(async () => {
        // Get credentials
        const car = await userStore.enableFIDO();
        // Send credentials to server
        await userStore.enableFIDO(car);
        await userStore.fetch();
      }, "accountCard");
    },
    async disableFIDO() {
      await this._withLoading(async () => {
        await userStore.disableFIDO();
        await userStore.fetch();
      }, "accountCard");
    },
    async deleteData() {
      await this._withLoading(async () => {
        await userStore.deleteData();
        window.location.href = "/";
      }, "accountCard");
    },
    copyMnemonic() {
      navigator.clipboard.writeText(this.mnemonic);
    },
  },
};
</script>
