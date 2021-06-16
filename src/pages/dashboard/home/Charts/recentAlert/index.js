import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import moment from 'moment'

const mapStateToProps = ({ user, event, dispatch }) => {
  const { list = [] } = event
  return { list, user, dispatch }
}

const DefaultPage = ({ list, systemId, priority, dispatch }) => {
  useEffect(() => {
    const start = moment().add('-7', 'days').toISOString()
    const end = moment().toISOString()
    dispatch({
      type: 'event/LIST',
      payload: {
        filter: JSON.stringify({
          skip: 0,
          limit: 10,
          where: {
            timestamp: { between: [start, end] },
            systemId,
            priority
          },
          order: ['timestamp DESC']
        })
      }
    })
  }, [systemId, priority, dispatch])
  console.log(list)
  const components = list.map((x, i) => {
    switch (x.priority) {
      case 1:
        return (
          <li key={i} className=''>
            <div className='dashboard-event'>
              <div className='card' style={{ marginBottom: 10, backgroundColor: '#f773754f' }}>
                <div className='card-body' style={{ padding: '10px' }}>
                  <img src='/resources/images/alert.png' width='20px' /><span> Hệ thống <strong> {(x.metadata || {}).name}</strong>  cảnh báo <strong className='text-red'>{x.body}</strong></span>
                  <div className='time-ago'>{moment(x.timestamp).locale('vi').fromNow()}</div>
                </div>
              </div>
            </div>
          </li>
        )
      case 2:
        return (
          <li key={i} className=''>
            <div className='dashboard-event'>
              <div className='card' style={{ marginBottom: 10, backgroundColor: 'antiquewhite' }}>
                <div className='card-body' style={{ padding: '10px' }}>
                  <img src='/resources/images/alert.png' width='20px' /><span> Hệ thống <strong> {(x.metadata || {}).name}</strong>  cảnh báo <strong className='text-red'>{x.body}</strong></span>
                  <div className='time-ago'>{moment(x.timestamp).locale('vi').fromNow()}</div>
                </div>
              </div>
            </div>
          </li>
        )
      case 3:
        return (
          <li key={i} className=''>
            <div className='dashboard-event'>
              <div className='card' style={{ marginBottom: 10, backgroundColor: 'antiquewhite' }}>
                <div className='card-body' style={{ padding: '10px' }}>
                  <img src='/resources/images/alert.png' width='20px' /><span> Hệ thống <strong> {(x.metadata || {}).name}</strong>  cảnh báo <strong className='text-red'>{x.body}</strong></span>
                  <div className='time-ago'>{moment(x.timestamp).locale('vi').fromNow()}</div>
                </div>
              </div>
            </div>
          </li>
        )
      case 0:
      default:
        return (
          <li key={i} className=''>
            <div className='dashboard-event'>
              <div className='card' style={{ marginBottom: 10, backgroundColor: '#b5aea5' }}>
                <div className='card-body' style={{ padding: '10px' }}>
                  <img src='/resources/images/alert.png' width='20px' /><span> Hệ thống <strong> {(x.metadata || {}).name}</strong>  cảnh báo <strong className='text-red'>{x.body}</strong></span>
                  <div className='time-ago'>{moment(x.timestamp).locale('vi').fromNow()}</div>
                </div>
              </div>
            </div>
          </li>
        )
    }
  })
  return (
    <ul className='list-unstyled' style={{ marginBottom: 0 }}>
      {components}
      {!components.length && 'Không có cảnh báo gần đây.'}
    </ul>
  )
}
export default withRouter(connect(mapStateToProps)(DefaultPage))
