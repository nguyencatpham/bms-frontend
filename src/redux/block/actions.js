export const ENTITY = 'block'
const actions = {
  // SET
  SET_STATE: `${ENTITY}/SET_STATE`,
  SET_LIST_STATE: `${ENTITY}/SET_LIST_STATE`,
  // GET
  COUNT: `${ENTITY}/COUNT`,
  HAS_ALERT_COUNT: `${ENTITY}/HAS_ALERT_COUNT`,
  LIST: `${ENTITY}/LIST`,
  HAS_ALERT_LIST: `${ENTITY}/HAS_ALERT_LIST`,
  DETAIL: `${ENTITY}/DETAIL`,
  CREATE: `${ENTITY}/CREATE`,
  UPDATE: `${ENTITY}/UPDATE`,
  DELETE: `${ENTITY}/DELETE`,
  ATTACH: `${ENTITY}/ATTACH`,
  STATS: `${ENTITY}/STATS`
}

export default actions
