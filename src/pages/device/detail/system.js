import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { withRouter, useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import General from 'components/kit/widgets/General/10v1'
import InfoModal from './info'
import { Pagination, List } from 'antd'

import '../style.scss'

const mapStateToProps = ({ system, dispatch }) => {
  const { list, loading, total, blocks = [] } = system
  return { list, loading, total, blocks, dispatch }
}
const DefaultPage = ({ blocks, dispatch, list }) => {
  let total = blocks.length
  const [modal, setModal] = useState()
  const { id } = useParams()
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 20,
    total: 0,
    // showTotal: (total, range) => `${range[0]}-${range[1]} trên ${total} tài khoản`,
  })
  const onListChange = (pagination) => {
    setPagination(pagination)
  }

  useEffect(() => {
    dispatch({
      type: 'system/GET_BLOCKS',
      payload: {
        id,
      },
    })
  }, [id, dispatch])
  // polling
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch({
        type: 'system/GET_BLOCKS',
        payload: {
          id,
        },
      })
    }, 10000)
    return () => clearInterval(interval)
  }, [id, dispatch])

  useEffect(() => {
    if (total !== pagination.total) {
      setPagination({ ...pagination, total })
    }
  }, [total, pagination, setPagination])

  return (
    <>
      <div className="chart">
        <Helmet title="Quản lý hệ thống" />
        <List
          grid={{gutter: 0, column: 5}}
          rowKey={(x) => x.id}
          dataSource={blocks}
          pagination={{ ...pagination, showSizeChanger: true, onChange: onListChange }}
          onChange={onListChange}
          renderItem={(x) => {
            let avatar = '/resources/images/battery-icon.png'
            if (x.alertType === 1) {
              avatar = '/resources/images/battery-icon-red.png'
            } else if (x.alertType === 2) {
              avatar = '/resources/images/battery-icon-yellow.png'
            }
            return (
              <div key={x.macAddress} className="mx-3">
                <div className="card">
                  <General avatar={avatar} rootAction={() => setModal(x)} name={x.id} />
                </div>
              </div>
            )
          }}
        />
      </div>
      {modal && <InfoModal modal={modal} setModal={setModal} />}
    </>
  )
}
export default withRouter(connect(mapStateToProps)(DefaultPage))
