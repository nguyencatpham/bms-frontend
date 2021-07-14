import React from 'react'

const General1 = ({ phone, address, description }) => {
  return (
    <div>
      <p style={{fontSize: '2rem', opacity: 0.8}} className='text-dark font-weight-bold mb-2'>{phone || '00-000-000-00'}</p>
      <p className='text-uppercase text-muted mb-3'>{address}</p>
      <p className='mb-4'>
        {description}
      </p>
    </div>
  )
}

export default General1
