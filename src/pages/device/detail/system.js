import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { withRouter, useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import General from 'components/kit/widgets/General/10v1'
import InfoModal from './info'

import '../style.scss'

const mapStateToProps = ({ system, dispatch }) => {
  const { list, loading, total, blocks = [] } = system
  return { list, loading, total, blocks, dispatch }
}
const DefaultPage = ({ blocks, dispatch }) => {
  const [modal, setModal] = useState()
  const { id } = useParams()
  useEffect(() => {
    dispatch({
      type: 'system/GET_BLOCKS',
      payload: {
        id
      }
    })
  }, [id, dispatch])
  // polling
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch({
        type: 'system/GET_BLOCKS',
        payload: {
          id
        }
      })
    }, 10000)
    return () => clearInterval(interval)
  }, [id, dispatch])

  return (
    <>
      <div className='chart'>
        <Helmet title='Quản lý hệ thống' />
        <div className='row'>
          {
            blocks.map(x => {
              console.log('al', x.alertType)
              let avatar = '/resources/images/battery.png'
              if (x.alertType === 1) {
                avatar = '/resources/images/battery-greered.png'
              } else if (x.alertType === 2) {
                avatar = '/resources/images/battery-orange.png'
              }
              return (
                <div key={x.id} className='col-xl-2 col-lg-2 col-md-2 col-xs-6'>
                  <div className='card'>
                    <General
                      avatar={avatar}
                      rootAction={() => setModal(x)}
                      name={x.id}
                    />
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
      {modal &&
        <InfoModal modal={modal} setModal={setModal} />}
    </>
  )
}
export default withRouter(connect(mapStateToProps)(DefaultPage))
