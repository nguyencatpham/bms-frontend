import React from 'react'

const General1 = ({ phone, address, description }) => {
  return (
    <div>
      <p className='text-dark font-size-48 font-weight-bold mb-2'>{phone || '0984 12 13 14'}</p>
      <p className='text-uppercase text-muted mb-3'>{address}</p>
      <p className='mb-4'>
        {description}
      </p>
    </div>
  )
}

export default General1
