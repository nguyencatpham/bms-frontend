import React from 'react'
import { Table, Button, Checkbox } from 'antd'
import './style.scss'

import { Input, Space } from 'antd'
import { AudioOutlined, EllipsisOutlined } from '@ant-design/icons'

const { Search } = Input

const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: '#1890ff',
    }}
  />
)

const onSearch = (value) => console.log(value)

const columns = [
  {
    title: 'Tài khoản',
    dataIndex: 'username',
  },
  {
    title: 'Vai trò',
    dataIndex: 'role',
  },
  {
    title: 'Ngày tạo',
    dataIndex: 'created',
  },
  {
    title: (
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Search placeholder="Tìm" onSearch={onSearch} style={{ width: '240px' }} />
        <Button style={{ marginLeft: '1rem' }} type="primary">
          Thêm
        </Button>
      </div>
    ),
    dataIndex: 'options',
    responsive: ['md'],
  },
]

const data = []
for (let i = 0; i < 146; i++) {
  data.push({
    key: i,
    username: `Aeron Buxton ${i}`,
    role: 'client',
    created: `23/09/2021 19:16`,
    options: <div style={{display: 'flex', justifyContent: 'flex-end'}}>
      <EllipsisOutlined />
    </div>
  })
}

class AccountPage extends React.Component {
  state = {
    selectedRowKeys: [], // Check here to configure the default column
    loading: false,
  }

  start = () => {
    this.setState({ loading: true })
    // ajax request after empty completing
    setTimeout(() => {
      this.setState({
        selectedRowKeys: [],
        loading: false,
      })
    }, 1000)
  }

  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys)
    this.setState({ selectedRowKeys })
  }

  render() {
    const { loading, selectedRowKeys } = this.state
    const rowSelection = {
      type: 'checkbox',
      // selectedRowKeys,
      // onChange: this.onSelectChange,
    }
    const hasSelected = selectedRowKeys.length > 0
    return (
      <div className="AccountPage page">
        <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
      </div>
    )
  }
}

export default AccountPage
