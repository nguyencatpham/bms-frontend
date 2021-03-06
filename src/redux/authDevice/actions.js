export const ENTITY = 'authDevice'
const actions = {
  // SET
  SET_STATE: `${ENTITY}/SET_STATE`,
  SET_LIST_STATE: `${ENTITY}/SET_LIST_STATE`,
  SET_DELETE: `${ENTITY}/SET_DELETE`,
  // GET
  COUNT: `${ENTITY}/COUNT`,
  LIST: `${ENTITY}/LIST`,
  DETAIL: `${ENTITY}/DETAIL`,
  CREATE: `${ENTITY}/CREATE`,
  UPDATE: `${ENTITY}/UPDATE`,
  DELETE: `${ENTITY}/DELETE`,
  ATTACH: `${ENTITY}/ATTACH`
}

export default actions
