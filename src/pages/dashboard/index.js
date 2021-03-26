import React from 'react'
import { Helmet } from 'react-helmet'
import HomePage from './home'

const Dashboard = () => {
  return (
    <div>
      <Helmet title='Dashboard' />
      <HomePage />
    </div>
  )
}

export default Dashboard
