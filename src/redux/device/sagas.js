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
      if (type.toLowerCase().indexOf('delete') > -1) {
        actionType = `${ENTITY}/SET_LIST_STATE`
        response = payload.id
      }
      yield put({
        type: actionType || `${ENTITY}/SET_STATE`,
        payload: {
          [field]: response
        }
      })
      if (type.toLowerCase().indexOf('post') > -1) {
        notification.success({
          message: 'Thành công!',
          description: `${ENTITY} đã được thiết lập thành công!`
        })
        history.push(`/${ENTITY}s`)
      }
      if (type.toLowerCase().indexOf('change') > -1 ||
        type.toLowerCase().indexOf('patch') > -1 ||
        type.toLowerCase().indexOf('put') > -1) {
        notification.success({
          message: 'Thành công!',
          description: `${ENTITY} đã được cập nhật thành công!`
        })
        history.push(`/${ENTITY}s`)
      }
      if (type.toLowerCase().indexOf('delete') > -1) {
        notification.success({
          message: 'Thành công!',
          description: `${ENTITY} đã được xóa thành công!`
        })
        if (window.location.pathname !== `/${ENTITY}s`) {
          history.push(`/${ENTITY}s`)
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
    takeEvery(actions.COUNT, COMMON({ type: TYPES.DEVICES_GET_COUNT, field: 'total' })),
    takeEvery(actions.LIST, COMMON({ type: TYPES.DEVICES_GET, field: 'list' })),
    takeEvery(actions.DETAIL, COMMON({ type: TYPES.DEVICES_GET_ID, field: 'detail' })),
    takeEvery(actions.ATTACH, COMMON({ type: TYPES.DEVICES_PUT_ID_ATTACH_DEVICE, field: 'detail' })),
    takeEvery(actions.DELETE, COMMON({ type: TYPES.DEVICES_DELETE_ID, field: 'id' })),
    takeEvery(actions.UNITS, COMMON({ type: TYPES.DEVICES_GET_ID_UNITS, field: 'units' })),
    takeEvery(actions.BLOCKS, COMMON({ type: TYPES.DEVICES_GET_ID_BLOCKS, field: 'blocks' })),
    takeEvery(actions.BLOCKS_SUMMARY, COMMON({ type: TYPES.DEVICES_GET_ID_BLOCKS, field: 'blocksSummary' })),
    takeEvery(actions.BLOCK_STATS, COMMON({ type: TYPES.DEVICES_GET_ID_BLOCK_STATS, field: 'blockStats' })),
    takeEvery(actions.BLOCK_EVENTS, COMMON({ type: TYPES.DEVICES_GET_ID_EVENTS_TIMESERIES, field: 'blockEvents' })),
    takeEvery(actions.BLOCK_DETAIL_EVENTS, COMMON({ type: TYPES.DEVICES_GET_ID_EVENTS_TIMESERIES, field: 'blockDetailEvents' })),
    takeEvery(actions.BLOCK_HISTORY, COMMON({ type: TYPES.DEVICES_GET_ID_BLOCK_HISTORIES, field: 'blockHistories' })),
    takeEvery(actions.UPLOAD_CONFIG, COMMON({ type: TYPES.DEVICES_POST_ID_UPLOADCONFIG, field: 'uploadConfig' })),
    takeEvery(actions.FWUPDATE, COMMON({ type: TYPES.DEVICES_PUT_ID_FWUPDATE, field: 'fwUpdate' }))
  ])
}
