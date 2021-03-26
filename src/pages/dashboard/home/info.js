import React from 'react'
import { Button, Modal, Table } from 'antd'
import { Line } from 'react-chartjs-2'
import faker from 'faker'
import moment from 'moment'

const alerts = []
for (let i = 0; i < 10; i++) {
  const data = {
    label: faker.random.number({ min: 1607731200, max: 1607763414 }),
    value: faker.random.number(10)
  }
  alerts.push(data)
}
const supportCasesTableData = [
  {
    key: '1',
    type: 'V0',
    amount: faker.random.number()
  },
  {
    key: '2',
    type: 'E',
    amount: faker.random.number()
  },
  {
    key: '3',
    type: 'SoC',
    amount: faker.random.number()
  },
  {
    key: '4',
    type: 'R',
    amount: faker.random.number()
  },
  {
    key: '5',
    type: 'T',
    amount: faker.random.number()
  },
  {
    key: '6',
    type: 'Thời hạn bảo hành',
    amount: ` Còn lại ${faker.random.number(24)} tháng`
  },
  {
    key: '7',
    type: 'Ngày sản xuất ',
    amount: faker.date.recent().toLocaleDateString()
  }

]
const supportCasesTableColumns = [
  {
    title: 'Loại',
    dataIndex: 'type',
    key: 'type'
  },
  {
    title: 'Thông số',
    key: 'amount',
    dataIndex: 'amount',
    render: amount => {
      if (amount === 'Negative') {
        return <span className='text-danger font-weight-bold'>{amount}</span>
      }
      return <span className='text-primary font-weight-bold'>{amount}</span>
    }
  }
]
const DefaultPage = ({ modal, setModal }) => {
  const data = {
    labels: alerts.map(x => moment.unix(x.label).format('HH:mm')),
    datasets: [
      {
        label: 'V0',
        data: alerts.map(x => faker.random.number({ min: 0, max: x.value })),
        backgroundColor: '#f5222d',
        borderColor: '#f5222d',
        type: 'line',
        fill: false,
        lineThickness: 1,
        lineTension: 0,
        spanGaps: true,
        pointBorderWidth: 0,
        pointStyle: 'line',
        // borderJoinStyle:'round',
        boderWidth: 0.5
        // yAxisID: 'y-axis-1'
      }, {
        label: 'E',
        data: alerts.map(x => faker.random.number({ min: 0, max: x.value - 1 })),
        backgroundColor: '#fadb14',
        borderColor: '#fadb14',
        type: 'line',
        fill: false,
        lineThickness: 1,
        lineTension: 0,
        spanGaps: true,
        pointBorderWidth: 0,
        pointStyle: 'line',
        // borderJoinStyle:'round',
        boderWidth: 0.5
        // yAxisID: 'y-axis-1'
      }, {
        label: 'SoC',
        data: alerts.map(x => faker.random.number({ min: 0, max: x.value - 2 })),
        backgroundColor: '#096dd9',
        borderColor: '#096dd9',
        type: 'line',
        fill: false,
        lineThickness: 1,
        lineTension: 0,
        spanGaps: true,
        pointBorderWidth: 0,
        pointStyle: 'line',
        // borderJoinStyle:'round',
        boderWidth: 0.5
        // yAxisID: 'y-axis-1'
      }, {
        label: 'R',
        data: alerts.map(x => faker.random.number({ min: 0, max: x.value - 3 })),
        backgroundColor: '#389e0d',
        borderColor: '#389e0d',
        type: 'line',
        fill: false,
        lineThickness: 1,
        lineTension: 0,
        spanGaps: true,
        pointBorderWidth: 0,
        pointStyle: 'line',
        // borderJoinStyle:'round',
        boderWidth: 0.5
        // yAxisID: 'y-axis-1'
      }, {
        label: 'T',
        data: alerts.map(x => faker.random.number({ min: 0, max: x.value - 4 })),
        backgroundColor: '#eb2f96',
        borderColor: '#eb2f96',
        type: 'line',
        fill: false,
        lineThickness: 1,
        lineTension: 0,
        spanGaps: true,
        pointBorderWidth: 0,
        pointStyle: 'line',
        // borderJoinStyle:'round',
        boderWidth: 0.5
        // yAxisID: 'y-axis-1'
      }
    ]
  }

  const options = {
    // legend: {
    //   display: false
    // },
    elements: {
      point: {
        radius: 0
      }
    },
    scales: {
      yAxes: [{
        id: 'y-axis-1',
        display: true,
        ticks: {
          suggestedMin: 0, // minimum will be 0, unless there is a lower value.
          // OR //
          beginAtZero: true, // minimum value will be 0.
          stepsize: 1,
          suggestedMax: 10,
          // max: 25000
          callback: function (value, index, values) {
            if (Math.floor(value) === value) {
              return value
            }
          }

        }
      }]
    },
    tooltips: {
      callbacks: {
        label: function (tooltipItem) {
          return tooltipItem.yLabel
        }
      }
    }
  }
  return (
    <>
      <Modal
        key='batery-details'
        className='modal-cus modal-monitoring'
        visible={!!modal}
        onCancel={() => setModal(false)}
        width={1200}
        title={<span>Thông tin Block: <span className='cabinet-heading cabinet-name'><span className='cabinet-status-online' />10</span></span>}
        footer={[
          <>
            <Button className='btn btn-export' onClick={() => setModal(false)}>Đóng</Button>
          </>
        ]}
      >
        <div className='row'>
          <div className='col-md-8 col-xs-12'>
            <div>
              <Line data={data} options={options} height={400} width={800} />
            </div>
          </div>
          <div className='col-md-4 col-xs-12'>
            <div className='card'>
              <div className='card-header border-0 pb-0'>
                <div className='cui__utils__heading mb-0'>
                  <strong className='text-uppercase font-size-16'>Thông tin chi tiết</strong>
                </div>
              </div>
              <div className='card-body'>
                <div className='mb-3'>
                  <Table
                    dataSource={supportCasesTableData}
                    columns={supportCasesTableColumns}
                    pagination={false}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}
export default DefaultPage
