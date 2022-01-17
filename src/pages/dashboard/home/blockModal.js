import React, { useState, useEffect } from 'react'
import { Modal, Button } from 'antd'
import LineChart from './lineChartModal'
import TitleIcon from './titleIcon'
import moment from 'moment'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import 'moment/locale/vi'
import { DATE_PICKER_OPTIONS } from 'constant'

import DateRangePicker from 'react-bootstrap-daterangepicker'
import jQuery from 'jquery'
// you will need the css that comes with bootstrap@3. if you are using
// a tool like webpack, you can do the following:
// import 'bootstrap/dist/css/bootstrap.css'
// you will also need the css that comes with bootstrap-daterangepicker
import 'bootstrap-daterangepicker/daterangepicker.css'
import './blockModal.scss'
import { calTimeBucket } from 'utils'
window.jQuery = window.$ = jQuery

const mapStateToProps = ({ device, dispatch }) => {
  const { blockDetailEvents = {}, blockHistories = {} } = device
  return { blockDetailEvents, blockHistories, dispatch }
}
const BlockModal = ({ modal, setModal, blockDetailEvents, blockHistories, dispatch }) => {
  const [maxDate] = useState(moment().endOf('day'))
  const range = {
    start: moment().add('-7', 'days').startOf('day').unix() * 1000,
    end: moment().endOf('day').unix() * 1000
  }
  const [series, setSeries] = useState([
    [
      {
        name: 'R',
        data: [],
        color: '#865439'
      },
      {
        name: 'V0',
        data: [],
        color: '#FF7600'
      },
      {
        name: 'E',
        data: [],
        color: '#FFF338'
      },
      {
        name: 'T',
        data: [],
        color: '#FF4848'
      }
    ]
  ])

  useEffect(() => {
    if (modal) {
      dispatch({
        type: 'device/BLOCK_HISTORY',
        payload: {
          id: modal.deviceId,
          start: range.start,
          end: range.end,
          macAddress: modal.macAddress,
          isAsc: true,
          timebucket: calTimeBucket({ start: moment(range.start), end: moment(range.end) }),
          limit: 1000
          //  stringId
        }
      })
    }
  }, [modal, range.start, range.end])
  useEffect(() => {
    setSeries([
      {
        name: 'R',
        data: blockHistories.r || [],
        color: '#865439'
      },
      {
        name: 'V0',
        data: blockHistories.v0 || [],
        color: '#FF7600'
      },
      {
        name: 'E',
        data: blockHistories.e || [],
        color: '#FFF338'
      },
      {
        name: 'T',
        data: blockHistories.t || [],
        color: '#FF4848'
      }
    ])
  }, [blockHistories])

  return (
    <>
      <Modal
        className='BlockModal'
        width={1200}
        title={null}
        visible={modal}
        onCancel={() => setModal(false)}
        footer={null}
        closable={false}
      >
        <div className='BlockModal__main'>
          {modal &&
            <>
              <div className='BlockModal__left-side'>
                <div className='header'>
                  <div className='title-wrap'>
                    <TitleIcon />
                    <h2 className='title'>Thông tin block {modal.blockId}</h2>
                  </div>
                  <div style={{ width: 300 }}>
                    <DateRangePicker
                      initialSettings={{
                        startDate: moment(range.start),
                        endDate: moment(range.end),
                        parentEl: '#date-range-modal',
                        ...DATE_PICKER_OPTIONS,
                        maxDate
                      }}
                      onApply={(event, picker) => {
                        dispatch({
                          type: 'device/BLOCK_HISTORY',
                          payload: {
                            id: modal.deviceId,
                            start: picker.startDate.unix() * 1000,
                            end: picker.endDate.unix() * 1000,
                            timebucket: calTimeBucket({ start: picker.startDate, end: picker.endDate }),
                            macAddress: modal.macAddress,
                            isAsc: true,
                            limit: 1000
                            //  stringId
                          }
                        })
                      }}
                    >
                      <input type='text' width={300} className='form-control general-datetime col-12' />
                    </DateRangePicker>
                  </div>
                </div>
                <div className='chart'>
                  <LineChart series={series} />
                </div>
              </div>
              <div className='BlockModal__right-side'>
                <div>
                  <Button
                    onClick={() => setModal(false)}
                    className='close-button'
                    // size="large"
                    shape='default'
                    type='primary'
                  >
                Đóng cửa sổ
                  </Button>
                </div>
                <div className='side-info'>
                  <div className='side-info__head'>Thông tin chi tiết</div>
                  <div className='side-info__body'>
                    <div className='body-row'>
                      <div>Block</div>
                      <div id={`blockId=${modal.blockId},id=${modal.id}`}>{modal.blockId || '?'}</div>
                      <div />
                    </div>
                    <div className='body-row'>
                      <div>String</div>
                      <div id={`localStringId=${modal.localStringId},stringId=${modal.stringId}`}>{modal.localStringId || modal.stringId}</div>
                      <div />
                    </div>
                    <div className='body-row'>
                      <div>V0</div>
                      <div>{modal.v0 || '-'}</div>
                      <div>V</div>
                    </div>
                    <div className='body-row'>
                      <div>E</div>
                      <div>{modal.e || '-'}</div>
                      <div>V</div>
                    </div>
                    <div className='body-row'>
                      <div>R</div>
                      <div>{modal.r || '-'}</div>
                      <div>mΩ</div>
                    </div>
                    <div className='body-row'>
                      <div>T</div>
                      <div>{modal.t || '-'}</div>
                      <div>°C</div>
                    </div>
                    <div className='body-row'>
                      <div>SoC</div>
                      <div>{modal.sOC || '-'}</div>
                      <div />
                    </div>
                    <div className='body-row-2'>
                      <div>Total Discharge Second </div>
                      <div>{modal.totalDischargeSecond || '-'}</div>
                      <div />
                    </div>
                    <div className='body-row-2'>
                      <div>Total Discharge Cycle</div>
                      <div>{modal.totalDischargeCycle || '-'}</div>
                      <div />
                    </div>
                    <div className='body-row-2'>
                      <div>Expect Life Time Rest</div>
                      <div>{modal.expectedLifeTimeRest || '-'}</div>
                      <div />
                    </div>
                  </div>
                </div>
              </div>
            </>}
        </div>
      </Modal>
    </>
  )
}

export default withRouter(connect(mapStateToProps)(BlockModal))
