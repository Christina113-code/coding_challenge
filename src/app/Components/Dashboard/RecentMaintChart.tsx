import React, { useEffect, useState } from 'react'
import { BarChart , CartesianGrid, XAxis,YAxis, Tooltip, Legend, Bar} from 'recharts';
import {MaintenanceRecord} from '../Forms/MaintenanceRecordForm'
const RecentMaintChart = ({data}: {data:MaintenanceRecord[]}) => {
    const [recentData, setRecentData] = useState<{date: string, hours: number}[]>([])    
    const filterByDate = (data: MaintenanceRecord[]) => {
        const filteredData = data.reduce((acc, item) => {
            if(acc[item.date]){
                acc[item.date].hours += item.hoursSpent
            }else{
                acc[item.date] = {date: item.date, hours: item.hoursSpent}
            }
            return acc;
        }, {})
        return Object.values(filteredData);
        
    }

    useEffect(() => {
        const newData : {date:string, hours:number}[] = filterByDate(data)
        console.log(newData);
        setRecentData(newData)
        
    }, [data])
  return (
    <>
    <h1>Past Week's Maintenance Records</h1>
    <BarChart  width={730} height={250} data={recentData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis/>
      <Tooltip />
      <Legend /> 
    
       <Bar dataKey="hours" fill="#8884d8" label={{fill: 'white'}} barSize={130}/>
    </BarChart>
    </>
     
  )
}

export default RecentMaintChart