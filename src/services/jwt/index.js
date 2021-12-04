import { get } from 'lodash'
import apiClient from 'services/axios'
import store from 'store'

export async function login (email, password) {
  return apiClient
    .post('/api/users/login', {
      email,
      password
    })
    .then(response => {
      if (response) {
        const { userId, id } = response.data
        if (id) {
          store.set('accessToken', id)
          store.set('user.email', email)
          store.set('user.id', userId)
        }
        return response.data
      }
      return false
    })
    .catch(err => console.error(err))
}
export async function preConfirm (password) {
  const id = store.get('user.id')
  return apiClient
    .post(`/api/users/${id}/check-password`, {
      id,
      password
    })
    .then(response => {
      if (response) {
        const { valid } = response.data
        if (valid) {
          return true
        }
      }
      return false
    })
    .catch(err => console.error(err))
}

export async function register ({ username, email, password, name }) {
  return apiClient
    .post('/auth/register', {
      username,
      email,
      password,
      name
    })
    .then(response => {
      if (response) {
        const { accessToken } = response.data
        if (accessToken) {
          store.set('accessToken', accessToken)
        }
        return response.data
      }
      return false
    })
    .catch(err => console.error(err))
}

export async function currentAccount (id) {
  const filter = JSON.stringify({ include: [] })

  return apiClient
    .get(`/api/users/${id}`)
    .then(response => {
      if (response) {
        store.set('user.state', JSON.stringify(response.data))
        store.set('user.role', get(response.data, ['role']))
        return response.data
      }
      return false
    })
    .catch(err => {
      console.error(err)
      return false
    })
}

export async function logout () {
  return apiClient
    .post('/api/users/logout')
    .then(() => {
      return true
    })
    .catch(err => console.error(err))
}
