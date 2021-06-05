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

const DefaultPage = ({ list, loading, total, setBlockState, dispatch }) => {
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 16,
    total: 0,
    showTotal: (total, range) => `${range[0]}-${range[1]} trên ${total} thiết bị`
  })
  const [payload] = useState({
    filter: JSON.stringify({
      skip: (pagination.current - 1) * pagination.pageSize,
      limit: pagination.pageSize,
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
        return config.COLOR.normal
    }
  }
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
      <div className='card'>
        <div className='card-body battery-cell-panel'>
          {list.map(x => (
            <div
              key={x.id + x.macAddress}
              className='card cell-item'
              onClick={() => setBlockState(x)}
              style={{ background: getColor(x.alertType), cursor: 'pointer' }}
            >
              <div style={{ color: 'white' }} className='card-body'>{x.id}</div>
            </div>
          ))}
        </div>
        <Pagination className='battery-pagination' {...pagination} />
      </div>
    </>
  )
}

export default withRouter(connect(mapStateToProps)(DefaultPage))
