<template>
  <div
    class="d-flex justify-content-center align-items-center flex-column flex-row mb-4"
    style="border-radius: 10px"
  >
    <lottie-animation
      :animationData="require('@/assets/animations/sad.json')"
      :loop="true"
      :autoPlay="true"
      :style="{ width: '294px', height: '278px' }"
      class="mt-5"
    />
    <h1 class="pb-4 tb td">{{ text }}</h1>
  </div>
</template>
<style lang="scss" scoped>
div.cp {
  transition: 0.3s transform;

  &:hover {
    transform: scale(1.05);
  }
}
</style>
<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import AuthPageStore, { IAuthPageStore } from '@/store/pages/AuthPageStore'

@Options({
  setup() {
    return {
      store: AuthPageStore
    }
  }
})
export default class Component extends Vue {
  public text = 'Service Unavailable'
  public store: IAuthPageStore = AuthPageStore
}
</script>
