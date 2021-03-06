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
          Mất kết nối với trạm điều khiển trung tâm
        </div>
      </li>
      <li className={style.item}>
        <div className={`${style.itemTime} mr-3`}>15:28</div>
        <div className={style.itemSeparator}>
          <div className={`${style.donut} ${style.danger} mr-3`} />
        </div>
        <div>Cảnh báo quá nhiệt</div>
      </li>
      <li className={style.item}>
        <div className={`${style.itemTime} mr-3`}>14:26</div>
        <div className={style.itemSeparator}>
          <div className={`${style.donut} ${style.danger} mr-3`} />
        </div>
        <div>
          Cảnh báo sắp hết pin
        </div>
      </li>
      <li className={style.item}>
        <div className={`${style.itemTime} mr-3`}>13:22</div>
        <div className={style.itemSeparator}>
          <div className={`${style.donut} ${style.danger} mr-3`} />
        </div>
        <div>
        Thiết bị Online
        </div>
      </li>
    </ul>
  )
}

export default List19
