import { all, put, call, takeEvery } from 'redux-saga/effects'
import { history } from 'index'
import { notification } from 'antd'
import store from 'store'
import { TYPES, callApi } from 'services'
import { preConfirm } from 'services/jwt'

import actions, { ENTITY } from './actions'

function * FLUSH_PRE_CONFIRM () {
  yield put({
    type: `${ENTITY}/SET_STATE`,
    payload: {
      preConfirm: null,
      success: false
    }
  })
}
function * PRE_CONFIRM ({ payload }) {
  yield loading(true)
  // preconfirm
  const success = yield call(preConfirm, payload.password)
  if (!success) {
    yield put({
      type: `${ENTITY}/SET_STATE`,
      payload: {
        preConfirm: true
      }
    })
    notification.warning({
      message: 'Lỗi!',
      description: 'Mật khẩu không đúng!'
    })
  } else {
    yield put({
      type: `${ENTITY}/SET_STATE`,
      payload: {
        success: true
      }
    })
  }
  yield loading(false)
}

export const COMMON = ({ type, field, actionType }) => {
  return function * ({ payload }) {
    yield loading(true)
    if (type.toLowerCase().indexOf('patch') > -1 || type.toLowerCase().indexOf('put') > -1 || type.toLowerCase().indexOf('delete') > -1) {
      const data = payload.data || payload.body || {}
      const { password, username } = data
      if (username) {
        yield loading(true)
        // preconfirm
        const success = yield call(preConfirm, password)
        if (!success) {
          yield put({
            type: `${ENTITY}/SET_STATE`,
            payload: {
              preConfirm: true
            }
          })
          notification.warning({
            message: 'Lỗi!',
            description: 'Mật khẩu không đúng!'
          })
          yield loading(false)
          return
        }
        delete data.password
      }
    }
    let response = yield call(callApi, { type, payload })
    if (response) {
      if (type.toLowerCase().indexOf('count') > -1) {
        if ((type.toLowerCase().indexOf('cabinetoperatings') === -1) &&
       (window.location.pathname.indexOf('/zones/') === -1)) {
        // remove current user
          response = response.count > 0 ? response.count - 1 : 0
        } else {
          response = response.count
        }
      }

      if (type.toLowerCase().indexOf('delete') > -1) {
        actionType = `${ENTITY}/SET_LIST_STATE`
        response = payload.id
      }
      if (field === 'list') {
        const userId = store.get('user.id') // current user
        response = response.filter(x => x.id !== userId)
      }
      yield put({
        type: actionType || `${ENTITY}/SET_STATE`,
        payload: {
          [field]: response
        }
      })
      if (type.toLowerCase().indexOf('suspend') > -1) {
        const { suspend } = payload
        notification.success({
          message: 'Thành công!',
          description: `${suspend ? 'Chặn' : 'Hủy chặn'} tài khoản ${response.name} thành công!`
        })
        yield loading(false)
        return
      }
      if (type.toLowerCase().indexOf('set_password') > -1) {
        notification.success({
          message: 'Thành công!',
          description: `Tài khoản ${response.name} đã được cập nhật mật khẩu thành công!`
        })
        const role = store.get('user.role')
        if (role === 'admin') { history.push(`/accounts/${response.id}`) }
        return false
      }
      if (type.toLowerCase().indexOf('post') > -1) {
        notification.success({
          message: 'Thành công!',
          description: `Tài khoản ${response.name} đã được tạo thành công!`
        })
        const role = store.get('user.role')
        if (role === 'admin') { history.push(`/accounts/${response.id}`) }
      }
      if (type.toLowerCase().indexOf('change') > -1 ||
        type.toLowerCase().indexOf('patch') > -1 ||
        type.toLowerCase().indexOf('put') > -1) {
        notification.success({
          message: 'Thành công!',
          description: `Tài khoản ${response.name} đã được cập nhật thành công!`
        })
        const role = store.get('user.role')
        if (role === 'admin') { history.push(`/accounts/${response.id}`) }
      }
      if (type.toLowerCase().indexOf('delete') > -1) {
        notification.success({
          message: 'Thành công!',
          description: 'Tài khoản đã được xóa thành công!'
        })
        if (window.location.pathname !== '/accounts') {
          history.push('/accounts')
        }
      }
    }
    yield loading(false)
  }
}
function * loading (isLoading = false) {
  yield put({
    type: `${ENTITY}/SET_STATE`,
    payload: {
      loading: isLoading
    }
  })
}
export default function * rootSaga () {
  yield all([
    takeEvery(actions.COUNT, COMMON({ type: TYPES.USERS_GET_COUNT, field: 'total' })),
    takeEvery(actions.LIST, COMMON({ type: TYPES.USERS_GET, field: 'list' })),
    takeEvery(actions.CREATE, COMMON({ type: TYPES.USERS_POST, field: 'detail' })),
    takeEvery(actions.DETAIL, COMMON({ type: TYPES.USERS_GET_ID, field: 'detail' })),
    takeEvery(actions.UPDATE, COMMON({ type: TYPES.USERS_PATCH_ID, field: 'detail' })),
    takeEvery(actions.DELETE, COMMON({ type: TYPES.USERS_DELETE_ID, field: 'id' })),
    takeEvery(actions.BAN, COMMON({ type: TYPES.USERS_POST_ID_SUSPEND, field: 'detail' })),
    // others
    takeEvery(actions.FLUSH_PRE_CONFIRM, FLUSH_PRE_CONFIRM),
    takeEvery(actions.PRE_CONFIRM, PRE_CONFIRM),
    takeEvery(actions.CHANGE_PASSWORD, COMMON({ type: TYPES.USERS_POST_ID_CHANGE_PASSWORD, field: 'changepass' })),
    takeEvery(actions.SET_PASSWORD, COMMON({ type: TYPES.USERS_POST_ID_SET_PASSWORD, field: 'setpass' })),
    takeEvery(actions.GET_DEVICES, COMMON({ type: TYPES.USERS_GET_ID_DEVICES, field: 'devices' })),
    takeEvery(actions.COUNT_DEVICES, COMMON({ type: TYPES.USERS_GET_ID_DEVICES_COUNT, field: 'totalDevice' }))
  ])
}
