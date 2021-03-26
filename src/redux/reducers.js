import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import user from './user/reducers'
import menu from './menu/reducers'
import settings from './settings/reducers'
import account from './account/reducers'
import device from './device/reducers'
import authDevice from './authDevice/reducers'
import system from './system/reducers'

export default history =>
  combineReducers({
    router: connectRouter(history),
    user,
    menu,
    settings,
    account,
    device,
    authDevice,
    system
  })
