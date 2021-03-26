import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import List12 from 'components/kit/widgets/Lists/12'
import List15 from 'components/kit/widgets/Lists/15'
import Chart1 from './Charts/1'
import Chart2 from './Charts/2'
import PieAlert from './Charts/pieAlert'
import PieOnline from './Charts/pieOnline'
import BarLine from './Charts/barline'
import faker from 'faker'
import { Pagination, DatePicker, Select } from 'antd'
import InfoModal from './info'
import './style.scss'
const { RangePicker } = DatePicker
const { Option } = Select

const ExtraAppsGoogleAnalytics = () => {
  const [modal, setModal] = useState()
  const batteryCellStatus = []
  for (let i = 1; i < 21; i++) {
    batteryCellStatus.push(
      <div
        key={i}
        className='card cell-item'
        onClick={() => setModal(true)}
        style={{ background: '#f5222d', cursor: 'pointer' }}
      >
        <div className='card-body'>{i}</div>
      </div>
    )
  }
  for (let i = 21; i < 30; i++) {
    batteryCellStatus.push(
      <div
        key={i}
        className='card cell-item'
        onClick={() => setModal(true)}
        style={{ background: '#8c8c8c', cursor: 'pointer' }}
      >
        <div className='card-body'>{i}</div>
      </div>
    )
  }
  for (let i = 30; i < 100; i++) {
    batteryCellStatus.push(
      <div
        key={i}
        className='card cell-item'
        onClick={() => setModal(true)}
        style={{ background: '#389e0d', cursor: 'pointer' }}
      >
        <div className='card-body'>{i}</div>
      </div>
    )
  }
  return (
    <div>
      <Helmet title='Hệ thống quản lý ắc quy' />
      <div className='row'>
        <div className='col-lg-12 col-md-12'>
          <h5 className='text-dark mb-4 text-uppercase'>Hệ thống quản lý ắc quy</h5>
          <div className='card'>
            <div className='card-body row'>
              <div className='col-md-3'>
                <RangePicker />
              </div>
              <div className='col-md-3'>
                <Select
                  mode='multiple'
                  allowClear
                  style={{ width: '100%' }}
                  placeholder='System'
                >
                  <Option>SESAN4_220KV_BMS1</Option>
                </Select>
              </div>
              <div className='col-md-3'>
                <Select
                  mode='multiple'
                  allowClear
                  style={{ width: '100%' }}
                  placeholder='Unit'
                >
                  <Option>Local Unit</Option>
                </Select>
              </div>
              <div className='col-md-3'>
                <Select
                  mode='multiple'
                  allowClear
                  style={{ width: '100%' }}
                  placeholder='Block'
                >
                  <Option>Block 1</Option>
                </Select>
              </div>
            </div>
          </div>
        </div>
        <div className='col-xl-8 col-lg-12'>
          <div className='row'>
            <div className='col-lg-6'>
              <div className='card'>
                <div className='card-body'>
                  <PieOnline />
                </div>
              </div>
            </div>
            <div className='col-lg-6'>
              <div className='card'>
                <div className='card-body'>
                  <PieAlert />
                </div>
              </div>
            </div>
          </div>
          <h5 className='text-dark mb-4'>Phân tích và Thống kê</h5>
          <div className='card' style={{ paddingTop: 10, paddingLeft: 10 }}>
            <BarLine />
          </div>
          <div className='row'>
            <div className='col-lg-6'>
              {/* <div className='card'>
                <div className='card-body'>
                  <PieAlert />
                </div>
              </div> */}
              <h5 className='text-dark mb-4'>Báo động và Cảnh báo</h5>
              <div className='card'>
                <div className='card-body'>
                  <List12 />
                </div>
              </div>
            </div>
            <div className='col-lg-6'>
              {/* <div className='card'>
                <div className='card-body'>
                  <PieOnline />
                </div>
              </div> */}
              <h5 className='text-dark mb-4'>Các cảnh báo gần đây</h5>
              <div className='card'>
                <div className='card-body'>
                  <List15 />
                </div>
              </div>
            </div>
            <div className='col-md-12'>
              <h5 className='text-dark mb-4'>Doanh thu</h5>
              <div className='card'>
                <Chart2 />
              </div>
            </div>
          </div>
        </div>
        <div className='col-xl-4 col-lg-12'>
          <h5 className='text-dark mb-4'>Trạng thái Ắc quy</h5>
          <div className='card'>
            <div className='card-body battery-cell-panel'>
              {batteryCellStatus}
            </div>
            <Pagination className='battery-pagination' total={1000} />
          </div>
        </div>
      </div>
      {modal &&
        <InfoModal modal={modal} setModal={setModal} />}
    </div>
  )
}

export default ExtraAppsGoogleAnalytics
