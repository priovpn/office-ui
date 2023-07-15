<template>
  <v-form
    style="width: 55%"
    fast-fail
    :disabled="store.wait"
    @submit.prevent="() => store.onSubmit()"
  >
    <h1>{{ $t('signIn.title') }}</h1>

    <v-text-field
      v-model="store.login"
      :label="$t('signIn.login')"
      :rules="[
        (v) => !!v || $t('signIn._error.fillInput'),
        (v) => v.length > 3 || $t('signIn._error.minSymbols')
      ]"
      variant="underlined"
      clearable
    ></v-text-field>

    <v-text-field
      v-model="store.password"
      :label="$t('signIn.password')"
      :rules="[
        (v) => !!v || $t('signIn._error.fillInput'),
        (v) => v.length > 3 || $t('signIn._error.minSymbols')
      ]"
      variant="underlined"
      hide-details="auto"
      type="password"
      clearable
      :error="
        (store.error && store.error.name === 'UnauthorizedError') === true
      "
      :error-messages="
        (store.error && store.error.name === 'UnauthorizedError') === true
          ? [$t('signIn._error.invalidCredentials')]
          : []
      "
    ></v-text-field>

    <v-row class="d-flex align-center mt-2" no-gutters>
      <v-col class="d-flex justify-center">
        <v-checkbox
          v-model="store.rememberMe"
          :label="$t('signIn.rememberMe')"
          class="p-0 m-0"
          style="height: 55px"
        ></v-checkbox>
      </v-col>
      <v-col class="d-flex justify-center">
        <router-link
          to="#"
          style="color: unset"
          class="font-weight-light"
          @click="() => store.setView('resetPassword')"
        >
          {{ $t('signIn.forgotPassword') }}
        </router-link>
      </v-col>
    </v-row>

    <v-row class="mt-2" no-gutters>
      <v-col :cols="10">
        <v-btn
          type="submit"
          color="secondary"
          block
          class="rounded-lg font-weight-bold mb-4"
          style="height: 43px"
          :elevation="0"
          :loading="store.wait"
        >
          {{ $t('signIn._btn.signIn') }}
        </v-btn>
      </v-col>
      <v-col :cols="2">
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn
              type="submit"
              variant="tonal"
              block
              class="ml-2 rounded-lg font-weight-bold mb-4"
              style="height: 43px; font-size: 25px"
              :elevation="0"
              @click.prevent=""
              v-bind="props"
            >
              {{ localeStore.locales[localeStore.locale].f }}
            </v-btn>
          </template>

          <v-list :elevation="0" bg-color="secondary">
            <v-list-item
              value="t"
              v-for="(l, k) in localeStore.locales"
              :key="k"
              @click="() => localeStore.set(k as any, $i18n)"
            >
              <v-list-item-title>{{ l.f }} {{ l.t }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-col>
    </v-row>

    <v-row justify="center" class="text-center mt-0">
      <v-col :cols="8" :sm="12" class="pa-0">
        <span>
          {{ $t('signIn._span.dontHaveAccount') }}
        </span>
      </v-col>
      <v-col :cols="4" :sm="12" class="pa-0">
        <router-link
          to="#"
          style="color: unset"
          class="ml-1 font-weight-bold"
          @click="() => store.setView('signUp')"
        >
          {{ $t('signIn._btn.signUp') }}
        </router-link>
      </v-col>
    </v-row>
  </v-form>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import AuthPageStore, { IAuthPageStore } from '@/store/pages/AuthPageStore'
import LocaleStore from '@/store/LocaleStore'

@Options({
  components: {}
})
export default class Component extends Vue {
  public store: IAuthPageStore = AuthPageStore
  public localeStore = LocaleStore
}
</script>
