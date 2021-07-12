import { TIME_FORMAT } from 'constant'
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { withRouter, useParams } from 'react-router-dom'
import style from './style.module.scss'
import { List } from 'antd'

const mapStateToProps = ({ system, dispatch }) => {
  const { loading, detail, histories = [] } = system

  return { loading, detail, histories, dispatch }
}

const DefaultPage = ({ loading, detail, histories, dispatch }) => {
  const { id } = useParams()
  let total = histories.length
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
    // showTotal: (total, range) => `${range[0]}-${range[1]} trên ${total} tài khoản`,
  })
  const onListChange = (pagination) => {
    setPagination(pagination)
  }
  useEffect(() => {
    dispatch({
      type: 'system/HISTORY',
      payload: {
        id,
        start: 1,
        end: Math.floor(Date.now() / 1000),
        priority: [3],
        limit: 1000,
        isAsc: false,
      },
    })
  }, [id, dispatch])

  useEffect(() => {
    if (total !== pagination.total) {
      setPagination({ ...pagination, total })
    }
  }, [total, pagination, setPagination])

  return (
    <div>
      <List
        grid={{ gutter: 0, column: 1 }}
        rowKey={(x) => x.id}
        dataSource={histories}
        pagination={{ ...pagination, showSizeChanger: true, onChange: onListChange }}
        onChange={onListChange}
        renderItem={({type, title, body, timestamp}) => {
          return (
            <div key={timestamp} className={style.item}>
              <div className="d-flex my-3">
                <div className={`${style.itemTime} mr-3`}>
                  {moment(timestamp).format(TIME_FORMAT)}
                </div>
                <div className={style.itemSeparator}>
                  <div
                    className={`${style.donut} ${type === 'OFFLINE' ? style.danger : ''} mr-3`}
                  />
                </div>
                <div>{title || body}</div>
              </div>
            </div>
          )
        }}
      />
    </div>
  )
}

export default withRouter(connect(mapStateToProps)(DefaultPage))
