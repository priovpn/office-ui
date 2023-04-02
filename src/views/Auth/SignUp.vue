<template>
  <v-sheet width="320" class="mx-auto">
    <v-form validate-on="submit" @submit.prevent="onSignUp">
      <v-card>
        <v-alert
          type="error"
          :text="error.message"
          style="font-size: 17px; border-radius: 0"
          v-if="error"
        ></v-alert>
        <v-alert
          type="warning"
          :text="$vuetify.locale.t('$vuetify.auth.copyKeyPrompt')"
          style="font-size: 17px; border-radius: 0"
          v-if="userStore.mnemonic"
        ></v-alert>
        <v-text-field
          :label="$vuetify.locale.t('$vuetify.auth.login')"
          hide-details="auto"
          v-model="login"
          :loading="loading"
          v-if="!userStore.mnemonic"
        />
        <div v-else>
          <v-row dense>
            <v-col style="padding: 0">
              <v-text-field
                label="1"
                hide-details="auto"
                v-model="rkPhrases['1']"
                @click="onRecoveryCopy"
                readonly
              />
              <v-text-field
                label="4"
                hide-details="auto"
                v-model="rkPhrases['4']"
                @click="onRecoveryCopy"
                readonly
              />
            </v-col>
            <v-col style="padding: 0">
              <v-text-field
                label="2"
                hide-details="auto"
                v-model="rkPhrases['2']"
                @click="onRecoveryCopy"
                readonly
              />
              <v-text-field
                label="5"
                hide-details="auto"
                v-model="rkPhrases['5']"
                @click="onRecoveryCopy"
                readonly
              />
            </v-col>
            <v-col style="padding: 0">
              <v-text-field
                label="3"
                hide-details="auto"
                v-model="rkPhrases['3']"
                @click="onRecoveryCopy"
                readonly
              />
              <v-text-field
                label="6"
                hide-details="auto"
                v-model="rkPhrases['6']"
                @click="onRecoveryCopy"
                readonly
              />
            </v-col>
          </v-row>
          <v-row dense>
            <v-col style="padding: 0">
              <v-text-field
                label="7"
                hide-details="auto"
                v-model="rkPhrases['7']"
                @click="onRecoveryCopy"
                readonly
              />
              <v-text-field
                label="10"
                hide-details="auto"
                v-model="rkPhrases['10']"
                @click="onRecoveryCopy"
                readonly
              />
            </v-col>
            <v-col style="padding: 0">
              <v-text-field
                label="8"
                hide-details="auto"
                v-model="rkPhrases['8']"
                @click="onRecoveryCopy"
                readonly
              />
              <v-text-field
                label="11"
                hide-details="auto"
                v-model="rkPhrases['11']"
                @click="onRecoveryCopy"
                readonly
              />
            </v-col>
            <v-col style="padding: 0">
              <v-text-field
                label="9"
                hide-details="auto"
                v-model="rkPhrases['9']"
                @click="onRecoveryCopy"
                readonly
              />
              <v-text-field
                label="12"
                hide-details="auto"
                v-model="rkPhrases['12']"
                @click="onRecoveryCopy"
                readonly
              />
            </v-col>
          </v-row>
          <v-btn
            type="submit"
            block
            color="primary"
            style="border-radius: 0"
            size="large"
            @click.prevent="endSignUp"
            :loading="loading"
          >
            {{ $vuetify.locale.t("$vuetify.auth.okay") }}
          </v-btn>
        </div>
        <v-btn
          type="submit"
          block
          color="primary"
          style="border-radius: 0"
          size="large"
          :loading="loading"
          v-if="!userStore.mnemonic"
        >
          {{ $vuetify.locale.t("$vuetify.auth.signUp") }}
        </v-btn>
        <v-btn
          type="submit"
          block
          color="light"
          style="border-radius: 0"
          to="/auth/sign-in"
          :loading="loading"
        >
          {{ $vuetify.locale.t("$vuetify.auth.iHaveAccount") }}
        </v-btn>
      </v-card>
    </v-form>
  </v-sheet>
</template>
<script>
import consts from "@/consts";
import userStore from "@/store/user.store";

export default {
  setup() {
    return {
      userStore,
    };
  },
  data() {
    return {
      login: null,
      error: null,
      loading: false,
      rkPhrases: [],
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
        this.isFido = false;
      }
      this.loading = false;
    },

    async onSignUp() {
      if (!/^[A-Za-z][A-Za-z0-9_]{4,14}$/.test(this.login)) {
        this.error = {
          code: "INVALID_LOGIN",
          message: "Invalid login",
        };
      } else {
        await this._withLoading(async () => {
          await userStore.signUp({ login: this.login });
          userStore.mnemonic
            .split(" ")
            .map((m, i) => (this.rkPhrases[String(i + 1)] = m));
        });
      }
    },

    async onRecoveryCopy() {
      navigator.clipboard.writeText(this.rkPhrases.join(" ").trim());
    },

    endSignUp(e) {
      e.preventDefault();
      sessionStorage.setItem(consts.tokenKey, userStore.token);
      this.$router.push("/");
    },
  },
};
</script>
