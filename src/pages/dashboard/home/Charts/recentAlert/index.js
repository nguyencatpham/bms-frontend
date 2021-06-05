import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import moment from 'moment'
import style from './style.module.scss'
import { TIME_FORMAT } from 'constant'

const mapStateToProps = ({ user, event, dispatch }) => {
  const { list = [] } = event
  return { list, user, dispatch }
}

const DefaultPage = ({ list, dispatch }) => {
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
            timestamp: { between: [start, end] }
          },
          order: ['timestamp DESC']
        })
      }
    })
  }, [dispatch])

  const components = list.map(x => {
    switch (x.priority) {
      case 1:
        return (
          <li key={x.id} className={style.item}>
            <div className={`${style.itemLink} ${style.alert}`}>
              {/* <div className={`${style.itemCover} ${style.alertIcon} mr-3`}>
              </div> */}
              <div>
                <div>
                  <h4 className={`${style.title} `}><img src='/resources/images/alert.png' width='40px' />{x.title}</h4>
                  <p>{x.body}</p>
                  <p>{moment(x.timestamp).format(TIME_FORMAT)}</p>
                </div>
              </div>
            </div>
          </li>
        )
      case 2:
        return (
          <li className={style.item}>
            <div className={`${style.itemLink} ${style.warning}`}>
              <div className={`${style.itemCover} ${style.alertIcon} mr-3`}>
                <img src='/resources/images/warning.png' alt='Hands' width='40px' />
              </div>
              <div>
                <div className={`${style.title} `}>{x.title}</div>
                <div>
                  {`${x.body} vào lúc ${moment(x.timestamp).format(TIME_FORMAT)}`}
                </div>
              </div>
            </div>
          </li>
        )
      case 0:
      default:
        return (
          <li key={x.deviceId} className=''>
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
