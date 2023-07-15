import storeKeys from '@/storeKeys'

export type ApiError = { name?: string; message?: string }

export default class APIBase {
  private host: string
  private baseUrl: string
  private apiToken: string | undefined

  constructor() {
    this.host =
      process.env.NODE_ENv === 'production'
        ? 'https://oapi.prionet.uk'
        : 'http://localhost:3056'
    this.baseUrl = this.host + '/api'

    const apiToken = localStorage.getItem(storeKeys.apiToken)
    this.apiToken = apiToken ? 'Bearer ' + apiToken : undefined
  }

  async get(path: string) {
    const headers: { [key: string]: string } = {}
    if (this.apiToken) headers.Authorization = this.apiToken

    const response = await fetch(`${this.baseUrl}${path}`, {
      headers
    })
    return response.json()
  }

  async post<T>(path: string, data = {}): Promise<T> {
    const headers: { [key: string]: string } = {}
    if (this.apiToken) headers.Authorization = this.apiToken

    const response = await fetch(`${this.baseUrl}${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...headers
      } as never,
      body: JSON.stringify(data)
    })

    const json = await response.json()

    if (response.status !== 200) throw json as ApiError

    return json
  }
}
