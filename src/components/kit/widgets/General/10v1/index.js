import React from 'react'
import { ROLE } from 'constant'
import style from './style.module.scss'

const General10v1 = ({ avatar, name, role, actions }) => {
  return (
    <div className='d-flex flex-wrap flex-column align-items-center '>
      <div className='kit__utils__avatar kit__utils__avatar--size64 mb-3'>
        <img src={avatar || `/resources/images/avatars/${Math.floor(Math.random() * 5) + 1}.jpg`} alt={name} width={80} />
      </div>
      <div className='text-center'>
        <div className='text-dark font-weight-bold font-size-18'>{name}</div>
        <div className='text-uppercase font-size-12 mb-3'>{ROLE[role]}</div>
        {actions && actions.map(x => (
          <div key={x.id} style={{ marginBottom: 5, minWidth: 32 }}>
            <button
              type='button'
              style={{ backgroundColor: x.color }}
              className={`btn btn-primary ${style.min200} ${style.btnWithAddon}`}
              onClick={() => x.action()}
            >
              <span className={`${style.btnAddon}`}>
                <i className={`${style.btnAddonIcon} fe fe-plus-circle`} />
              </span>
              {x.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default General10v1
