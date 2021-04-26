import React from 'react'

const General12v1 = ({ device = 0 }) => {
  return (
    <div className='card-body'>
      <div className='d-flex mb-1'>
        <div className='text-uppercase font-weight-bold mr-auto'>Thiết bị</div>
        <div />
      </div>
      <div className='d-flex mb-2'>
        <div className='font-size-24 font-weight-bold mr-auto'>{device}</div>
        <div className='font-size-24' />
      </div>
      <div className='progress'>
        <div
          className='progress-bar bg-success'
          style={{
            width: device ? '100%' : '0%'
          }}
          role='progressbar'
          aria-valuenow={60}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  )
}

export default General12v1
