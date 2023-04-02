<template>
  <v-container>
    <v-row>
      <v-col
        :sm="12"
        :lg="5"
        class="d-flex justify-center align-center flex-column"
      >
        <h2 class="firstRow__h2 text-h2">Expression</h2>
        <h1 class="firstRow__h1 text-h1">Freedom.</h1>
      </v-col>
      <v-col
        :sm="12"
        :lg="7"
        class="d-flex justify-center flex-column align-center"
      >
        <img class="mb-6" width="300" src="@/assets/logo_slim_dark.svg" />
        <v-sheet width="320" class="mx-auto" :border="true">
          <v-select
            label="Select account (optional)"
            :items="userStore.accounts"
            hide-details="auto"
            v-if="userStore.accounts.length > 0"
            item-title="name"
            item-value="mnemonic"
            v-model="userStore.selectedAccount"
          ></v-select>
          <v-form validate-on="submit" @submit.prevent="onSignIn">
            <v-card>
              <v-alert
                type="error"
                :text="error.message"
                style="font-size: 17px; border-radius: 0"
                v-if="error"
              ></v-alert>
              <div v-if="!isFido">
                <div v-if="!is2FA && !isFido && !userStore.selectedAccount">
                  <v-row dense>
                    <v-col style="padding: 0">
                      <v-text-field
                        label="1"
                        hide-details="auto"
                        v-model="rkPhrases['1']"
                        @paste="onRecoveryPaste"
                      />
                      <v-text-field
                        label="4"
                        hide-details="auto"
                        v-model="rkPhrases['4']"
                        @paste="onRecoveryPaste"
                      />
                    </v-col>
                    <v-col style="padding: 0">
                      <v-text-field
                        label="2"
                        hide-details="auto"
                        v-model="rkPhrases['2']"
                        @paste="onRecoveryPaste"
                      />
                      <v-text-field
                        label="5"
                        hide-details="auto"
                        v-model="rkPhrases['5']"
                        @paste="onRecoveryPaste"
                      />
                    </v-col>
                    <v-col style="padding: 0">
                      <v-text-field
                        label="3"
                        hide-details="auto"
                        v-model="rkPhrases['3']"
                        @paste="onRecoveryPaste"
                      />
                      <v-text-field
                        label="6"
                        hide-details="auto"
                        v-model="rkPhrases['6']"
                        @paste="onRecoveryPaste"
                      />
                    </v-col>
                  </v-row>
                  <v-row dense>
                    <v-col style="padding: 0">
                      <v-text-field
                        label="7"
                        hide-details="auto"
                        v-model="rkPhrases['7']"
                        @paste="onRecoveryPaste"
                      />
                      <v-text-field
                        label="10"
                        hide-details="auto"
                        v-model="rkPhrases['10']"
                        @paste="onRecoveryPaste"
                      />
                    </v-col>
                    <v-col style="padding: 0">
                      <v-text-field
                        label="8"
                        hide-details="auto"
                        v-model="rkPhrases['8']"
                        @paste="onRecoveryPaste"
                      />
                      <v-text-field
                        label="11"
                        hide-details="auto"
                        v-model="rkPhrases['11']"
                        @paste="onRecoveryPaste"
                      />
                    </v-col>
                    <v-col style="padding: 0">
                      <v-text-field
                        label="9"
                        hide-details="auto"
                        v-model="rkPhrases['9']"
                        @paste="onRecoveryPaste"
                      />
                      <v-text-field
                        label="12"
                        hide-details="auto"
                        v-model="rkPhrases['12']"
                        @paste="onRecoveryPaste"
                      />
                    </v-col>
                  </v-row>
                  <v-checkbox
                    :label="$vuetify.locale.t('$vuetify.auth.rememberMe')"
                    v-model="rememberMe"
                    style="height: 51px"
                    :disabled="loading"
                  ></v-checkbox>
                </div>
                <div v-else-if="is2FA">
                  <v-text-field
                    :label="$vuetify.locale.t('$vuetify.auth.code2fa')"
                    hide-details="auto"
                    v-model="code2FA"
                    :loading="loading"
                  ></v-text-field>
                </div>
                <v-btn
                  type="submit"
                  block
                  color="primary"
                  style="border-radius: 0"
                  size="large"
                  :loading="loading"
                  :border="0"
                >
                  {{ $vuetify.locale.t("$vuetify.auth.signIn") }}
                </v-btn>
                <v-btn
                  type="submit"
                  block
                  color="light"
                  style="border-radius: 0"
                  to="/auth/sign-up"
                  :loading="loading"
                >
                  {{ $vuetify.locale.t("$vuetify.auth.iDontHaveAccount") }}
                </v-btn>
              </div>
              <div v-if="isFido">
                <v-row>
                  <v-col :cols="12" class="d-flex justify-center align-center">
                    <v-icon
                      class="mt-6"
                      icon="mdi-shield-lock"
                      size="128"
                    ></v-icon>
                  </v-col>
                  <v-col :cols="12">
                    <p
                      class="text-h5 mb-6 text-center"
                      v-text="$vuetify.locale.t('$vuetify.fidoAuth.title')"
                    />
                  </v-col>
                </v-row>
              </div>
            </v-card>
          </v-form>
        </v-sheet>
      </v-col>
    </v-row>
    <CFooter />
  </v-container>
</template>
<script>
import consts from "@/consts";
import userStore from "@/store/user.store";
import uiStore from "@/store/ui.store";
import * as parsers from "@/utils/parsers";
import CFooter from "@/components/Auth/Footer.vue";

export default {
  components: { CFooter },

  setup() {
    return {
      userStore,
      uiStore,
      parsers,
    };
  },

  data() {
    return {
      rkPhrases: {},
      error: null,
      loading: false,
      rememberMe: false,
      is2FA: false,
      isFido: false,
      code2FA: undefined,
      carFido: undefined,
    };
  },

  async created() {
    this.parseKeyFromStorage();
    userStore.fetchAccounts();
  },

  watch: {
    "userStore.selectedAccount"(mnemonic) {
      const phrases = mnemonic.split(" ");
      for (let i = 0; i < 12; i++) {
        const phrase = phrases[i];
        if (phrase) this.rkPhrases[i + 1] = phrase;
      }
    },
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
        this.isFido = false;
      }
      this.loading = false;
    },

    async onSignIn() {
      await this._withLoading(async () => {
        const rk = Object.values(this.rkPhrases).join(" ");
        try {
          await userStore.signInWithKey(rk, this.code2FA, this.carFido);
          localStorage.setItem(consts.tokenKey, userStore.token);
          if (this.rememberMe) {
            await userStore.fetch();

            const accountName =
              userStore.user.login +
              "@" +
              this.parsers.cutId(userStore.user._id);
            const account = userStore.accounts.find(
              (a) => a.name === accountName
            );

            if (!account) {
              userStore.addAccount({
                name: accountName,
                mnemonic: rk,
              });
            } else {
              userStore.updateAccount(accountName, rk);
            }
          }
          this.$router.push("/");
        } catch (e) {
          console.log(e);
          if (e.message === "2FA_REQUIRED") {
            this.is2FA = true;
          } else if (e.message === "FIDO_REQUIRED") {
            this.isFido = true;

            this.carFido = await userStore.authenticateFido(
              e.challenge,
              e.credentials
            );

            this.isFido = false;
            await this.onSignIn();
          } else throw e;
        }
      });
    },

    onRecoveryPaste(p) {
      p.preventDefault();
      const phrases = p.clipboardData.getData("text").split(" ");
      for (let i = 0; i < 12; i++) {
        const phrase = phrases[i];
        if (phrase) this.rkPhrases[i + 1] = phrase;
      }
    },
  },
};
</script>
<style scoped>
.firstRow__h2 {
  font-weight: 300;
  line-height: 1;
  color: var(--v-theme-primary);
}

.firstRow__h1 {
  font-weight: 800;
  line-height: 1;
  color: var(--v-theme-primary);
}
</style>
