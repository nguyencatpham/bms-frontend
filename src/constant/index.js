import moment from 'moment'
export const HOCHIMINH_CENTER = [10.7682231, 106.7045727]
export const TIME_FORMAT = 'DD/MM/YYYY HH:mm'
export const TIME_ONLY_FORMAT = 'HH:mm'
export const DATE_FORMAT = 'DD/MM/YYYY'
export const SHORT_DATE_FORMAT = 'DD/MM HH:mm'

export const ROLE = {
  admin: 'Quản trị viên', // Tất cả
  manager: 'Khách hàng', // Thông tin General/Monitor/Chart/Events
  operator: 'Nhân viên' // Thông tin General/Monitor/Chart/Events
}
export const ROLE_OLD = {
  ADMIN: 'Quản trị viên', // Tất cả
  SA: 'Quản trị hệ thống', // Tất cả trong System có thẩm quyền
  UA: 'Quản trị Unit', // Tất cả trong Unit có thẩm quyền
  GA: 'Quản trị nhóm', // Tất cả trong Group của Sytem có thẩm quyền
  SU: 'Người dùng hệ thống', // Thông tin General/Monitor/Chart/Events
  UU: 'Người dùng Unit', // Thông tin General/Monitor/Chart/Events
  GU: 'Người dùng nhóm' // Thông tin General/Monitor/Chart/Events
}
export const ALERT_TYPE = {
  rUpper: 'RESISTANCE_OVER',
  vUpper: 'FLOATING_VOLTAGE_OVER',
  vLower: 'FLOATING_VOLTAGE_LOWER',
  eUpper: 'OPEN_VOLTAGE_OVER',
  eLower: 'OPEN_VOLTAGE_LOWER',
  tUpper: 'TEMPERATURE_OVER',
  tLower: 'TEMPERATURE_LOWER',
  offline: 'OFFLINE'
}
export function getBlockColor (block = {}) {
  const blue = '#017efa'
  const yellow = '#fff038'
  const orange = '#f97627'
  const pinkRed = '#f64647'
  const brown = '#865439'

  if (block.rUpper) {
    return brown
  }
  if (block.vUpper) {
    return orange
  }
  if (block.eLower) {
    return yellow
  }
  if (block.tUpper) {
    return pinkRed
  }
  return blue
}
export function getBlockAlertColorByType (type) {
  switch (type) {
    case ALERT_TYPE.rUpper:
      return getBlockColor({ rUpper: true })
    case ALERT_TYPE.vUpper:
      return getBlockColor({ vUpper: true })
    case ALERT_TYPE.vLower:
      return getBlockColor({ vLower: true })
    case ALERT_TYPE.eUpper:
      return getBlockColor({ eUpper: true })
    case ALERT_TYPE.eLower:
      return getBlockColor({ eLower: true })
    case ALERT_TYPE.tUpper:
      return getBlockColor({ tUpper: true })
    case ALERT_TYPE.tLower:
      return getBlockColor({ tLower: true })
    case ALERT_TYPE.offline :
      return getBlockColor({ offline: true })
    default:
      break
  }
}
export const DATE_PICKER_OPTIONS = {
  opens: 'center',
  drops: 'down',
  timePicker: true,
  minYear: 2000,
  maxYear: 2038,
  maxSpan: {
    days: 7
  },
  // minDate: 1,
  maxDate: moment().endOf('day'),
  locale: {
    format: TIME_FORMAT,
    separator: ' - ',
    applyLabel: 'Chọn',
    cancelLabel: 'Hủy',
    fromLabel: 'Từ',
    toLabel: 'Đến',
    customRangeLabel: 'Tùy chọn',
    daysOfWeek: [
      'CN',
      'Hai',
      'Ba',
      'Tư',
      'Năm',
      'Sáu',
      'Báy'
    ],
    monthNames: [
      'Tháng 1',
      'Tháng 2',
      'Tháng 3',
      'Tháng 4',
      'Tháng 5',
      'Tháng 6',
      'Tháng 7',
      'Tháng 8',
      'Tháng 9',
      'Tháng 10',
      'Tháng 11',
      'Tháng 12'
    ],
    firstDay: 1
  }
}
