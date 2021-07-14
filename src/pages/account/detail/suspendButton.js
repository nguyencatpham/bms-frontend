import React from 'react'
import style from 'components/kit/widgets/General/10v1/style.module.scss'
import { Button, Modal, Form, Tabs } from 'antd'

const SuspendButton = ({ suspendAction }) => {
  return (
    <div className="text-center">
      <div key={suspendAction.id} style={{ marginBottom: 5, minWidth: 32 }}>
        <button
          type="button"
          style={{ backgroundColor: suspendAction.color }}
          className={`btn ${suspendAction.btnClass} ${style.min200} ${style.btnWithAddon}`}
          onClick={() => suspendAction.action()}
        >
          <span className={`${style.btnAddon}`}>
            <i className={`${style.btnAddonIcon} fe fe-plus-circle`} />
          </span>
          {suspendAction.name}
        </button>
      </div>
    </div>
  )
}

export default SuspendButton
