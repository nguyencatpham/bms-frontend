import apiClient from 'services/axios'
import { apis, types } from './api'

export const TYPES = types
export const callApi = async function ({ type, payload }) {
  const api = apis[type]
  if (!api || typeof api !== 'function') {
    return
  }
  const { method, url, body: data } = api(payload)
  const response = await apiClient({
    method,
    url,
    data
  })
  return (response || {}).data
}
