<template>
  <v-row class="flex-column" no-gutters v-if="store.isFactorView === true">
    <v-col class="d-flex justify-center">
      <lottie-animation
        :animationData="require('@/assets/animations/faceid.json')"
        :loop="true"
        :autoPlay="true"
        :style="{ width: '200px', height: '200px' }"
        class="mt-5"
      />
    </v-col>
    <v-col class="d-flex justify-center mt-5">
      <h1>Verifying identity...</h1>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import AuthPageStore, { IAuthPageStore } from '@/store/pages/AuthPageStore'

@Options({
  components: {}
})
export default class Component extends Vue {
  public store: IAuthPageStore = AuthPageStore
}
</script>
