import React from 'react'
import style from './style.module.scss'

const List15 = () => {
  return (
    <ul className='list-unstyled'>
      <li className={style.item}>
        <a className={style.itemLink}>
          <div className={`${style.itemCover} mr-3`}>
            <img src='/resources/images/warning.png' alt='Hands' />
          </div>
          <div>
            <div className='text-blue'>Unit 1</div>
            <div className='font-weight-bold mb-2'>Block 1</div>
            <div>
            Ắc quy tại Block 1 System 32 sắp hết pin
            </div>
          </div>
        </a>
      </li>
      <li className={style.item}>
        <a className={style.itemLink}>
          <div className={`${style.itemCover} mr-3`}>
            <img src='/resources/images/alert.png' alt='Hands' />
          </div>
          <div>
            <div className='text-blue'>Unit 2</div>
            <div className='font-weight-bold mb-2'>Block 1</div>
            <div>
            Ắc quy tại Block 1 System 32 bị mất kết nối
            </div>
          </div>
        </a>
      </li>
      <li className={style.item}>
        <a className={style.itemLink}>
          <div className={`${style.itemCover} mr-3`}>
            <img src='/resources/images/warning.png' alt='Hands' />
          </div>
          <div>
            <div className='text-blue'>Unit 3</div>
            <div className='font-weight-bold mb-2'>Block 1</div>
            <div>
            Ắc quy tại Block 2 System 1 bị mất kết nối trong 10 phút
            </div>
          </div>
        </a>
      </li>
    </ul>
  )
}

export default List15
