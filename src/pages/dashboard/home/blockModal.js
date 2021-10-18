import React, { useState, forwardRef, useImperativeHandle } from 'react'
import { Modal, Button, Table, DatePicker } from 'antd'
import LineChart from './lineChartModal'
import TitleIcon from './titleIcon'
import './blockModal.scss'

const BlockModal = (props, ref) => {
  const [block, setBlock] = useState()
  const [isModalVisible, setIsModalVisible] = useState(false)

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleOk = () => {
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  //   For parent get access to (this) child component
  useImperativeHandle(ref, () => ({
    handleClick(block) {
      // console.log(block)
      setBlock(block)
      showModal()
    },
  }))

  const lineChartSeries = [
    {
      name: 'RUpper',
      data: [40, 52, 38, 24, 33, 26, 21, 20, 6, 8, 15],
      color: '#865439',
    },
    {
      name: 'VUpper',
      data: [35, 41, 52, 42, 13, 18, 29, 37, 36, 51, 32],
      color: '#FF7600',
    },
    {
      name: 'ELower',
      data: [45, 57, 74, 70, 75, 38, 62, 47, 40, 56, 45],
      color: '#FFF338',
    },
    {
      name: 'TUpper',
      data: [36, 45, 68, 61, 69, 49, 67, 48, 44, 52, 41],
      color: '#FF4848',
    },
  ]

  return (
    <>
      <Modal
        className="BlockModal"
        width={1200}
        title={null}
        visible={isModalVisible}
        closable={false}
        footer={null}
      >
        <div className="BlockModal__main">
          <div className="BlockModal__left-side">
            <div className="header">
              <div className="title-wrap">
                <TitleIcon />
                <h2 className="title">Thông tin block {block}</h2>
              </div>
              <div>
                <DatePicker
                  placeholder="Chọn thời gian"
                  format="DD/MM/YYYY"
                  // onChange={onChange}
                />
              </div>
            </div>
            <div className="chart">
              <LineChart series={lineChartSeries} />
            </div>
          </div>
          <div className="BlockModal__right-side">
            <div>
              <Button
                onClick={handleCancel}
                className="close-button"
                // size="large"
                shape="default"
                type="primary"
              >
                Đóng cửa sổ
              </Button>
            </div>
            <div className="side-info">
              <div className="side-info__head">Thông tin chi tiết</div>
              <div className="side-info__body">
                <div className="body-row">
                  <div>Block</div>
                  <div>1</div>
                  <div></div>
                </div>
                <div className="body-row">
                  <div>String</div>
                  <div>1</div>
                  <div></div>
                </div>
                <div className="body-row">
                  <div>Vo</div>
                  <div>2.45</div>
                  <div>V</div>
                </div>
                <div className="body-row">
                  <div>E</div>
                  <div>2</div>
                  <div>V</div>
                </div>
                <div className="body-row">
                  <div>R</div>
                  <div>35</div>
                  <div>mΩ</div>
                </div>
                <div className="body-row">
                  <div>T</div>
                  <div>67</div>
                  <div>°C</div>
                </div>
                <div className="body-row">
                  <div>SoC</div>
                  <div>234</div>
                  <div></div>
                </div>
                <div className="body-row-2">
                  <div>Total Discharge Record </div>
                  <div>2.45</div>
                  <div></div>
                </div>
                <div className="body-row-2">
                  <div>Total Discharge Cycle</div>
                  <div>2.45</div>
                  <div></div>
                </div>
                <div className="body-row-2">
                  <div>Expect Life Time Rest</div>
                  <div>2.45</div>
                  <div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default forwardRef(BlockModal)
