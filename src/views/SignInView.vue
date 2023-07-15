<template>
  <v-container class="d-flex" fluid>
    <v-row no-gutters>
      <v-col cols="4">
        <v-sheet
          height="100%"
          width="100%"
          class="d-flex justify-center align-center"
          color="transparent"
        >
          <BiometryCheck v-if="store.view === 'biometryCheck'" />
          <TwoFa v-else-if="store.view === 'twoFa'" />

          <v-row class="flex-column" no-gutters v-else>
            <v-col class="d-flex justify-center mb-8">
              <img src="@/assets/img/logo.dark.svg" width="256" />
            </v-col>
            <v-col class="d-flex justify-center">
              <SignIn v-if="store.view === 'signIn'" />
              <SignUp v-else-if="store.view === 'signUp'" />
              <ResetPassword v-else-if="store.view === 'resetPassword'" />
            </v-col>
          </v-row>
        </v-sheet>
      </v-col>
      <v-col cols="8" class="pa-3">
        <v-sheet
          height="100%"
          width="100%"
          color="secondary"
          class="rounded-xl d-flex flex-column justify-center align-center"
        >
          <h1>все бесплатно бля ебу</h1>
          <h2>ряльна</h2>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import HomeNavbar from '@/components/HomeNavbar.vue'
import user from '@/store/UserStore'
import AuthPageStore, { IAuthPageStore } from '@/store/pages/AuthPageStore'
import SignIn from '@/components/Auth/SignIn.vue'
import SignUp from '@/components/Auth/SignUp.vue'
import ResetPassword from '@/components/Auth/ResetPassword.vue'
import BiometryCheck from '@/components/Auth/BiometryCheck.vue'
import TwoFa from '@/components/Auth/TwoFaCheck.vue'

@Options({
  components: {
    HomeNavbar,
    SignIn,
    SignUp,
    ResetPassword,
    BiometryCheck,
    TwoFa
  }
})
export default class SignInView extends Vue {
  public store: IAuthPageStore = AuthPageStore

  created() {
    if (user.isLoggedIn) this.$router.push('/')
  }
}
</script>
<style lang="scss">
.-p-card-w {
  height: 37vh;
  h1 {
    font-size: 6rem;
    font-weight: 900;
    margin: 0;
    color: white;
    opacity: 1;
  }
  h2 {
    font-size: 2.5rem;
    font-weight: 700;
  }
}

// Small devices (landscape phones, 576px and up)
@media screen and (max-width: 992px) {
  .-p-card-w {
    img {
      width: 160px;
    }
    h1 {
      padding-top: 15px;
      font-size: 4rem;
      word-break: keep-all;
      line-height: 0.9;
    }
  }
  .col-md-12.d-flex {
    &:nth-child(2) {
      height: auto;
      h1 {
        padding-top: 10px;
        font-size: 2.3rem;
      }
    }
    &:nth-child(1) {
      height: 20vh;
      h1 {
        font-size: 2.3rem;
        padding-top: 10px;
      }
    }
    .flex-row.mb-4 {
      flex-direction: column !important;
      & > div.mainSection {
        margin-right: 0 !important;
        margin-bottom: 20px;
        & > img {
          padding: 1.2rem !important;
        }
      }
    }
  }
}
</style>
