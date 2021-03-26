import React, { useEffect, useState } from 'react'
import { Select, Table, DatePicker } from 'antd'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import moment from 'moment'
import General from 'components/kit/widgets/General/10v1'
import InfoModal from './info'
import faker from 'faker'

import '../style.scss'

const { Option } = Select
const { RangePicker } = DatePicker

const mapStateToProps = ({ system, dispatch }) => {
  const { list, loading, total, blocks = [] } = system
  return { list, loading, total, blocks, dispatch }
}
const DefaultPage = ({ list, loading, total, blocks, dispatch }) => {
  const [modal, setModal] = useState()
  return (
    <>
      <div className='chart'>
        <Helmet title='Quản lý hệ thống' />
        <div className='row'>
          {
            blocks.map(x => (
              <div key={x.id} className='col-xl-2 col-lg-2 col-md-2 col-xs-6'>
                <div className='card'>
                  <General
                    avatar='/resources/images/battery.png'
                    rootAction={() => setModal(x)}
                    name={x.id}
                  />
                </div>
              </div>
            ))
          }
        </div>
      </div>
      {modal &&
        <InfoModal modal={modal} setModal={setModal} />}
    </>
  )
}
export default withRouter(connect(mapStateToProps)(DefaultPage))
