<template>
  <div
    class="d-flex justify-content-center align-items-center flex-column flex-row mb-4"
    style="border-radius: 10px"
  >
    <h1 class="pb-4 tb td">Please, enter key</h1>
    <input type="password" ref="pwdInput" @change="onPwdInputChange" hidden />
    <div class="row d-flex justify-content-center align-items-center">
      <div class="col-4 mol p-0">
        <div
          class="row d-flex justify-content-center align-items-center g-0 p-0 m-0"
        >
          <div
            class="col-3 p-0"
            style="margin-right: 5px"
            v-for="(_, key) in keyControls"
            :key="key"
          >
            <input
              type="text"
              class="form-control mb-1 pc"
              :placeholder="String(key + 1)"
              v-model="keyControls[key]"
            />
          </div>
          <button class="btn btn-dark fc">test</button>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped></style>
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
  public keyControls: { [key: number]: string } = []

  created(): void {
    this.clearPwdInput()
  }

  private clearPwdInput() {
    this.keyControls = ['', '', '', '', '', '', '', '', '', '', '', '']
  }

  public onPwdInputChange() {
    const target = this.$refs.pwdInput as HTMLInputElement
    this.clearPwdInput()
    target.value.split(' ').forEach((word: string, index: number) => {
      this.keyControls[index] = word
    })
  }
}
</script>
