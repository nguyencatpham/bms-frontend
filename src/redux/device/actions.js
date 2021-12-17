export const ENTITY = 'device'
const actions = {
  // SET
  SET_STATE: `${ENTITY}/SET_STATE`,
  SET_LIST_STATE: `${ENTITY}/SET_LIST_STATE`,
  // GET
  COUNT: `${ENTITY}/COUNT`,
  LIST: `${ENTITY}/LIST`,
  DETAIL: `${ENTITY}/DETAIL`,
  CREATE: `${ENTITY}/CREATE`,
  UPDATE: `${ENTITY}/UPDATE`,
  DELETE: `${ENTITY}/DELETE`,
  ATTACH: `${ENTITY}/ATTACH`,

  UNITS: `${ENTITY}/UNITS`,
  BLOCKS: `${ENTITY}/BLOCKS`,
  BLOCKS_SUMMARY: `${ENTITY}/BLOCKS_SUMMARY`,
  BLOCK_STATS: `${ENTITY}/BLOCK_STATS`,
  BLOCK_EVENTS: `${ENTITY}/BLOCK_EVENTS`,
  BLOCK_DETAIL_EVENTS: `${ENTITY}/BLOCK_DETAIL_EVENTS`,
  BLOCK_HISTORY: `${ENTITY}/BLOCK_HISTORY`,

  UPLOAD_CONFIG: `${ENTITY}/UPLOAD_CONFIG`,
  FWUPDATE: `${ENTITY}/FWUPDATE`
}

export default actions
