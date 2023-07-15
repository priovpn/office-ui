<template>
  <h1 class="pb-4 tb td">Sign-In</h1>

  <div
    class="d-flex justify-content-center align-items-center flex-row mb-4"
    style="border-radius: 10px"
  >
    <div
      class="card mainSection overflow-hidden cp me-4"
      @click="() => store.setMethod('qr')"
    >
      <img src="@/assets/img/qrCode.png" class="card-img-top p-4 mt-1" />
      <button type="button" class="btn btn-dark tbs btn-lg" style="width: 100%">
        Using QR code
      </button>
    </div>
    <!-- <div
      class="card mainSection overflow-hidden cp me-4"
      @click="() => store.setMethod('biometry')"
    >
      <img src="@/assets/img/biometry.png" class="card-img-top p-4 mt-1" />
      <button type="button" class="btn btn-dark tbs btn-lg" style="width: 100%">
        Using biometry
      </button>
    </div> -->
    <div
      class="card mainSection overflow-hidden cp me-3"
      @click="() => store.setMethod('key')"
    >
      <img src="@/assets/img/key.png" class="card-img-top p-4 mt-1" />
      <button type="button" class="btn btn-dark tbs btn-lg" style="width: 100%">
        Using key
      </button>
    </div>
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
  public store: IAuthPageStore = AuthPageStore
}
</script>
