<template>
  <div
    class="d-flex justify-content-center align-items-center flex-column flex-row mb-4"
    style="border-radius: 10px"
  >
    <form>
      <div class="form-group pb-1">
        <input type="email" class="form-control ai" placeholder="Username" />
      </div>
      <div class="form-group">
        <input type="password" class="form-control ai" placeholder="Password" />
      </div>
      <div class="form-check">
        <input type="checkbox" class="form-check-input" id="exampleCheck1" />
        <label class="form-check-label" for="exampleCheck1">Check me out</label>
      </div>
      <button type="submit" class="btn btn-dark fc">Sign-In</button>
    </form>
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
