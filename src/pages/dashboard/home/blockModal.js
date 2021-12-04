import React, { useState, useEffect } from 'react'
import { Modal, Button, DatePicker } from 'antd'
import LineChart from './lineChartModal'
import TitleIcon from './titleIcon'
import moment from 'moment'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import './blockModal.scss'

const mapStateToProps = ({ device, dispatch }) => {
  const { blockDetailEvents = {} } = device
  return { blockDetailEvents, dispatch }
}
const BlockModal = ({ modal, setModal, blockDetailEvents, dispatch }) => {
  const [time, setTime] = useState(moment())
  const [series, setSeries] = useState([
    {
      name: 'RUpper',
      data: [],
      color: '#865439'
    },
    {
      name: 'VUpper',
      data: [],
      color: '#FF7600'
    },
    {
      name: 'ELower',
      data: [],
      color: '#FFF338'
    },
    {
      name: 'TUpper',
      data: [],
      color: '#FF4848'
    },
    {
      name: 'Offline',
      data: [],
      color: '#FF4848'
    }
  ])

  useEffect(() => {
    if (modal) {
      dispatch({
        type: 'device/BLOCK_DETAIL_EVENTS',
        payload: {
          id: modal.deviceId,
          start: time.startOf('day').unix(),
          end: time.endOf('day').unix(),
          priority: [0, 1, 2, 3, 4, 5],
          unitId: modal.unitId,
          macAddress: modal.macAddress,
          isAsc: true,
          limit: 1000
          //  stringId
        }
      })
    }
  }, [modal, time])
  useEffect(() => {
    setSeries([
      {
        name: 'RUpper',
        data: blockDetailEvents.rUpper || [],
        color: '#865439'
      },
      {
        name: 'VUpper',
        data: blockDetailEvents.vUpper || [],
        color: '#FF7600'
      },
      {
        name: 'ELower',
        data: blockDetailEvents.eLower || [],
        color: '#FFF338'
      },
      {
        name: 'TUpper',
        data: blockDetailEvents.tUpper || [],
        color: '#FF4848'
      // },
      // {
      //   name: 'Offline',
      //   data: blockDetailEvents.offline || [],
      //   color: '#FF4848'
      }
    ])
  }, [blockDetailEvents])

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
                    <h2 className='title'>Thông tin block {modal.localBlockId}</h2>
                  </div>
                  <div>
                    <DatePicker
                      placeholder='Chọn thời gian'
                      format='DD/MM/YYYY'
                      value={time}
                      onChange={setTime}
                    />
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
                      <div id={`localBlockId=${modal.localBlockId},id=${modal.id}`}>{modal.localBlockId || modal.id}</div>
                      <div />
                    </div>
                    <div className='body-row'>
                      <div>String</div>
                      <div id={`localStringId=${modal.localStringId},stringId=${modal.stringId}`}>{modal.localStringId || modal.stringId}</div>
                      <div />
                    </div>
                    <div className='body-row'>
                      <div>Vo</div>
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
