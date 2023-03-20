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
        <v-tabs v-model="tab" bg-color="primary">
          <v-tab value="password">Login/Password</v-tab>
          <v-tab value="recoveryKey">Recovery key</v-tab>
        </v-tabs>

        <v-window v-model="tab">
          <v-window-item value="password">
            <v-text-field label="Login" hide-details="auto" v-model="login" />
            <v-text-field
              label="Password"
              hide-details="auto"
              v-model="password"
            />
          </v-window-item>

          <v-window-item value="recoveryKey">
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
          </v-window-item>
        </v-window>
        <v-btn
          type="submit"
          block
          color="primary"
          style="border-radius: 0"
          size="large"
        >
          Sign in
        </v-btn>
        <RouterLink to="/auth/sign-up" class="text-decoration-none">
          <v-btn type="submit" block color="light" style="border-radius: 0">
            Create account
          </v-btn>
        </RouterLink>
      </v-card>
    </v-form>
  </v-sheet>
</template>
<script>
import userStore from "@/store/user.store";

export default {
  data() {
    return {
      tab: "password",
      rkPhrases: {},
      login: null,
      password: null,
      error: null,
    };
  },

  methods: {
    async onSignIn() {
      this.error = null;

      if (this.tab === "recoveryKey") {
        const rk = Object.values(this.rkPhrases).join(" ");
        try {
          await userStore.signInWithRecoveryKey(rk);
        } catch (e) {
          this.error = e;
        }
      } else if (this.tab === "password") {
        try {
          await userStore.signInWithPassword({
            login: this.login,
            password: this.password,
          });
        } catch (e) {
          this.error = e;
        }
      }
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
