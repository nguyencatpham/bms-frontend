import * as configDefault from './config.default'

// eslint-disable-next-line
const NODE_ENV = '${NODE_ENV}';
// eslint-disable-next-line
const API_URL = '${REACT_APP_API_URL}';
// eslint-disable-next-line
const GOOGLE_KEY = '${REACT_APP_GOOGLE_KEY}';
// eslint-disable-next-line
const ALERT_RANGE = '${REACT_APP_ALERT_RANGE}';

const color = {
  alert: '#ff7575',
  warning: '#fadb14',
  normal: '#9dda84',
  offline: '#d5d2d2'
}

const config = {
  NODE_ENV: NODE_ENV.startsWith('$') ? configDefault.NODE_ENV : NODE_ENV,
  API_URL: API_URL.startsWith('$') ? configDefault.API_URL : API_URL,
  GOOGLE_KEY: GOOGLE_KEY.startsWith('$') ? configDefault.GOOGLE_KEY : GOOGLE_KEY,
  ALERT_RANGE: ALERT_RANGE.startsWith('$') ? configDefault.ALERT_RANGE : ALERT_RANGE,
  COLOR: color
}
export default config
