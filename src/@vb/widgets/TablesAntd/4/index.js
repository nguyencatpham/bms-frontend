import React from 'react'
import { Table } from 'antd'
import data from './data.json'

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Age',
    dataIndex: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
]

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.info(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
  },
  getCheckboxProps: (record) => ({
    disabled: record.name === 'Disabled User', // Column configuration not to be checked
    name: record.name,
  }),
}

class TablesAntdRowSelection extends React.Component {
  render() {
    return (
      <div className="table-responsive text-nowrap">
        <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
      </div>
    )
  }
}

export default TablesAntdRowSelection
