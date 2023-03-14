import { reactive } from 'vue'
import client from '../modules/client.js'

export const useAuth = () => {
  const state = reactive({
    accessToken: '',
  })

  const SET_ACCESS_TOKEN = (accessToken) => {
    if (accessToken) {
      state.accessToken = accessToken
    }
  }

  const signin = (payload) => {
    return client.post(`/api/authenticate?username=${payload.userId}&password=${payload.password}`, {
      username: payload.userId,
      password: payload.password
    }).then(res => {
      const { authorization } = res.headers
      const accessToken = authorization.substring(7)

      SET_ACCESS_TOKEN(accessToken)
    })
  }

  return {
    signin,
  }
}
