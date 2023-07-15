<template>
  <v-form
    style="width: 55%"
    fast-fail
    :disabled="store.wait"
    @submit.prevent="() => store.onSubmit()"
  >
    <h1>{{ $t('signUp.title') }}</h1>

    <v-text-field
      v-model="store.login"
      :label="$t('signUp.login')"
      variant="underlined"
      clearable
    ></v-text-field>

    <v-text-field
      v-model="store.password"
      :label="$t('signUp.password')"
      variant="underlined"
      type="password"
      clearable
    ></v-text-field>

    <v-text-field
      v-model="store.inviteCode"
      :label="$t('signUp.inviteCode')"
      variant="underlined"
      hide-details="auto"
      type="string"
      clearable
      :error="store.error !== null"
      :error-messages="
        store.error !== null ? [$t('_e.' + store.error.message)] : []
      "
    ></v-text-field>

    <v-row class="mt-7" no-gutters>
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
          {{ $t('signUp._btn.signUp') }}
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
              @click="() => localeStore.set(k as Language, $i18n)"
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
          {{ $t('signUp._span.haveAccount') }}
        </span>
      </v-col>
      <v-col :cols="4" :sm="12" class="pa-0">
        <router-link
          to="#"
          style="color: unset"
          class="ml-1 font-weight-bold"
          @click="() => store.setView('signIn')"
        >
          {{ $t('signUp._btn.signIn') }}
        </router-link>
      </v-col>
    </v-row>
  </v-form>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import AuthPageStore, { IAuthPageStore } from '@/store/pages/AuthPageStore'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import LocaleStore, { Language } from '@/store/LocaleStore'

@Options({
  components: {}
})
export default class Component extends Vue {
  public store: IAuthPageStore = AuthPageStore
  public localeStore = LocaleStore
}
</script>
