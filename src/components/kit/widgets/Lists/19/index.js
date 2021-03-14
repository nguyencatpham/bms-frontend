import React from 'react'
import style from './style.module.scss'

const List19 = () => {
  return (
    <ul className='list-unstyled'>
      <li className={style.item}>
        <div className={`${style.itemTime} mr-3`}>16:00</div>
        <div className={style.itemSeparator}>
          <div className={`${style.donut} ${style.danger} mr-3`} />
        </div>
        <div>
          Đăng xuất khỏi hệ thống
        </div>
      </li>
      <li className={style.item}>
        <div className={`${style.itemTime} mr-3`}>15:28</div>
        <div className={style.itemSeparator}>
          <div className={`${style.donut} ${style.danger} mr-3`} />
        </div>
        <div>Điều khiển Hệ thống A</div>
      </li>
      <li className={style.item}>
        <div className={`${style.itemTime} mr-3`}>14:26</div>
        <div className={style.itemSeparator}>
          <div className={`${style.donut} ${style.danger} mr-3`} />
        </div>
        <div>
          Truy xuất lịch sử dữ liệu ắc quy
        </div>
      </li>
      <li className={style.item}>
        <div className={`${style.itemTime} mr-3`}>13:22</div>
        <div className={style.itemSeparator}>
          <div className={`${style.donut} ${style.danger} mr-3`} />
        </div>
        <div>
        Đăng nhập vào hệ thống
        </div>
      </li>
    </ul>
  )
}

export default List19
