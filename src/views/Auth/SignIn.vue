<template>
  <v-sheet width="320" class="mx-auto">
    <img class="mb-5" src="@/assets/logo.svg" />
    <v-form validate-on="submit" @submit.prevent="onSignIn">
      <v-card>
        <v-alert
          type="error"
          :text="error.message"
          style="font-size: 17px; border-radius: 0"
          v-if="error"
        ></v-alert>
        <div v-if="!isFido">
          <div v-if="!is2FA && !isFido">
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
              style="height: 41px"
            ></v-checkbox>
            <v-checkbox
              :label="$vuetify.locale.t('$vuetify.auth.rememberKey')"
              v-model="rememberKey"
              style="height: 51px"
            ></v-checkbox>
          </div>
          <div v-else-if="is2FA">
            <v-text-field
              :label="$vuetify.locale.t('$vuetify.auth.code2fa')"
              hide-details="auto"
              v-model="code2FA"
            ></v-text-field>
          </div>
          <v-btn
            type="submit"
            block
            color="primary"
            style="border-radius: 0"
            size="large"
            :loading="loading"
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
              <v-icon class="mt-6" icon="mdi-shield-lock" size="128"></v-icon>
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
</template>
<script>
import consts from "@/consts";
import userStore from "@/store/user.store";

export default {
  data() {
    return {
      rkPhrases: {},
      error: null,
      loading: false,
      rememberMe: false,
      rememberKey: false,
      is2FA: false,
      isFido: false,
      code2FA: undefined,
      carFido: undefined,
    };
  },

  async created() {
    this.parseKeyFromStorage();
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
          if (this.rememberMe)
            localStorage.setItem(consts.tokenKey, userStore.token);
          else sessionStorage.setItem(consts.tokenKey, userStore.token);
          if (this.rememberKey) {
            localStorage.setItem(
              consts.mnemonicKey,
              JSON.stringify(this.rkPhrases)
            );
            localStorage.setItem(consts.mnemonicKeyTs, Date.now());
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
            this.onSignIn();
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

    parseKeyFromStorage() {
      const ts = localStorage.getItem(consts.mnemonicKeyTs);
      if (ts && Date.now() - ts > 604800 * 1000) {
        localStorage.removeItem(consts.mnemonicKey);
        localStorage.removeItem(consts.mnemonicKeyTs);
      } else {
        const key = localStorage.getItem(consts.mnemonicKey);
        if (key) this.rkPhrases = JSON.parse(key);
      }
    },
  },
};
</script>
