import axios from 'axios'
import store from 'store'
import { history } from 'index'
import { notification } from 'antd'
import { get } from 'lodash'
import ERROR from 'constant/error'
import config from 'config/config'

const baseURL = config.API_URL || '/api'
const apiClient = axios.create({
  baseURL,
  timeout: 10000,
  headers: { 'x-powered-by': 'Nguyen Cat Pham' }
})
apiClient.interceptors.request.use(request => {
  const accessToken = store.get('accessToken')
  if (accessToken) {
    request.headers.Authorization = `${accessToken}`
    // request.headers.AccessToken = accessToken
  }
  store.set('offline', false)

  return request
})

apiClient.interceptors.response.use(undefined, error => {
  // Errors handling
  const { response } = error
  console.log('############INTERCEPTORS', response, error)
  if (!response) {
    store.set('offline', true)
    return
  }

  const { data, statusText, status } = response
  let message = get(data, ['error', 'message'], statusText)
  const code = get(data, ['error', 'code'])
  const errorLib = ERROR[code]
  let description = message
  if (errorLib) {
    message = 'Xảy ra lỗi!'
    description = errorLib.message
  }

  if (status === 401) {
    if (window.location.href.indexOf('/auth/login') === -1) {
      history.push('/auth/login')
      return
    }

    const requestURL = get(response, ['request', 'responseURL'], '')
    if (requestURL.indexOf('settings/dashboard') > -1) {
      return
    }
  }

  notification.warning({
    message,
    description
  })
})

export default apiClient
