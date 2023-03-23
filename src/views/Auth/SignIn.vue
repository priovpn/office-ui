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
          label="Remember me"
          v-model="rememberMe"
          style="height: 51px"
        ></v-checkbox>
        <!-- <v-btn
          type="submit"
          block
          style="border-radius: 0"
          :loading="loading"
          @click="() => pasteKeyFromStorage()"
          v-if="keyInStorage"
        >
          Paste from keystorage
        </v-btn> -->
        <v-btn
          type="submit"
          block
          color="primary"
          style="border-radius: 0"
          size="large"
          :loading="loading"
        >
          Sign in
        </v-btn>
        <v-btn
          type="submit"
          block
          color="light"
          style="border-radius: 0"
          to="/auth/sign-up"
          :loading="loading"
        >
          Create account
        </v-btn>
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
    };
  },

  methods: {
    async onSignIn() {
      this.error = null;

      this.loading = true;
      const rk = Object.values(this.rkPhrases).join(" ");
      try {
        await userStore.signInWithKey(rk);
        if (this.rememberMe)
          localStorage.setItem(consts.tokenKey, userStore.token);
        else sessionStorage.setItem(consts.tokenKey, userStore.token);
        this.$router.push("/");
      } catch (e) {
        this.error = e;
      }
      this.loading = false;
    },

    onRecoveryPaste(p) {
      p.preventDefault();
      const phrases = p.clipboardData.getData("text").split(" ");
      for (let i = 0; i < 12; i++) {
        const phrase = phrases[i];
        if (phrase) this.rkPhrases[i + 1] = phrase;
      }
    },

    pasteKeyFromStorage() {
      const key = this.keyInStorage;
      if (key) {
        const phrases = key.split(" ");
        for (let i = 0; i < 12; i++) {
          const phrase = phrases[i];
          if (phrase) this.rkPhrases[i + 1] = phrase;
        }
      }
    },
  },
};
</script>
