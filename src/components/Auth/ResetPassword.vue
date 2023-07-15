<template>
  <v-form
    style="width: 55%"
    fast-fail
    :disabled="store.wait"
    @submit.prevent="() => store.onSubmit()"
  >
    <h1>{{ $t('resetPassword.title') }}</h1>

    <v-text-field
      v-model="store.login"
      :label="$t('resetPassword.login')"
      variant="underlined"
    ></v-text-field>

    <v-btn
      type="submit"
      color="secondary"
      block
      class="mt-2 rounded-lg font-weight-bold mb-4"
      style="height: 43px"
      :elevation="0"
      :loading="store.wait"
    >
      {{ $t('resetPassword._btn.reset') }}
    </v-btn>

    <v-row justify="center" class="text-center pt-3">
      <v-col :cols="8" :sm="12" class="pa-0">
        <span>
          {{ $t('resetPassword._span.dontWantResetPassword') }}
        </span>
      </v-col>
      <v-col :cols="4" :sm="12" class="pa-0">
        <router-link
          to="#"
          style="color: unset"
          class="ml-1 font-weight-bold"
          @click="() => store.setView('signIn')"
        >
          {{ $t('resetPassword._btn.signIn') }}
        </router-link>
      </v-col>
    </v-row>
  </v-form>
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
