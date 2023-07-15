<template>/</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import user from '@/store/UserStore'
// import DevicesIcon from 'vue-material-design-icons/Devices.vue'
// import NetworkOutlineIcon from 'vue-material-design-icons/NetworkOutline.vue'
// import AccountCreditCardOutlineIcon from 'vue-material-design-icons/AccountCreditCardOutline.vue'
// import CogOutlineIcon from 'vue-material-design-icons/CogOutline.vue'
// import LogoutIcon from 'vue-material-design-icons/Logout.vue'
import { UserEntity } from '@priovpn/shared'
import storeKeys from '@/storeKeys'

@Options({
  components: {
    // DevicesIcon,
    // NetworkOutlineIcon,
    // AccountCreditCardOutlineIcon,
    // CogOutlineIcon,
    // LogoutIcon
  },

  setup() {
    return {
      user: user.data
    }
  }
})
export default class HomeView extends Vue {
  public user: UserEntity | undefined

  async created() {
    // Fetch user data if logged in
    if (user.isLoggedIn) {
      const profile = await user.fetch()
      console.log(profile)
      if (!profile || (profile as any).httpCode) {
        localStorage.removeItem(storeKeys.apiToken)
        window.location.href = '/'
      }
    } else this.$router.push({ name: 'signIn' })
  }
}
</script>
<style lang="scss" scoped>
// Small devices (landscape phones, 576px and up)
// @media (max-width: 992px) {
//   .navbar > .container-fluid > .d-flex {
//     &.-pv-logo-c {
//       margin-bottom: 21px;
//       width: 100%;
//       justify-content: center !important;
//     }

//     &.-pv-links-c {
//       width: 100%;
//       margin-bottom: 25px;
//     }

//     &.-pv-user-c {
//       margin-bottom: 0;
//       width: 100%;
//       justify-content: space-evenly !important;
//     }
//   }
// }
</style>
