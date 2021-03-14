import { all, put, call, takeEvery } from 'redux-saga/effects'
import { history } from 'index'
import { notification } from 'antd'
import { TYPES, callApi } from 'services'
import { preConfirm } from 'services/jwt'

import actions, { ENTITY } from './actions'

export const COMMON = ({ type, field, actionType }) => {
  return function * ({ payload }) {
    yield loading(true)
    if (type.toLowerCase().indexOf('put') > -1 || type.toLowerCase().indexOf('delete') > -1) {
      const data = payload.data || payload.body || {}
      const { password, username } = data
      if (username) {
        yield loading(true)
        // preconfirm
        const success = yield call(preConfirm, password)
        if (!success) {
          yield put({
            type: 'account/SET_STATE',
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
      if (type.toLowerCase().indexOf('delete') > -1) {
        actionType = 'account/SET_LIST_STATE'
        response = payload.id
      }
      yield put({
        type: actionType || 'account/SET_STATE',
        payload: {
          [field]: response
        }
      })
      if (type.toLowerCase().indexOf('post') > -1) {
        notification.success({
          message: 'Thành công!',
          description: `${ENTITY} ${response.name} đã được tạo thành công!`
        })
        history.push(`/accounts/${response.id}`)
      }
      if (type.toLowerCase().indexOf('change') > -1 ||
        type.toLowerCase().indexOf('patch') > -1 ||
        type.toLowerCase().indexOf('put') > -1) {
        notification.success({
          message: 'Thành công!',
          description: `${ENTITY} ${response.name} đã được cập nhật thành công!`
        })
        history.push(`/accounts/${response.id}`)
      }
      if (type.toLowerCase().indexOf('delete') > -1) {
        notification.success({
          message: 'Thành công!',
          description: `${ENTITY} đã được xóa thành công!`
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
    type: 'account/SET_STATE',
    payload: {
      loading: isLoading
    }
  })
}
export default function * rootSaga () {
  yield all([
    takeEvery(actions.COUNT, COMMON({ type: TYPES.DEVICES_GET_COUNT, field: 'total' })),
    takeEvery(actions.LIST, COMMON({ type: TYPES.DEVICES_GET, field: 'list' })),
    takeEvery(actions.DETAIL, COMMON({ type: TYPES.DEVICES_GET_ID, field: 'detail' })),
    takeEvery(actions.ATTACH, COMMON({ type: TYPES.DEVICES_PUT_ID_ATTACH_DEVICE, field: 'detail' })),
    takeEvery(actions.DELETE, COMMON({ type: TYPES.DEVICES_DELETE_ID, field: 'id' }))
  ])
}
