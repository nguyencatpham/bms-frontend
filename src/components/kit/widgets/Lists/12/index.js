import React from 'react'
import faker from 'faker'
import moment from 'moment'
import style from './style.module.scss'

const List12 = () => {
  return (
    <div>
      <div className='mb-3'>
        <div className='bg-success text-white text-uppercase px-3 py-1 mb-2'>
          Hôm nay - {moment().format('MM DD,YYYY')}
        </div>
        <div className='table-responsive'>
          <table className='table table-borderless text-gray-6 mb-0'>
            <tbody>
              <tr>
                <td className='text-nowrap'>
                  <div className={`${style.donut} ${style.danger} mr-3`} />
                  Unit 1
                </td>
                <td className='text-right'>
                  <strong>{faker.random.number(10000)} </strong>
                </td>
              </tr>
              <tr>
                <td className='text-nowrap'>
                  <div className={`${style.donut} ${style.primary} mr-3`} />
                  Unit 2
                </td>
                <td className='text-right'>
                  <strong>{faker.random.number(10000)}</strong>
                </td>
              </tr>
              <tr>
                <td className='text-nowrap'>
                  <div className={`${style.donut} ${style.success} mr-3`} />
                  Unit 3
                </td>
                <td className='text-right'>
                  <strong>{faker.random.number(10000)}</strong>
                </td>
              </tr>
              <tr>
                <td className='text-nowrap'>
                  <div className={`${style.donut} ${style.info} mr-3`} />
                  Unit 4
                </td>
                <td className='text-right'>
                  <strong>{faker.random.number(10000)}</strong>
                </td>
              </tr>
              <tr>
                <td className='text-nowrap'>
                  <div className={`${style.donut} ${style.orange} mr-3`} />
                  Unit 5
                </td>
                <td className='text-right'>
                  <strong>{faker.random.number(10000)}</strong>
                </td>
              </tr>
              <tr>
                <td className='text-nowrap'>
                  <div className={`${style.donut} ${style.orange} mr-3`} />
                  Unit 6
                </td>
                <td className='text-right'>
                  <strong>{faker.random.number(10000)}</strong>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <div className='bg-light text-gray-6 text-uppercase px-3 py-1 mb-2'>Tháng 12, 2020</div>
        <div className='table-responsive'>
          <table className='table table-borderless text-muted mb-0'>
            <tbody>
              <tr>
                <td>Không có cảnh báo</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default List12
