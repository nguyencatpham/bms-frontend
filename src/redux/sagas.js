import { all } from 'redux-saga/effects'
import user from './user/sagas'
import menu from './menu/sagas'
import settings from './settings/sagas'
import account from './account/sagas'
import device from './device/sagas'
import authDevice from './authDevice/sagas'
import system from './system/sagas'

export default function * rootSaga () {
  yield all([user(), menu(), settings(), account(), device(), authDevice(), system()])
}
