import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { Table } from 'antd'
import { connect } from 'react-redux'
import { withRouter, useParams } from 'react-router-dom'
import { get } from 'lodash'
import { TIME_FORMAT } from 'constant'

import moment from 'moment'
import '../style.scss'

const mapStateToProps = ({ authDevice, dispatch }) => {
  const { loading, detail } = authDevice
  const device = get(detail.devices, ['0'], {})
  const system = get(device.systems, ['0'], {})
  const blocks = system.blocks

  return { loading, detail, device, system, blocks, dispatch }
}

const DefaultPage = ({ system, dispatch }) => {
  const { id } = useParams()
  useEffect(() => {
    dispatch({
      type: 'authDevice/DETAIL',
      payload: {
        id,
        filter: JSON.stringify({
          include: [{
            relation: 'devices',
            scope: {
              include: [{
                relation: 'systems'
              }]
            }
          }]
        })
      }
    })
  }, [id, dispatch])

  useEffect(() => {
    dispatch({
      type: 'system/GET_BLOCKS',
      payload: {
        id
      }
    })
  }, [id, dispatch])
  const _system = JSON.parse(JSON.stringify(system))
  delete _system.blocks
  delete _system.id
  delete _system.deviceId
  delete _system.systemId
  delete _system.userId

  const data = Object.keys(_system).map((value, index) => ({
    key: `${index}`,
    type: value,
    amount: system[value] || '-'
  }))
  const columns = [
    {
      title: 'Loại',
      dataIndex: 'type',
      key: 'type'
    },
    {
      title: 'Thông số',
      key: 'amount',
      dataIndex: 'amount',
      render: (amount, item) => {
        if (amount === 'Negative') {
          return <span className='text-capital text-danger font-weight-bold'>{amount}</span>
        }
        if (item.type === 'created' || item.type === 'updated') {
          return <span className='text-capital text-primary font-weight-bold'>{amount ? moment(amount).format(TIME_FORMAT) : '---'}</span>
        }
        return <span className='text-capital text-primary font-weight-bold'>{amount}</span>
      }
    }
  ]
  return (
    <>
      <div className='detail-page device'>
        <Helmet title='Thông tin thiết bị' />
        <div className='card'>
          <div className='card-header border-0 pb-0'>
            <div className='cui__utils__heading mb-0'>
              <strong className='text-uppercase font-size-16'>Thông số cấu hình</strong>
            </div>
          </div>
          <div className='card-body'>
            <div className='mb-3'>
              <Table
                className='text-capital'
                dataSource={data}
                columns={columns}
                pagination={false}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default withRouter(connect(mapStateToProps)(DefaultPage))
