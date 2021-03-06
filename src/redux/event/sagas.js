import { all, put, call, takeEvery } from 'redux-saga/effects'
import { history } from 'index'
import { notification } from 'antd'
import { TYPES, callApi } from 'services'

import actions, { ENTITY } from './actions'

export const COMMON = ({ type, field, actionType }) => {
  return function * ({ payload }) {
    yield loading(true)
    const response = yield call(callApi, { type, payload })
    if (response) {
      yield put({
        type: actionType || `${ENTITY}/SET_STATE`,
        payload: {
          [field]: response
        }
      })
      if (type.toLowerCase().indexOf('post') > -1) {
        notification.success({
          message: 'Thành công!',
          description: `${ENTITY} ${response.macAddress} đã được tạo thành công!`
        })
        history.push(`/${ENTITY}s/${response.id}`)
      }
      if (type.toLowerCase().indexOf('change') > -1 ||
        type.toLowerCase().indexOf('patch') > -1 ||
        type.toLowerCase().indexOf('put') > -1) {
        notification.success({
          message: 'Thành công!',
          description: `${ENTITY} ${response.macAddress} đã được cập nhật thành công!`
        })
      }
      if (type.toLowerCase().indexOf('delete') > -1) {
        yield put({
          type: `${ENTITY}/SET_DELETE`,
          payload
        })
        notification.success({
          message: 'Thành công!',
          description: `${ENTITY} đã được xóa thành công!`
        })
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
    takeEvery(actions.COUNT, COMMON({ type: TYPES.EVENTS_GET_COUNT, field: 'total' })),
    takeEvery(actions.LIST, COMMON({ type: TYPES.EVENTS_GET, field: 'list' })),
    takeEvery(actions.LIST_TIMESERIES, COMMON({ type: TYPES.EVENTS_GET, field: 'listTimeSeries' }))
  ])
}
