<template>
  <v-sheet width="320" class="mx-auto">
    <img class="mb-5" src="@/assets/logo.svg" />
    <v-form validate-on="submit" @submit.prevent="onSignUp">
      <v-card>
        <v-alert
          type="error"
          :text="error.text"
          style="font-size: 17px; border-radius: 0"
          v-if="error"
        ></v-alert>
        <v-text-field label="Login" hide-details="auto" v-model="login" />
        <v-text-field label="Password" hide-details="auto" v-model="password" />
        <v-btn
          type="submit"
          block
          color="primary"
          style="border-radius: 0"
          size="large"
        >
          Sign up
        </v-btn>
        <v-btn
          type="submit"
          block
          color="light"
          style="border-radius: 0"
          to="/auth/sign-in"
        >
          I have an account
        </v-btn>
      </v-card>
    </v-form>
  </v-sheet>
</template>
<script>
export default {
  data() {
    return {
      login: null,
      password: null,
      error: null,
    };
  },

  methods: {
    onSignUp() {
      //
    },
  },
};
</script>
