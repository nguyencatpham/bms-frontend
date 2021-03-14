import { all } from 'redux-saga/effects'
import user from './user/sagas'
import menu from './menu/sagas'
import settings from './settings/sagas'
import account from './account/sagas'
import device from './device/sagas'

export default function * rootSaga () {
  yield all([user(), menu(), settings(), account(), device()])
}
