/* eslint camelcase: 0 */
/*
    Total: 102 APIs
    version: "0.1.0",
    title: "bms-backend",
    description: "bms Backend API"
*/
import config from 'config/config'

const apiEndpoint = config.API_URL

export const types = {
  USERS_GET_ID_DEVICES_FK: 'USERS_GET_ID_DEVICES_FK',
  USERS_DELETE_ID_DEVICES_FK: 'USERS_DELETE_ID_DEVICES_FK',
  USERS_PUT_ID_DEVICES_FK: 'USERS_PUT_ID_DEVICES_FK',
  USERS_GET_ID_DEVICES: 'USERS_GET_ID_DEVICES',
  USERS_POST_ID_DEVICES: 'USERS_POST_ID_DEVICES',
  USERS_DELETE_ID_DEVICES: 'USERS_DELETE_ID_DEVICES',
  USERS_GET_ID_DEVICES_COUNT: 'USERS_GET_ID_DEVICES_COUNT',
  USERS_GET_ID: 'USERS_GET_ID',
  USERS_DELETE_ID: 'USERS_DELETE_ID',
  USERS_PATCH_ID: 'USERS_PATCH_ID',
  USERS_GET: 'USERS_GET',
  USERS_POST: 'USERS_POST',
  USERS_GET_COUNT: 'USERS_GET_COUNT',
  USERS_POST_ID_FCMS: 'USERS_POST_ID_FCMS',
  USERS_POST_RESET: 'USERS_POST_RESET',
  USERS_POST_LOGIN: 'USERS_POST_LOGIN',
  USERS_POST_LOGOUT: 'USERS_POST_LOGOUT',
  USERS_GET_CONFIRM: 'USERS_GET_CONFIRM',
  USERS_POST_RESEND_CONFIRM_EMAIL: 'USERS_POST_RESEND_CONFIRM_EMAIL',
  USERS_POST_ID_CHANGE_PASSWORD: 'USERS_POST_ID_CHANGE_PASSWORD',
  USERS_POST_ID_CHECK_PASSWORD: 'USERS_POST_ID_CHECK_PASSWORD',
  USERS_POST_RESET_PASSWORD: 'USERS_POST_RESET_PASSWORD',
  USERS_POST_ID_SUSPEND: 'USERS_POST_ID_SUSPEND',
  USERS_POST_ID_SET_PASSWORD: 'USERS_POST_ID_SET_PASSWORD',
  DEVICES_GET_ID_BROKER: 'DEVICES_GET_ID_BROKER',
  DEVICES_GET_ID_SYSTEMS_FK: 'DEVICES_GET_ID_SYSTEMS_FK',
  DEVICES_DELETE_ID_SYSTEMS_FK: 'DEVICES_DELETE_ID_SYSTEMS_FK',
  DEVICES_PUT_ID_SYSTEMS_FK: 'DEVICES_PUT_ID_SYSTEMS_FK',
  DEVICES_GET_ID_AUTHORIZEDDEVICE: 'DEVICES_GET_ID_AUTHORIZEDDEVICE',
  DEVICES_GET_ID_SYSTEMS: 'DEVICES_GET_ID_SYSTEMS',
  DEVICES_POST_ID_SYSTEMS: 'DEVICES_POST_ID_SYSTEMS',
  DEVICES_DELETE_ID_SYSTEMS: 'DEVICES_DELETE_ID_SYSTEMS',
  DEVICES_GET_ID_SYSTEMS_COUNT: 'DEVICES_GET_ID_SYSTEMS_COUNT',
  DEVICES_GET_ID: 'DEVICES_GET_ID',
  DEVICES_DELETE_ID: 'DEVICES_DELETE_ID',
  DEVICES_GET: 'DEVICES_GET',
  DEVICES_GET_COUNT: 'DEVICES_GET_COUNT',
  DEVICES_PUT_CREDENTIALS: 'DEVICES_PUT_CREDENTIALS',
  SYSTEMS_GET_ID_USER: 'SYSTEMS_GET_ID_USER',
  SYSTEMS_GET_ID_DEVICE: 'SYSTEMS_GET_ID_DEVICE',
  SYSTEMS_GET_ID_BLOCKS_FK: 'SYSTEMS_GET_ID_BLOCKS_FK',
  SYSTEMS_DELETE_ID_BLOCKS_FK: 'SYSTEMS_DELETE_ID_BLOCKS_FK',
  SYSTEMS_PUT_ID_BLOCKS_FK: 'SYSTEMS_PUT_ID_BLOCKS_FK',
  SYSTEMS_GET_ID_BLOCKS: 'SYSTEMS_GET_ID_BLOCKS',
  SYSTEMS_POST_ID_BLOCKS: 'SYSTEMS_POST_ID_BLOCKS',
  SYSTEMS_GET_ID_BLOCKS_COUNT: 'SYSTEMS_GET_ID_BLOCKS_COUNT',
  SYSTEMS_POST: 'SYSTEMS_POST',
  SYSTEMS_GET: 'SYSTEMS_GET',
  SYSTEMS_GET_ID: 'SYSTEMS_GET_ID',
  SYSTEMS_DELETE_ID: 'SYSTEMS_DELETE_ID',
  SYSTEMS_GET_COUNT: 'SYSTEMS_GET_COUNT',
  SYSTEMS_GET_ID_TSDATA: 'SYSTEMS_GET_ID_TSDATA',
  SYSTEMS_GET_ID_EVENTS: 'SYSTEMS_GET_ID_EVENTS',
  SYSTEMS_GET_ALERTCHART: 'SYSTEMS_GET_ALERTCHART',
  SYSTEMS_GET_ALERTSTATS: 'SYSTEMS_GET_ALERTSTATS',
  SYSTEMS_GET_STATS: 'SYSTEMS_GET_STATS',
  BLOCKS_GET_ID_SYSTEM: 'BLOCKS_GET_ID_SYSTEM',
  BLOCKS_POST: 'BLOCKS_POST',
  BLOCKS_PATCH: 'BLOCKS_PATCH',
  BLOCKS_PUT: 'BLOCKS_PUT',
  BLOCKS_GET: 'BLOCKS_GET',
  BLOCKS_POST_REPLACEORCREATE: 'BLOCKS_POST_REPLACEORCREATE',
  BLOCKS_POST_UPSERTWITHWHERE: 'BLOCKS_POST_UPSERTWITHWHERE',
  BLOCKS_GET_ID_EXISTS: 'BLOCKS_GET_ID_EXISTS',
  BLOCKS_HEAD_ID: 'BLOCKS_HEAD_ID',
  BLOCKS_GET_ID: 'BLOCKS_GET_ID',
  BLOCKS_PUT_ID: 'BLOCKS_PUT_ID',
  BLOCKS_DELETE_ID: 'BLOCKS_DELETE_ID',
  BLOCKS_PATCH_ID: 'BLOCKS_PATCH_ID',
  BLOCKS_POST_ID_REPLACE: 'BLOCKS_POST_ID_REPLACE',
  BLOCKS_GET_FINDONE: 'BLOCKS_GET_FINDONE',
  BLOCKS_POST_UPDATE: 'BLOCKS_POST_UPDATE',
  BLOCKS_GET_COUNT: 'BLOCKS_GET_COUNT',
  BLOCKS_POST_CHANGE_STREAM: 'BLOCKS_POST_CHANGE_STREAM',
  BLOCKS_GET_CHANGE_STREAM: 'BLOCKS_GET_CHANGE_STREAM',
  AUTHORIZEDDEVICES_GET_ID_USER: 'AUTHORIZEDDEVICES_GET_ID_USER',
  AUTHORIZEDDEVICES_GET_ID_DEVICES_FK: 'AUTHORIZEDDEVICES_GET_ID_DEVICES_FK',
  AUTHORIZEDDEVICES_DELETE_ID_DEVICES_FK: 'AUTHORIZEDDEVICES_DELETE_ID_DEVICES_FK',
  AUTHORIZEDDEVICES_PUT_ID_DEVICES_FK: 'AUTHORIZEDDEVICES_PUT_ID_DEVICES_FK',
  AUTHORIZEDDEVICES_GET_ID_DEVICES: 'AUTHORIZEDDEVICES_GET_ID_DEVICES',
  AUTHORIZEDDEVICES_POST_ID_DEVICES: 'AUTHORIZEDDEVICES_POST_ID_DEVICES',
  AUTHORIZEDDEVICES_DELETE_ID_DEVICES: 'AUTHORIZEDDEVICES_DELETE_ID_DEVICES',
  AUTHORIZEDDEVICES_GET_ID_DEVICES_COUNT: 'AUTHORIZEDDEVICES_GET_ID_DEVICES_COUNT',
  AUTHORIZEDDEVICES_GET_ID: 'AUTHORIZEDDEVICES_GET_ID',
  AUTHORIZEDDEVICES_DELETE_ID: 'AUTHORIZEDDEVICES_DELETE_ID',
  AUTHORIZEDDEVICES_GET: 'AUTHORIZEDDEVICES_GET',
  AUTHORIZEDDEVICES_PUT: 'AUTHORIZEDDEVICES_PUT',
  AUTHORIZEDDEVICES_DELETE: 'AUTHORIZEDDEVICES_DELETE',
  AUTHORIZEDDEVICES_GET_COUNT: 'AUTHORIZEDDEVICES_GET_COUNT',
  AUTHORIZEDDEVICES_PUT_ID_ATTACH_DEVICE: 'AUTHORIZEDDEVICES_PUT_ID_ATTACH_DEVICE',
  CONTAINERS_GET: 'CONTAINERS_GET',
  CONTAINERS_POST: 'CONTAINERS_POST',
  CONTAINERS_DELETE_CONTAINER: 'CONTAINERS_DELETE_CONTAINER',
  CONTAINERS_GET_CONTAINER: 'CONTAINERS_GET_CONTAINER',
  CONTAINERS_GET_CONTAINER_FILES: 'CONTAINERS_GET_CONTAINER_FILES',
  CONTAINERS_GET_CONTAINER_FILES_FILE: 'CONTAINERS_GET_CONTAINER_FILES_FILE',
  CONTAINERS_DELETE_CONTAINER_FILES_FILE: 'CONTAINERS_DELETE_CONTAINER_FILES_FILE',
  CONTAINERS_POST_CONTAINER_UPLOAD: 'CONTAINERS_POST_CONTAINER_UPLOAD',
  CONTAINERS_GET_CONTAINER_DOWNLOAD_FILE: 'CONTAINERS_GET_CONTAINER_DOWNLOAD_FILE',
  EVENTS_GET: 'EVENTS_GET',
  EVENTS_GET_COUNT: 'EVENTS_GET_COUNT',
  EVENTS_POST_READS: 'EVENTS_POST_READS',
}
export const apis = {

  // Find a related item by id for devices.
  USERS_GET_ID_DEVICES_FK: ({ id, fk }) => ({
    method: 'GET',
    url: `${apiEndpoint}/api/users/${id}/devices/${fk}`
  }),
  // Delete a related item by id for devices.
  USERS_DELETE_ID_DEVICES_FK: ({ id, fk }) => ({
    method: 'DELETE',
    url: `${apiEndpoint}/api/users/${id}/devices/${fk}`
  }),
  // Update a related item by id for devices.
  USERS_PUT_ID_DEVICES_FK: ({ id, fk, data }) => ({
    method: 'PUT',
    url: `${apiEndpoint}/api/users/${id}/devices/${fk}`,
    body: data
  }),
  // Queries devices of User.
  USERS_GET_ID_DEVICES: ({ id, filter }) => ({
    method: 'GET',
    url: `${apiEndpoint}/api/users/${id}/devices?${filter ? `filter=${encodeURIComponent(typeof filter === 'object' ? JSON.stringify(filter) : filter)}` : ''}`
  }),
  // Creates a new instance in devices of this model.
  USERS_POST_ID_DEVICES: ({ id, data }) => ({
    method: 'POST',
    url: `${apiEndpoint}/api/users/${id}/devices`,
    body: data
  }),
  // Deletes all devices of this model.
  USERS_DELETE_ID_DEVICES: ({ id }) => ({
    method: 'DELETE',
    url: `${apiEndpoint}/api/users/${id}/devices`
  }),
  // Counts devices of User.
  USERS_GET_ID_DEVICES_COUNT: ({ id, where }) => ({
    method: 'GET',
    url: `${apiEndpoint}/api/users/${id}/devices/count?${where ? `where=${encodeURIComponent(typeof where === 'object' ? JSON.stringify(where) : where)}` : ''}`
  }),
  // Find a model instance by {{id}} from the data source.
  USERS_GET_ID: ({ id, filter }) => ({
    method: 'GET',
    url: `${apiEndpoint}/api/users/${id}?${filter ? `filter=${encodeURIComponent(typeof filter === 'object' ? JSON.stringify(filter) : filter)}` : ''}`
  }),
  // Delete a model instance by {{id}} from the data source.
  USERS_DELETE_ID: ({ id }) => ({
    method: 'DELETE',
    url: `${apiEndpoint}/api/users/${id}`
  }),
  // Update user information
  USERS_PATCH_ID: ({ id, body }) => ({
    method: 'PATCH',
    url: `${apiEndpoint}/api/users/${id}`,
    body
  }),
  // Find all instances of the model matched by filter from the data source.
  USERS_GET: ({ filter }) => ({
    method: 'GET',
    url: `${apiEndpoint}/api/users?${filter ? `filter=${encodeURIComponent(typeof filter === 'object' ? JSON.stringify(filter) : filter)}` : ''}`
  }),
  // Register a user account with email and password.
  USERS_POST: ({ body }) => ({
    method: 'POST',
    url: `${apiEndpoint}/api/users`,
    body
  }),
  // Count instances of the model matched by where from the data source.
  USERS_GET_COUNT: ({ where }) => ({
    method: 'GET',
    url: `${apiEndpoint}/api/users/count?${where ? `where=${encodeURIComponent(typeof where === 'object' ? JSON.stringify(where) : where)}` : ''}`
  }),
  // create FCM notification
  USERS_POST_ID_FCMS: ({ id, token, appId }) => ({
    method: 'POST',
    url: `${apiEndpoint}/api/users/${id}/fcms`,
    body: { token, appId }
  }),
  // Reset password for a user with email.
  USERS_POST_RESET: ({ email }) => ({
    method: 'POST',
    url: `${apiEndpoint}/api/users/reset`,
    body: { email }
  }),
  // Login a user with email and password.
  USERS_POST_LOGIN: ({ email, password, username }) => ({
    method: 'POST',
    url: `${apiEndpoint}/api/users/login`,
    body: { email, password, username }
  }),
  // Logout a user with access token.
  USERS_POST_LOGOUT: () => ({
    method: 'POST',
    url: `${apiEndpoint}/api/users/logout`
  }),
  // Confirm a user registration with identity verification token.
  USERS_GET_CONFIRM: ({ uid, token, redirect }) => ({
    method: 'GET',
    url: `${apiEndpoint}/api/users/confirm?${uid ? `uid=${encodeURIComponent(typeof uid === 'object' ? JSON.stringify(uid) : uid)}&` : ''}${token ? `token=${encodeURIComponent(typeof token === 'object' ? JSON.stringify(token) : token)}&` : ''}${redirect ? `redirect=${encodeURIComponent(typeof redirect === 'object' ? JSON.stringify(redirect) : redirect)}` : ''}`
  }),
  // Resend confirmation email
  USERS_POST_RESEND_CONFIRM_EMAIL: ({ email }) => ({
    method: 'POST',
    url: `${apiEndpoint}/api/users/resend-confirm-email`,
    body: { email }
  }),
  // User reset his/her password
  USERS_POST_ID_CHANGE_PASSWORD: ({ id, arg }) => ({
    method: 'POST',
    url: `${apiEndpoint}/api/users/${id}/change-password`,
    body: arg
  }),
  // Check user password
  USERS_POST_ID_CHECK_PASSWORD: ({ id, password }) => ({
    method: 'POST',
    url: `${apiEndpoint}/api/users/${id}/check-password`,
    body: { password }
  }),
  // Reset user's password via a password-reset token.
  USERS_POST_RESET_PASSWORD: ({ newPassword }) => ({
    method: 'POST',
    url: `${apiEndpoint}/api/users/reset-password`,
    body: { newPassword }
  }),
  // Suspend an user account
  USERS_POST_ID_SUSPEND: ({ id, suspend }) => ({
    method: 'POST',
    url: `${apiEndpoint}/api/users/${id}/suspend`,
    body: { suspend }
  }),
  // set account password
  USERS_POST_ID_SET_PASSWORD: ({ id, password }) => ({
    method: 'POST',
    url: `${apiEndpoint}/api/users/${id}/set-password`,
    body: { password }
  }),
  // Fetches belongsTo relation broker.
  DEVICES_GET_ID_BROKER: ({ id, refresh }) => ({
    method: 'GET',
    url: `${apiEndpoint}/api/devices/${id}/broker?${refresh ? `refresh=${encodeURIComponent(typeof refresh === 'object' ? JSON.stringify(refresh) : refresh)}` : ''}`
  }),
  // Find a related item by id for systems.
  DEVICES_GET_ID_SYSTEMS_FK: ({ id, fk }) => ({
    method: 'GET',
    url: `${apiEndpoint}/api/devices/${id}/systems/${fk}`
  }),
  // Delete a related item by id for systems.
  DEVICES_DELETE_ID_SYSTEMS_FK: ({ id, fk }) => ({
    method: 'DELETE',
    url: `${apiEndpoint}/api/devices/${id}/systems/${fk}`
  }),
  // Update a related item by id for systems.
  DEVICES_PUT_ID_SYSTEMS_FK: ({ id, fk, data }) => ({
    method: 'PUT',
    url: `${apiEndpoint}/api/devices/${id}/systems/${fk}`,
    body: data
  }),
  // Fetches belongsTo relation authorizedDevice.
  DEVICES_GET_ID_AUTHORIZEDDEVICE: ({ id, refresh }) => ({
    method: 'GET',
    url: `${apiEndpoint}/api/devices/${id}/authorizedDevice?${refresh ? `refresh=${encodeURIComponent(typeof refresh === 'object' ? JSON.stringify(refresh) : refresh)}` : ''}`
  }),
  // Queries systems of Device.
  DEVICES_GET_ID_SYSTEMS: ({ id, filter }) => ({
    method: 'GET',
    url: `${apiEndpoint}/api/devices/${id}/systems?${filter ? `filter=${encodeURIComponent(typeof filter === 'object' ? JSON.stringify(filter) : filter)}` : ''}`
  }),
  // Creates a new instance in systems of this model.
  DEVICES_POST_ID_SYSTEMS: ({ id, data }) => ({
    method: 'POST',
    url: `${apiEndpoint}/api/devices/${id}/systems`,
    body: data
  }),
  // Deletes all systems of this model.
  DEVICES_DELETE_ID_SYSTEMS: ({ id }) => ({
    method: 'DELETE',
    url: `${apiEndpoint}/api/devices/${id}/systems`
  }),
  // Counts systems of Device.
  DEVICES_GET_ID_SYSTEMS_COUNT: ({ id, where }) => ({
    method: 'GET',
    url: `${apiEndpoint}/api/devices/${id}/systems/count?${where ? `where=${encodeURIComponent(typeof where === 'object' ? JSON.stringify(where) : where)}` : ''}`
  }),
  // Find a model instance by {{id}} from the data source.
  DEVICES_GET_ID: ({ id, filter }) => ({
    method: 'GET',
    url: `${apiEndpoint}/api/devices/${id}?${filter ? `filter=${encodeURIComponent(typeof filter === 'object' ? JSON.stringify(filter) : filter)}` : ''}`
  }),
  // Delete a model instance by {{id}} from the data source.
  DEVICES_DELETE_ID: ({ id }) => ({
    method: 'DELETE',
    url: `${apiEndpoint}/api/devices/${id}`
  }),
  // Find all instances of the model matched by filter from the data source.
  DEVICES_GET: ({ filter }) => ({
    method: 'GET',
    url: `${apiEndpoint}/api/devices?${filter ? `filter=${encodeURIComponent(typeof filter === 'object' ? JSON.stringify(filter) : filter)}` : ''}`
  }),
  // Count instances of the model matched by where from the data source.
  DEVICES_GET_COUNT: ({ where }) => ({
    method: 'GET',
    url: `${apiEndpoint}/api/devices/count?${where ? `where=${encodeURIComponent(typeof where === 'object' ? JSON.stringify(where) : where)}` : ''}`
  }),
  // Create device credential
  DEVICES_PUT_CREDENTIALS: ({ body }) => ({
    method: 'PUT',
    url: `${apiEndpoint}/api/devices/credentials`,
    body
  }),
  // Fetches belongsTo relation user.
  SYSTEMS_GET_ID_USER: ({ id, refresh }) => ({
    method: 'GET',
    url: `${apiEndpoint}/api/systems/${id}/user?${refresh ? `refresh=${encodeURIComponent(typeof refresh === 'object' ? JSON.stringify(refresh) : refresh)}` : ''}`
  }),
  // Fetches belongsTo relation device.
  SYSTEMS_GET_ID_DEVICE: ({ id, refresh }) => ({
    method: 'GET',
    url: `${apiEndpoint}/api/systems/${id}/device?${refresh ? `refresh=${encodeURIComponent(typeof refresh === 'object' ? JSON.stringify(refresh) : refresh)}` : ''}`
  }),
  // Find a related item by id for blocks.
  SYSTEMS_GET_ID_BLOCKS_FK: ({ id, fk }) => ({
    method: 'GET',
    url: `${apiEndpoint}/api/systems/${id}/blocks/${fk}`
  }),
  // Delete a related item by id for blocks.
  SYSTEMS_DELETE_ID_BLOCKS_FK: ({ id, fk }) => ({
    method: 'DELETE',
    url: `${apiEndpoint}/api/systems/${id}/blocks/${fk}`
  }),
  // Update a related item by id for blocks.
  SYSTEMS_PUT_ID_BLOCKS_FK: ({ id, fk, data }) => ({
    method: 'PUT',
    url: `${apiEndpoint}/api/systems/${id}/blocks/${fk}`,
    body: data
  }),
  // get blocks data
  SYSTEMS_GET_ID_BLOCKS: ({ id }) => ({
    method: 'GET',
    url: `${apiEndpoint}/api/systems/${id}/blocks`
  }),
  // Creates a new instance in blocks of this model.
  SYSTEMS_POST_ID_BLOCKS: ({ id, data }) => ({
    method: 'POST',
    url: `${apiEndpoint}/api/systems/${id}/blocks`,
    body: data
  }),
  // Counts blocks of System.
  SYSTEMS_GET_ID_BLOCKS_COUNT: ({ id, where }) => ({
    method: 'GET',
    url: `${apiEndpoint}/api/systems/${id}/blocks/count?${where ? `where=${encodeURIComponent(typeof where === 'object' ? JSON.stringify(where) : where)}` : ''}`
  }),
  // Create a new instance of the model and persist it into the data source.
  SYSTEMS_POST: ({ data }) => ({
    method: 'POST',
    url: `${apiEndpoint}/api/systems`,
    body: data
  }),
  // Find all instances of the model matched by filter from the data source.
  SYSTEMS_GET: ({ filter }) => ({
    method: 'GET',
    url: `${apiEndpoint}/api/systems?${filter ? `filter=${encodeURIComponent(typeof filter === 'object' ? JSON.stringify(filter) : filter)}` : ''}`
  }),
  // Find a model instance by {{id}} from the data source.
  SYSTEMS_GET_ID: ({ id, filter }) => ({
    method: 'GET',
    url: `${apiEndpoint}/api/systems/${id}?${filter ? `filter=${encodeURIComponent(typeof filter === 'object' ? JSON.stringify(filter) : filter)}` : ''}`
  }),
  // Delete a model instance by {{id}} from the data source.
  SYSTEMS_DELETE_ID: ({ id }) => ({
    method: 'DELETE',
    url: `${apiEndpoint}/api/systems/${id}`
  }),
  // Count instances of the model matched by where from the data source.
  SYSTEMS_GET_COUNT: ({ where }) => ({
    method: 'GET',
    url: `${apiEndpoint}/api/systems/count?${where ? `where=${encodeURIComponent(typeof where === 'object' ? JSON.stringify(where) : where)}` : ''}`
  }),
  // get timeserial data
  SYSTEMS_GET_ID_TSDATA: ({ id, start, end, macAddress, unitId, stringId, type, limit }) => ({
    method: 'GET',
    url: `${apiEndpoint}/api/systems/${id}/tsdata?${start ? `start=${encodeURIComponent(typeof start === 'object' ? JSON.stringify(start) : start)}&` : ''}${end ? `end=${encodeURIComponent(typeof end === 'object' ? JSON.stringify(end) : end)}&` : ''}${macAddress ? `macAddress=${encodeURIComponent(typeof macAddress === 'object' ? JSON.stringify(macAddress) : macAddress)}&` : ''}${unitId ? `unitId=${encodeURIComponent(typeof unitId === 'object' ? JSON.stringify(unitId) : unitId)}&` : ''}${stringId ? `stringId=${encodeURIComponent(typeof stringId === 'object' ? JSON.stringify(stringId) : stringId)}&` : ''}${type ? `type=${encodeURIComponent(typeof type === 'object' ? JSON.stringify(type) : type)}&` : ''}${limit ? `limit=${encodeURIComponent(typeof limit === 'object' ? JSON.stringify(limit) : limit)}` : ''}`
  }),
  // get events data
  SYSTEMS_GET_ID_EVENTS: ({ id, start, end, macAddress, unitId, stringId, priority, limit, isAsc }) => ({
    method: 'GET',
    url: `${apiEndpoint}/api/systems/${id}/events?${start ? `start=${encodeURIComponent(typeof start === 'object' ? JSON.stringify(start) : start)}&` : ''}${end ? `end=${encodeURIComponent(typeof end === 'object' ? JSON.stringify(end) : end)}&` : ''}${macAddress ? `macAddress=${encodeURIComponent(typeof macAddress === 'object' ? JSON.stringify(macAddress) : macAddress)}&` : ''}${unitId ? `unitId=${encodeURIComponent(typeof unitId === 'object' ? JSON.stringify(unitId) : unitId)}&` : ''}${stringId ? `stringId=${encodeURIComponent(typeof stringId === 'object' ? JSON.stringify(stringId) : stringId)}&` : ''}${priority ? `priority=${encodeURIComponent(typeof priority === 'object' ? JSON.stringify(priority) : priority)}&` : ''}${limit ? `limit=${encodeURIComponent(typeof limit === 'object' ? JSON.stringify(limit) : limit)}&` : ''}${isAsc ? `isAsc=${encodeURIComponent(typeof isAsc === 'object' ? JSON.stringify(isAsc) : isAsc)}` : ''}`
  }),
  // get system alertChart
  SYSTEMS_GET_ALERTCHART: () => ({
    method: 'GET',
    url: `${apiEndpoint}/api/systems/alertChart`
  }),
  // get system alertStats
  SYSTEMS_GET_ALERTSTATS: () => ({
    method: 'GET',
    url: `${apiEndpoint}/api/systems/alertStats`
  }),
  // get system stats
  SYSTEMS_GET_STATS: () => ({
    method: 'GET',
    url: `${apiEndpoint}/api/systems/stats`
  }),
  // Fetches belongsTo relation system.
  BLOCKS_GET_ID_SYSTEM: ({ id, refresh }) => ({
    method: 'GET',
    url: `${apiEndpoint}/api/blocks/${id}/system?${refresh ? `refresh=${encodeURIComponent(typeof refresh === 'object' ? JSON.stringify(refresh) : refresh)}` : ''}`
  }),
  // Create a new instance of the model and persist it into the data source.
  BLOCKS_POST: ({ data }) => ({
    method: 'POST',
    url: `${apiEndpoint}/api/blocks`,
    body: data
  }),
  // Patch an existing model instance or insert a new one into the data source.
  BLOCKS_PATCH: ({ data }) => ({
    method: 'PATCH',
    url: `${apiEndpoint}/api/blocks`,
    body: data
  }),
  // Replace an existing model instance or insert a new one into the data source.
  BLOCKS_PUT: ({ data }) => ({
    method: 'PUT',
    url: `${apiEndpoint}/api/blocks`,
    body: data
  }),
  // Find all instances of the model matched by filter from the data source.
  BLOCKS_GET: ({ filter }) => ({
    method: 'GET',
    url: `${apiEndpoint}/api/blocks?${filter ? `filter=${encodeURIComponent(typeof filter === 'object' ? JSON.stringify(filter) : filter)}` : ''}`
  }),
  // Replace an existing model instance or insert a new one into the data source.
  BLOCKS_POST_REPLACEORCREATE: ({ data }) => ({
    method: 'POST',
    url: `${apiEndpoint}/api/blocks/replaceOrCreate`,
    body: data
  }),
  // Update an existing model instance or insert a new one into the data source based on the where criteria.
  BLOCKS_POST_UPSERTWITHWHERE: ({ where, data }) => ({
    method: 'POST',
    url: `${apiEndpoint}/api/blocks/upsertWithWhere?${where ? `where=${encodeURIComponent(typeof where === 'object' ? JSON.stringify(where) : where)}` : ''}`,
    body: data
  }),
  // Check whether a model instance exists in the data source.
  BLOCKS_GET_ID_EXISTS: ({ id }) => ({
    method: 'GET',
    url: `${apiEndpoint}/api/blocks/${id}/exists`
  }),
  // Check whether a model instance exists in the data source.
  BLOCKS_HEAD_ID: ({ id }) => ({
    method: 'HEAD',
    url: `${apiEndpoint}/api/blocks/${id}`
  }),
  // Find a model instance by {{id}} from the data source.
  BLOCKS_GET_ID: ({ id, filter }) => ({
    method: 'GET',
    url: `${apiEndpoint}/api/blocks/${id}?${filter ? `filter=${encodeURIComponent(typeof filter === 'object' ? JSON.stringify(filter) : filter)}` : ''}`
  }),
  // Replace attributes for a model instance and persist it into the data source.
  BLOCKS_PUT_ID: ({ id, data }) => ({
    method: 'PUT',
    url: `${apiEndpoint}/api/blocks/${id}`,
    body: data
  }),
  // Delete a model instance by {{id}} from the data source.
  BLOCKS_DELETE_ID: ({ id }) => ({
    method: 'DELETE',
    url: `${apiEndpoint}/api/blocks/${id}`
  }),
  // Patch attributes for a model instance and persist it into the data source.
  BLOCKS_PATCH_ID: ({ id, data }) => ({
    method: 'PATCH',
    url: `${apiEndpoint}/api/blocks/${id}`,
    body: data
  }),
  // Replace attributes for a model instance and persist it into the data source.
  BLOCKS_POST_ID_REPLACE: ({ id, data }) => ({
    method: 'POST',
    url: `${apiEndpoint}/api/blocks/${id}/replace`,
    body: data
  }),
  // Find first instance of the model matched by filter from the data source.
  BLOCKS_GET_FINDONE: ({ filter }) => ({
    method: 'GET',
    url: `${apiEndpoint}/api/blocks/findOne?${filter ? `filter=${encodeURIComponent(typeof filter === 'object' ? JSON.stringify(filter) : filter)}` : ''}`
  }),
  // Update instances of the model matched by {{where}} from the data source.
  BLOCKS_POST_UPDATE: ({ where, data }) => ({
    method: 'POST',
    url: `${apiEndpoint}/api/blocks/update?${where ? `where=${encodeURIComponent(typeof where === 'object' ? JSON.stringify(where) : where)}` : ''}`,
    body: data
  }),
  // Count instances of the model matched by where from the data source.
  BLOCKS_GET_COUNT: ({ where }) => ({
    method: 'GET',
    url: `${apiEndpoint}/api/blocks/count?${where ? `where=${encodeURIComponent(typeof where === 'object' ? JSON.stringify(where) : where)}` : ''}`
  }),
  // Create a change stream.
  BLOCKS_POST_CHANGE_STREAM: ({ options }) => ({
    method: 'POST',
    url: `${apiEndpoint}/api/blocks/change-stream`,
    body: { options }
  }),
  // Create a change stream.
  BLOCKS_GET_CHANGE_STREAM: ({ options }) => ({
    method: 'GET',
    url: `${apiEndpoint}/api/blocks/change-stream?${options ? `options=${encodeURIComponent(typeof options === 'object' ? JSON.stringify(options) : options)}` : ''}`
  }),
  // Fetches belongsTo relation user.
  AUTHORIZEDDEVICES_GET_ID_USER: ({ id, refresh }) => ({
    method: 'GET',
    url: `${apiEndpoint}/api/authorizeddevices/${id}/user?${refresh ? `refresh=${encodeURIComponent(typeof refresh === 'object' ? JSON.stringify(refresh) : refresh)}` : ''}`
  }),
  // Find a related item by id for devices.
  AUTHORIZEDDEVICES_GET_ID_DEVICES_FK: ({ id, fk }) => ({
    method: 'GET',
    url: `${apiEndpoint}/api/authorizeddevices/${id}/devices/${fk}`
  }),
  // Delete a related item by id for devices.
  AUTHORIZEDDEVICES_DELETE_ID_DEVICES_FK: ({ id, fk }) => ({
    method: 'DELETE',
    url: `${apiEndpoint}/api/authorizeddevices/${id}/devices/${fk}`
  }),
  // Update a related item by id for devices.
  AUTHORIZEDDEVICES_PUT_ID_DEVICES_FK: ({ id, fk, data }) => ({
    method: 'PUT',
    url: `${apiEndpoint}/api/authorizeddevices/${id}/devices/${fk}`,
    body: data
  }),
  // Queries devices of AuthorizedDevice.
  AUTHORIZEDDEVICES_GET_ID_DEVICES: ({ id, filter }) => ({
    method: 'GET',
    url: `${apiEndpoint}/api/authorizeddevices/${id}/devices?${filter ? `filter=${encodeURIComponent(typeof filter === 'object' ? JSON.stringify(filter) : filter)}` : ''}`
  }),
  // Creates a new instance in devices of this model.
  AUTHORIZEDDEVICES_POST_ID_DEVICES: ({ id, data }) => ({
    method: 'POST',
    url: `${apiEndpoint}/api/authorizeddevices/${id}/devices`,
    body: data
  }),
  // Deletes all devices of this model.
  AUTHORIZEDDEVICES_DELETE_ID_DEVICES: ({ id }) => ({
    method: 'DELETE',
    url: `${apiEndpoint}/api/authorizeddevices/${id}/devices`
  }),
  // Counts devices of AuthorizedDevice.
  AUTHORIZEDDEVICES_GET_ID_DEVICES_COUNT: ({ id, where }) => ({
    method: 'GET',
    url: `${apiEndpoint}/api/authorizeddevices/${id}/devices/count?${where ? `where=${encodeURIComponent(typeof where === 'object' ? JSON.stringify(where) : where)}` : ''}`
  }),
  // Find a model instance by {{id}} from the data source.
  AUTHORIZEDDEVICES_GET_ID: ({ id, filter }) => ({
    method: 'GET',
    url: `${apiEndpoint}/api/authorizeddevices/${id}?${filter ? `filter=${encodeURIComponent(typeof filter === 'object' ? JSON.stringify(filter) : filter)}` : ''}`
  }),
  // Delete a model instance by {{id}} from the data source.
  AUTHORIZEDDEVICES_DELETE_ID: ({ id }) => ({
    method: 'DELETE',
    url: `${apiEndpoint}/api/authorizeddevices/${id}`
  }),
  // Find all instances of the model matched by filter from the data source.
  AUTHORIZEDDEVICES_GET: ({ filter }) => ({
    method: 'GET',
    url: `${apiEndpoint}/api/authorizeddevices?${filter ? `filter=${encodeURIComponent(typeof filter === 'object' ? JSON.stringify(filter) : filter)}` : ''}`
  }),
  // batch create or update authorized device
  AUTHORIZEDDEVICES_PUT: ({ body }) => ({
    method: 'PUT',
    url: `${apiEndpoint}/api/authorizeddevices`,
    body
  }),
  // batch delete authorized devices
  AUTHORIZEDDEVICES_DELETE: ({ deviceIds }) => ({
    method: 'DELETE',
    url: `${apiEndpoint}/api/authorizeddevices`
  }),
  // Count instances of the model matched by where from the data source.
  AUTHORIZEDDEVICES_GET_COUNT: ({ where }) => ({
    method: 'GET',
    url: `${apiEndpoint}/api/authorizeddevices/count?${where ? `where=${encodeURIComponent(typeof where === 'object' ? JSON.stringify(where) : where)}` : ''}`
  }),
  // attach/remove a device to a client
  AUTHORIZEDDEVICES_PUT_ID_ATTACH_DEVICE: ({ id, body }) => ({
    method: 'PUT',
    url: `${apiEndpoint}/api/authorizeddevices/${id}/attach-device`,
    body
  }),
  // undefined
  CONTAINERS_GET: () => ({
    method: 'GET',
    url: `${apiEndpoint}/api/Containers`
  }),
  // undefined
  CONTAINERS_POST: ({ options }) => ({
    method: 'POST',
    url: `${apiEndpoint}/api/Containers`
  }),
  // undefined
  CONTAINERS_DELETE_CONTAINER: ({ container }) => ({
    method: 'DELETE',
    url: `${apiEndpoint}/api/Containers/${container}`
  }),
  // undefined
  CONTAINERS_GET_CONTAINER: ({ container }) => ({
    method: 'GET',
    url: `${apiEndpoint}/api/Containers/${container}`
  }),
  // undefined
  CONTAINERS_GET_CONTAINER_FILES: ({ container }) => ({
    method: 'GET',
    url: `${apiEndpoint}/api/Containers/${container}/files`
  }),
  // undefined
  CONTAINERS_GET_CONTAINER_FILES_FILE: ({ container, file }) => ({
    method: 'GET',
    url: `${apiEndpoint}/api/Containers/${container}/files/${file}`
  }),
  // undefined
  CONTAINERS_DELETE_CONTAINER_FILES_FILE: ({ container, file }) => ({
    method: 'DELETE',
    url: `${apiEndpoint}/api/Containers/${container}/files/${file}`
  }),
  // undefined
  CONTAINERS_POST_CONTAINER_UPLOAD: ({ container }) => ({
    method: 'POST',
    url: `${apiEndpoint}/api/Containers/${container}/upload`
  }),
  // undefined
  CONTAINERS_GET_CONTAINER_DOWNLOAD_FILE: ({ container, file }) => ({
    method: 'GET',
    url: `${apiEndpoint}/api/Containers/${container}/download/${file}`
  }),
  // Find all instances of the model matched by filter from the data source.
  EVENTS_GET: ({ filter }) => ({
    method: 'GET',
    url: `${apiEndpoint}/api/events?${filter ? `filter=${encodeURIComponent(typeof filter === 'object' ? JSON.stringify(filter) : filter)}` : ''}`
  }),
  // Count instances of the model matched by where from the data source.
  EVENTS_GET_COUNT: ({ where }) => ({
    method: 'GET',
    url: `${apiEndpoint}/api/events/count?${where ? `where=${encodeURIComponent(typeof where === 'object' ? JSON.stringify(where) : where)}` : ''}`
  }),
  // batch update read/unread notification
  EVENTS_POST_READS: ({ body }) => ({
    method: 'POST',
    url: `${apiEndpoint}/api/events/reads`,
    body
  }),
}
