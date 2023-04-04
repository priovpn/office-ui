<template>
  <nav class="navbar bg-body-tertiary p-4">
    <div class="container-fluid ps-5 pe-5">
      <div class="d-flex justify-content-start">
        <a class="navbar-brand" href="/">
          <img src="@/assets/img/logo.svg" width="180" />
        </a>
      </div>
      <div class="d-flex justify-content-center align-items-center">
        <div class="d-flex justify-content-between">
          <div class="pe-5">
            <a href="#" class="text-white">
              <DevicesIcon :size="26" />
            </a>
          </div>
          <div class="pe-5">
            <a href="#" class="text-white active">
              <NetworkOutlineIcon :size="26" />
            </a>
          </div>
          <div class="pe-5">
            <a href="#" class="text-white">
              <AccountCreditCardOutlineIcon :size="26" />
            </a>
          </div>
          <div>
            <a href="#" class="text-white">
              <CogOutlineIcon :size="26" />
            </a>
          </div>
        </div>
      </div>
      <div class="d-flex justify-content-end align-items-center">
        <div class="navbar-text text-white p-0">
          <div class="d-flex flex-column align-items-start">
            <div>admin</div>
            <div>setgwae3sgestgsgts</div>
          </div>
        </div>
        <LogoutIcon :size="24" class="ps-5 text-white" />
      </div>
    </div>
  </nav>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import DevicesIcon from 'vue-material-design-icons/Devices.vue'
import NetworkOutlineIcon from 'vue-material-design-icons/NetworkOutline.vue'
import AccountCreditCardOutlineIcon from 'vue-material-design-icons/AccountCreditCardOutline.vue'
import CogOutlineIcon from 'vue-material-design-icons/CogOutline.vue'
import LogoutIcon from 'vue-material-design-icons/Logout.vue'

@Options({
  components: {
    DevicesIcon,
    NetworkOutlineIcon,
    AccountCreditCardOutlineIcon,
    CogOutlineIcon,
    LogoutIcon
  }
})
export default class HomeView extends Vue {}
</script>
