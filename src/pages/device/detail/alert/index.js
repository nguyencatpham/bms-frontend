import { TIME_FORMAT } from 'constant'
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { withRouter, useParams } from 'react-router-dom'
import style from './style.module.scss'

const mapStateToProps = ({ system, dispatch }) => {
  const { loading, detail, histories = [] } = system

  return { loading, detail, histories, dispatch }
}

const DefaultPage = ({ loading, detail, histories, dispatch }) => {
  const { id } = useParams()
  useEffect(() => {
    dispatch({
      type: 'system/HISTORY',
      payload: {
        id,
        start: 1,
        end: Math.floor(Date.now() / 1000),
        // macAddress,
        // unitId,
        // stringId,
        priority: [2],
        limit: 1000,
        isAsc: false
      }
    })
  }, [id, dispatch])
  return (
    <ul className='list-unstyled'>
      {
        histories.map(({ type, title, body, macAddress, timestamp }) => (
          <li key={timestamp} className={style.item}>
            <div className={`${style.itemTime} mr-3`}>{moment(timestamp).format(TIME_FORMAT)}</div>
            <div className={style.itemSeparator}>
              <div className={`${style.donut} ${style.danger} mr-3`} />
            </div>
            <div>
              <h5 style={{ color: '#5f6294' }}>{title}</h5>
              <p>Block {macAddress} - {body}</p>
            </div>
          </li>
        ))
      }
    </ul>
  )
}

export default withRouter(connect(mapStateToProps)(DefaultPage))
