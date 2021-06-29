import React, { useEffect, useState } from 'react'
import { Table } from 'antd'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import moment from 'moment'
import faker from 'faker'
import Series from './series'

import { TIME_FORMAT } from 'constant'

const mapStateToProps = ({ system, dispatch }) => {
  const { tsdata = [] } = system
  return { tsdata, dispatch }
}

const DefaultPage = ({ modal, tsdata, range, dispatch }) => {
  const [info, setInfo] = useState([])
  const last = tsdata.length > 0 ? tsdata[tsdata.length - 1] : { v0: 0, e: 0, r: 0 }
  const latestValue = [{
    type: 'V0',
    amount: last.v0
  }, {
    type: 'E',
    amount: last.e
  }, {
    type: 'R',
    amount: last.r
  }]
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

  useEffect(() => {
    dispatch({
      type: 'system/GET_TSDATA',
      payload: {
        id: modal.systemId,
        start: range.start || 1,
        end: range.end || Math.floor(Date.now() / 1000),
        macAddress: modal.macAddress,
        type: 'v0'
      }
    })
  }, [range, modal.macAddress, modal.systemId, dispatch])
  useEffect(() => {
    const info = { ...modal }
    delete info.id
    delete info.deviceId
    delete info.systemId
    delete info.unitId
    delete info.stringId
    delete info.macAddress
    const blockInfo = Object.keys(info).map(key =>
      ({
        key,
        type: key,
        amount: modal[key]
      }))
    setInfo(blockInfo)
  }, [modal.id])
  useEffect(() => {
    if (info.length && info.every(x => x.type !== 'V0')) {
      setInfo([...latestValue, ...info])
    }
  }, [tsdata])
  return (
    <div className='container block-info'>
      <div className='row'>
        <div className='col-md-8 col-xs-12'>
          <div>
            <Series data={tsdata} />
          </div>
        </div>
        <div className='col-md-4 col-xs-12'>
          <div className='card'>
            <div className='card-header border-0 block-detail'>
              <div className='cui__utils__heading mb-0'>
                <strong className='text-uppercase font-size-16'>Thông tin chi tiết</strong>
              </div>
            </div>
            <div
              className='card-body' style={{
                maxHeight: '380px',
                overflowY: 'auto'
              }}
            >
              <div className='mb-3'>
                <Table
                  rowKey={x => x.type + x.amount}
                  dataSource={info}
                  columns={columns}
                  pagination={false}
                />
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default withRouter(connect(mapStateToProps)(DefaultPage))
