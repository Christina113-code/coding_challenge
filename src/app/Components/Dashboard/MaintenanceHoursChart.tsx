'use client';
import React, { useEffect, useState } from 'react'
import { BarChart , CartesianGrid, YAxis, Tooltip, Legend} from 'recharts';
import {Equipment} from '../Forms/EquipmentForm'
import { MaintenanceRecord } from '../Forms/MaintenanceRecordForm';
//maintenance hours by department
const MaintenanceHoursChart = ({data}: {data: {department: string, hours: number}[]}) => {

  useEffect(() => {
    console.log(data)
  },[data])
  return (
    <BarChart width={730} height={250} data={data}>
  {/* <CartesianGrid strokeDasharray="3 3" /> */}
  {/* <XAxis dataKey="name" /> */}
  {/* <YAxis />
  <Tooltip />
  <Legend /> */}
  {/* <Bar dataKey="pv" fill="#8884d8" />
  <Bar dataKey="uv" fill="#82ca9d" /> */}
</BarChart>
  )
}

export default MaintenanceHoursChart