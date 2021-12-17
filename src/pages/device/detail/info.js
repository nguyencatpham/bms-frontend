import React, { useEffect, useState } from 'react'
import { Button, Modal, Table } from 'antd'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import moment from 'moment'
import Series from './series'
import DateRangePicker from 'react-bootstrap-daterangepicker'

import { TIME_FORMAT } from 'constant'

const mapStateToProps = ({ system, dispatch }) => {
  const { tsdata = [] } = system
  let latestValue = [{
    type: 'V0',
    amount: 0
  }, {
    type: 'E',
    amount: 0
  }, {
    type: 'R',
    amount: 0
  }]
  if (tsdata.length) {
    const last = tsdata[tsdata.length - 1]
    latestValue = [{
      type: 'V0',
      amount: last.v0
    }, {
      type: 'E',
      amount: last.e
    }, {
      type: 'R',
      amount: last.r
    }]
  }
  return { tsdata, latestValue, dispatch }
}

const DefaultPage = ({ modal, setModal, setRange, tsdata, range, latestValue, dispatch }) => {
  const [info, setInfo] = useState([])

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
    setInfo([...latestValue, ...blockInfo])
  }, [modal.id, latestValue])
  // For initial date range picker, 7 days
  const startDate = moment.unix(range.start).format('MM/DD/YYYY')
  const endDate = moment.unix(range.end).format('MM/DD/YYYY')
  return (
    // <div className='container block-info'>
    <Modal
      wrapClassName='custom-ant-dashboard'
      key={modal ? modal.id : 'info'}
      // className='modal-cus modal-monitoring'
      visible={!!modal}
      onCancel={() => setModal(false)}
      closable={false}
      width={1200}
      title={<span className='text-white'>THÔNG TIN BLOCK <span className='cabinet-status-online' />{modal ? modal.id : ''}</span>}
      footer={[
        <Button className='btn btn-export' onClick={() => setModal(false)}>Đóng</Button>
      ]}
    >
      <div className='row'>
        <div className='col-md-12 col-lg-12'>
          <div className='card border-0'>

            <div className='card-body pb-0'>
              <div>
                <div className='row'>
                  <div className='col-md-8 col-xs-12'>
                    <div>
                      <div className='mb-3'>
                        <DateRangePicker
                          initialSettings={{ startDate, endDate }}
                          onApply={(event, picker) => {
                            setRange({
                              start: picker.startDate.unix(),
                              end: picker.endDate.unix()
                            })
                          }}
                        >
                          <input type='text' className='form-control w-100' />
                        </DateRangePicker>
                      </div>
                      <Series data={tsdata} />
                    </div>
                  </div>
                  <div className='col-md-4 col-xs-12'>
                    <div className='card'>
                      <div className='custom-card-header card-header'>
                        <div className='d-flex align-item-center justify-content-between'>
                          <div className='d-flex align-items-center'>
                            <strong className='text-uppercase font-size-16'>Thông tin chi tiết</strong>
                          </div>
                        </div>
                      </div>
                      <div
                        className='card-body' style={{
                          maxHeight: '450px',
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
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}
export default withRouter(connect(mapStateToProps)(DefaultPage))
