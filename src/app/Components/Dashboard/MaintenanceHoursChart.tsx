'use client';
import React, { useEffect, useState } from 'react'
import { BarChart , CartesianGrid, XAxis,YAxis, Tooltip, Legend, Bar} from 'recharts';
import {MaintenanceHoursRecord} from '../Tables/MainetenanceRecordsTable'

//maintenance hours by department
const MaintenanceHoursChart = ({data}: {data: MaintenanceHoursRecord[]}) => {
    const [summedData, setSummedData] = useState<MaintenanceHoursRecord[]>([])
    const sumDepartmentHours = (records:MaintenanceHoursRecord[])=> {
      const acc = records.reduce((acc, item: MaintenanceHoursRecord) => {
        if(acc[item.department]){
          acc[item.department].hours +=item.hours;
        }else{
         acc[item.department] = {department: item.department, hours:item.hours}
        }
        return acc;
      }, {} as {[key: string]: {department:string, hours:number}})
      return Object.values(acc);
    }
    useEffect(() => {
      const newData = sumDepartmentHours(data);
      
    setSummedData(newData);
  },[data])


  return (
    <BarChart  width={730} height={250} data={summedData}>
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis dataKey="department" />
  <YAxis/>
  <Tooltip />
  <Legend /> 

   <Bar dataKey="hours" fill="#8884d8" label={{fill: 'white'}} barSize={130}/>
</BarChart>
  )
}

export default MaintenanceHoursChart