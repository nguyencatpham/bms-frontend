import React from 'react'
// import ChartistGraph from 'react-chartist'
import { Bar } from 'react-chartjs-2'
import faker from 'faker'
import moment from 'moment'
import style from './style.module.scss'

const alerts = []
const warnings = []
for (let i = 0; i < 40; i++) {
  const data = {
    label: faker.random.number({ min: 1607731200, max: 1607763414 }),
    value: faker.random.number(50)
  }
  alerts.push(data)
  warnings.push({
    ...data,
    value: faker.random.number({ min: data.value, max: 100 })
  })
}
const Chart1 = () => {
  const data = {
    labels: alerts.map(x => moment.unix(x.label).format('HH:mm')),
    datasets: [
      {
        label: 'Báo động',
        data: alerts.map(x => x.value),
        backgroundColor: '#ee3f23'
        // yAxisID: 'y-axis-2'
      }, {
        label: 'Cảnh báo',
        data: warnings.map(x => x.value),
        backgroundColor: '#fadb14',
        borderColor: '#fadb14',
        type: 'line',
        fill: false,
        lineThickness: 1,
        // lineTension: 0,
        // spanGaps: true,
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
    <div>
      <div className='d-flex flex-wrap mb-3'>
        <div className={style.item}>
          <div className='font-size-36 text-dark font-weight-bold'>
            {faker.random.number({ min: 1000, max: 10000 })} <span className='text-success font-size-18 align-text-top'>-{faker.random.number(50)}%</span>
          </div>
          <div className='text-uppercase' style={{ color: '#625f6f' }}>Cảnh báo</div>
        </div>
        <div className={style.item}>
          <div className='font-size-36 text-dark font-weight-bold'>
            {faker.random.number({ min: 100, max: 1000 })} <span className='text-danger font-size-18 align-text-top'>+{faker.random.number(50)}%</span>
          </div>
          <div className='text-uppercase' style={{ color: '#625f6f' }}>Báo động</div>
        </div>
      </div>
      <Bar data={data} options={options} height={100} />
      {/* <ChartistGraph className='height-300' data={data} options={options} type='Bar' /> */}
    </div>
  )
}

export default Chart1
