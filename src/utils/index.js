import moment from 'moment'
// range 1 day => timebucket: 1 hour ~ 24 point
// range 2 day => timebucket: 2 hour ~ 24 point
// range 3 day => timebucket: 2 hour ~ 36 point
// range 4 day => timebucket: 4 hour ~ 24 point
// range 5 day => timebucket: 4 hour ~ 30 point
// range 6 day => timebucket: 4 hour ~ 36 point
// range over 7 day => timebucket: 5 hour ~ 34 point
export const calTimeBucket = ({ start, end }) => {
  const duration = moment.duration(end.diff(start))
  const days = duration.asDays()
  switch (days) {
    case 0:
    case 1:
      return '1 hour'
    case 2:
    case 3:
      return '2 hours'
    case 4:
    case 5:
    case 6:
      return '4 hours'
    default:
      return '5 hours'
  }
}

export default { calTimeBucket }
