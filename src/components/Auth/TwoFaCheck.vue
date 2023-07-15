<template>
  <v-row class="flex-column" no-gutters v-if="store.isFactorView === true">
    <v-col class="d-flex justify-center">
      <h1>Enter code</h1>
    </v-col>
    <v-col class="d-flex justify-center pl-15 pr-15 mt-5">
      <v-otp-input
        ref="otpInput"
        input-classes="otp-input"
        separator=""
        :num-inputs="6"
        :should-auto-focus="true"
        :is-disabled="store.wait"
        @on-complete="onComplete"
      />
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import AuthPageStore, { IAuthPageStore } from '@/store/pages/AuthPageStore'
import VOtpInput from 'vue3-otp-input'

@Options({
  components: {
    VOtpInput
  }
})
export default class Component extends Vue {
  public store: IAuthPageStore = AuthPageStore
  public currentlyFocused = 0
  public code: string[] = ['', '', '', '', '', '']

  public onComplete(val: string) {
    if (this.store.checkState) {
      this.store.checkState.code = Number(val)
      this.store.onSubmit()
    }
  }
}
</script>
