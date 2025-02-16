import React, { useEffect, useState } from 'react'
// Equipment status breakdown - use same coloring 

import {Equipment} from '../Forms/EquipmentForm'
import { Cell, Pie, PieChart } from 'recharts'
type EquipStatus ={
  status: string, amount: number
}
const EquipmentPieChart = ({equipmentData}: {equipmentData: Equipment[]}) => {
  const [data, setData] = useState<EquipStatus[]>([])
  const countEquipmentStatus = (equipment: Equipment[]) => {
    const data = equipment.reduce((acc, item: Equipment) => {
        if(acc[item.status]){
          acc[item.status].amount += 1
        }else{
          acc[item.status] = {status: item.status, amount: 1}
        }
        return acc;
    },{})
    return Object.values(data) as EquipStatus[];
  }

  useEffect(() => {
    const stati : EquipStatus[]= countEquipmentStatus(equipmentData);
    setData(stati);
  },[equipmentData])
  return (
    <PieChart width={730} height={250}>
  <Pie data={data} dataKey="amount" nameKey="status" cx="50%" cy="50%" outerRadius={90} fill="#8884d8"label />
  {data.map((entry, idx) => {
    <Cell key={`cell-${idx}`} />
  })}

</PieChart>
  )
}

export default EquipmentPieChart

// TODO
// PIe chart colors
//errors
//strip equipment id maintenance table input
