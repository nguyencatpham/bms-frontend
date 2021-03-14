import React, { useState } from 'react'
import { connect } from 'react-redux'
import { UserOutlined } from '@ant-design/icons'
import { Menu, Dropdown, Avatar, Badge } from 'antd'
import faker from 'faker'
import styles from './style.module.scss'

const mapStateToProps = ({ user }) => ({ user })

const ProfileMenu = ({ dispatch, user }) => {
  const [count, setCount] = useState(7)

  const logout = e => {
    e.preventDefault()
    dispatch({
      type: 'user/LOGOUT'
    })
  }

  const addCount = () => {
    setCount(count + 1)
  }

  const menu = (
    <Menu selectable={false}>
      <Menu.Item>
        <strong>
          Xin chào  {user.name || faker.name.firstName}
        </strong>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item>
        <div>
          <i className='fe fe-user mr-2' />
          <strong>
            Quyền hạn: {user.role || '—'}
          </strong>
        </div>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item>
        <a href='#' onClick={e => e.preventDefault()}>
          <i className='fe fe-user mr-2' />
          Thông tin tài khoản
        </a>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item>
        <a href='#' onClick={logout}>
          <i className='fe fe-log-out mr-2' />
          Đăng xuất
        </a>
      </Menu.Item>
    </Menu>
  )
  return (
    <Dropdown overlay={menu} trigger={['click']} onVisibleChange={addCount}>
      <div className={styles.dropdown}>
        <Badge count={count}>
          <Avatar className={styles.avatar} shape='square' size='large' icon={<UserOutlined />} />
        </Badge>
      </div>
    </Dropdown>
  )
}

export default connect(mapStateToProps)(ProfileMenu)
