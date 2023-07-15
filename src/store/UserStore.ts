import { reactive } from 'vue'
import storeKeys from '@/storeKeys'
import api from '@/api'
import { UserEntity } from '@priovpn/shared'

export default reactive<{
  data: UserEntity | null
  isLoggedIn: boolean
  fetch: () => Promise<UserEntity | null>
}>({
  data: null,
  isLoggedIn: !!localStorage.getItem(storeKeys.apiToken),

  async fetch() {
    this.data = await api.fetchUser()
    return this.data
  }
})
