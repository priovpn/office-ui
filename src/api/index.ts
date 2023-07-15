import { IAuthPageStore } from '@/store/pages/AuthPageStore'
import { Nullable } from '@/ts/StringTypes'
import { UserEntity } from '@priovpn/shared'
import APIBase from './base'

export class API extends APIBase {
  async fetchUser(): Promise<UserEntity> {
    return await this.get('/me')
  }

  async signIn({
    login,
    password,
    checkState,
    rememberMe
  }: {
    login: Nullable<string>
    password: Nullable<string>
    checkState: IAuthPageStore['checkState']
    rememberMe: boolean
  }): Promise<{ token: string }> {
    return await this.post<{ token: string }>('/signIn', {
      login,
      password,
      ...checkState,
      rememberMe
    })
  }

  async signUp({
    login,
    password,
    rememberMe,
    inviteCode,
    utmSource
  }: {
    login: Nullable<string>
    password: Nullable<string>
    rememberMe: boolean
    inviteCode: Nullable<string>
    utmSource: string | null
  }): Promise<{ token: string }> {
    return await this.post<{ token: string }>('/signUp', {
      login,
      password,
      rememberMe,
      inviteCode,
      utmSource
    })
  }
}

export default new API()
