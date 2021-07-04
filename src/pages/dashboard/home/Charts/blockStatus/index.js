import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Pagination } from 'antd'
import config from 'config/config'

const mapStateToProps = ({ block, dispatch }) => {
  let { list, loading, total } = block
  if (typeof total === 'object') {
    total = total.count
  }

  return { list, loading, total, dispatch }
}

const DefaultPage = ({ total = 0, list, loading, setBlockState, systemId, dispatch }) => {
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
      where: {
        systemId,
        alertType: 0
      },
      order: ['alertType DESC', 'id ASC']
    })
  })
  useEffect(() => {
    if (total !== pagination.total) {
      setPagination({ ...pagination, total })
    }
  }, [total, pagination, setPagination])

  useEffect(() => {
    dispatch({
      type: 'block/COUNT',
      payload: { where: (JSON.parse(payload.filter) || {}).where }
    })
    dispatch({
      type: 'block/LIST',
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
            alertType: 0
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
            <div
              key={x.id + x.macAddress}
              className='card cell-item'
              onClick={() => setBlockState(x)}
              style={{ cursor: 'pointer' }}
            >
              <div style={{ backgroundColor: config.COLOR.normal, color: 'white' }} className='card-body'>{x.id}</div>
            </div>
          ))}
        </div>
        <Pagination className='battery-pagination' {...pagination} onChange={changePage} />
      </div>
    </>
  )
}

export default withRouter(connect(mapStateToProps)(DefaultPage))
