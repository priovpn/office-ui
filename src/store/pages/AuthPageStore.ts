import { API } from '@/api'
import storeKeys from '@/storeKeys'
import { Nullable } from '@/ts/StringTypes'
import { reactive } from 'vue'
import { ApiError } from '../../api/base'

const api = new API()

export interface IAuthPageStore {
  view: string
  isFactorView: boolean
  login: Nullable<string>
  password: Nullable<string>
  rememberMe: boolean
  wait: boolean
  error: ApiError | null

  inviteCode: Nullable<string>

  checkState?: {
    type?: string
    code?: number
  }

  onSubmit: () => void
  setView: (view: string) => void
}

export default reactive<IAuthPageStore>({
  view: 'signIn',
  isFactorView: false,
  login: null,
  password: null,
  inviteCode: null,
  rememberMe: false,
  wait: false,
  error: null,

  checkState: {
    //
  },

  setView(view: string) {
    this.view = view
  },

  async onSubmit() {
    this.wait = true

    await (async () => {
      if (this.login) {
        if (this.login.trim().length < 4) return
      } else return

      if (this.password) {
        if (this.password.trim().length < 4) return
      } else return

      if (this.view === 'signIn') {
        await api
          .signIn({
            login: this.login,
            password: this.password,
            checkState: this.checkState,
            rememberMe: this.rememberMe
          })
          .then(({ token }) => {
            console.info('success', token)
            if (token) {
              localStorage.setItem(storeKeys.apiToken, token)
              this.error = null
              window.location.href = '/'
            }
          })
          .catch((e: ApiError) => {
            console.error('error', e)
            this.error = e
          })
      } else if (this.view === 'signUp') {
        const utmSource = new URLSearchParams(window.location.search).get(
          'utm_source'
        )

        if (!this.inviteCode || this.inviteCode.trim().length < 4) return

        await api
          .signUp({
            login: this.login,
            password: this.password,
            rememberMe: this.rememberMe,
            inviteCode: this.inviteCode,
            utmSource
          })
          .then(({ token }) => {
            console.info('success', token)
            if (token) {
              localStorage.setItem(storeKeys.apiToken, token)
              this.error = null
              window.location.href = '/'
            }
          })
          .catch((e: ApiError) => {
            console.error('error', e)
            this.error = e
          })
      }
    })()

    this.wait = false
  }
})
