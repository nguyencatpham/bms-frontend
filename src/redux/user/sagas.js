import { all, takeEvery, put, call } from 'redux-saga/effects'
import store from 'store'
import { notification } from 'antd'
import { history } from 'index'
import * as jwt from 'services/jwt'
import actions from './actions'

const mapAuthProviders = {
  jwt: {
    login: jwt.login,
    register: jwt.register,
    currentAccount: jwt.currentAccount,
    logout: jwt.logout
  }
}

export function * LOGIN ({ payload }) {
  const { username, password } = payload
  yield put({
    type: 'user/SET_STATE',
    payload: {
      loading: true
    }
  })
  const success = yield call(mapAuthProviders.jwt.login, username, password)
  if (success) {
    yield put({
      type: 'user/LOAD_CURRENT_ACCOUNT'
    })
    yield history.push('/')
    notification.success({
      message: 'Thành công!',
      description: 'Đăng nhập hệ thống thành công!'
    })
  }
  if (!success) {
    yield put({
      type: 'user/SET_STATE',
      payload: {
        loading: false
      }
    })
  }
}

export function * REGISTER ({ payload }) {
  const { email, password, name } = payload
  yield put({
    type: 'user/SET_STATE',
    payload: {
      loading: true
    }
  })
  const success = yield call(mapAuthProviders.jwt.register, email, password, name)
  if (success) {
    yield put({
      type: 'user/LOAD_CURRENT_ACCOUNT'
    })
    yield history.push('/')
    notification.success({
      message: 'Succesful Registered',
      description: 'You have successfully registered!'
    })
  }
  if (!success) {
    yield put({
      type: 'user/SET_STATE',
      payload: {
        loading: false
      }
    })
  }
}

export function * LOAD_CURRENT_ACCOUNT () {
  const id = store.get('user.id')
  if (!id) {
    return
  }
  yield put({
    type: 'user/SET_STATE',
    payload: {
      loading: true
    }
  })
  const response = yield call(mapAuthProviders.jwt.currentAccount, id)
  if (response) {
    store.set('user.role', response.role)
    yield put({
      type: 'user/SET_STATE',
      payload: {
        ...response,
        authorized: true
      }
    })
  }
  yield put({
    type: 'user/SET_STATE',
    payload: {
      loading: false
    }
  })
}

export function * LOGOUT () {
  yield call(mapAuthProviders.jwt.logout)
  yield put({
    type: 'user/SET_STATE',
    payload: {
      id: '',
      name: '',
      role: '',
      email: '',
      avatar: '',
      authorized: false,
      loading: false
    }
  })
  yield put({
    type: 'account/SET_STATE',
    payload: {
      list: [],
      detail: {},
      total: 0
    }
  })
  // Clear all keys
  store.clearAll()
}

export default function * rootSaga () {
  yield all([
    takeEvery(actions.LOGIN, LOGIN),
    takeEvery(actions.REGISTER, REGISTER),
    takeEvery(actions.LOAD_CURRENT_ACCOUNT, LOAD_CURRENT_ACCOUNT),
    takeEvery(actions.LOGOUT, LOGOUT),
    LOAD_CURRENT_ACCOUNT() // run once on app load to check user auth
  ])
}
