import React from 'react'

const General12v1 = ({ online = 0, total = 0 }) => {
  return (
    <div className='card-body'>
      <div className='d-flex mb-1'>
        <div className='text-uppercase font-weight-bold mr-auto'>Block Online</div>
        <div>Tổng cộng </div>
      </div>
      <div className='d-flex mb-2'>
        <div className='font-size-24 font-weight-bold mr-auto'>{online}</div>
        <div className='font-size-24'>{total}</div>
      </div>
      <div className='progress'>
        <div
          className='progress-bar bg-success'
          style={{
            width: `${online / (total || 1) * 100}%`
          }}
          role='progressbar'
          aria-valuenow={online / total}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  )
}

export default General12v1
