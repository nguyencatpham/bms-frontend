import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Pagination } from 'antd'
import config from 'config/config'

const mapStateToProps = ({ block, user, dispatch }) => {
  let { loading, hasAlertList: list = [], hasAlertTotal: total } = block
  if (typeof total === 'object') {
    total = total.count
  }
  const include = []
  // const { role } = user
  // if (role !== 'admin') {
  //   include = {
  //     relation: 'system',
  //     scope: {
  //       where: { userId: user.id }
  //     }
  //   }
  // }
  list = list.map((item, index) => ({
    ...item,
    index: index + 1
  }))

  return { list, loading, total, include, dispatch }
}

const DefaultPage = ({ total = 0, list, loading, setBlockState, systemId, include, dispatch }) => {
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 24,
    total,
    showTotal: (total, range) => `${range[0]}-${range[1]} trên ${total} thiết bị`
  })
  const [payload, setPayload] = useState({
    filter: JSON.stringify({
      skip: (pagination.current - 1) * pagination.pageSize,
      limit: pagination.pageSize,
      include,
      where: {
        systemId,
        alertType: { inq: [1, 2, 3] }
      },
      order: ['alertType DESC', 'id ASC']
    })
  })
  const getColor = (type) => {
    switch (type) {
      case 1:
        return config.COLOR.alert
      case 2:
        return config.COLOR.warning
      default:
        return config.COLOR.offline
    }
  }
  useEffect(() => {
    if (total !== pagination.total) {
      setPagination({ ...pagination, total })
    }
  }, [total, pagination, setPagination])

  useEffect(() => {
    dispatch({
      type: 'block/HAS_ALERT_COUNT',
      payload: { where: (JSON.parse(payload.filter) || {}).where }
    })
    dispatch({
      type: 'block/HAS_ALERT_LIST',
      payload
    })
  }, [payload])
  useEffect(() => {
    const filter = JSON.parse(payload.filter)
    if (filter.where.systemId !== systemId) {
      setPayload({
        filter: JSON.stringify({
          ...filter,
          where: {
            systemId,
            alertType: { inq: [1, 2, 3] }
          }
        })
      })
    }
  }, [systemId])
  function changePage (current) {
    const filter = JSON.parse(payload.filter)
    setPagination({ ...pagination, current })
    setPayload({
      filter: JSON.stringify({
        ...filter,
        skip: (current - 1) * pagination.pageSize
      })
    })
  }
  // polling
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     dispatch({
  //       type: 'block/COUNT',
  //       payload: { where: (JSON.parse(payload.filter) || {}).where }
  //     })
  //     dispatch({
  //       type: 'block/LIST',
  //       payload
  //     })
  //   }, 10000)
  //   return () => clearInterval(interval)
  // }, [payload, dispatch])
  return (
    <>
      <div className='card' style={{ minHeight: '270px' }}>
        <div className='card-body battery-cell-panel'>
          {list.map(x => (
            <>
              <div
                key={`${x.index}${x.id}`}
                className='card cell-item'
                onClick={() => setBlockState(x)}
                style={{ cursor: 'pointer' }}
              >
                <div style={{ backgroundColor: getColor(x.alertType), color: 'white' }} className='card-body'>{x.index}</div>
              </div>
            </>
          ))}
        </div>
        <Pagination className='battery-pagination' {...pagination} onChange={changePage} />
      </div>
    </>
  )
}

export default withRouter(connect(mapStateToProps)(DefaultPage))
