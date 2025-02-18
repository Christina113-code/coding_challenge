'use client'
import {  useState } from "react";
import EquipmentForm from "./Components/Forms/EquipmentForm";
import { SubmitHandler } from "react-hook-form";
import { Equipment } from "./Components/Forms/EquipmentForm";
import EquipmentTable from './Components/Tables/EquipmentTable'
import MainetenanceRecordsTable from "./Components/Tables/MainetenanceRecordsTable";
import EquipmentPieChart from "./Components/Dashboard/EquipmentPieChart";

import dynamic from 'next/dynamic'


const DynamicPieChart = dynamic(() => import('./Components/Dashboard/EquipmentPieChart'), { ssr: false });

export default function Home() {
const [equipment, setEquipment] = useState<Equipment[]>([])
const [selectedRows, setSelectedRows] = useState<Record<string, boolean>>({});




const onSubmit: SubmitHandler<Equipment> = async (data: Equipment) => {
  try {
    
    setEquipment(prevEq => [...prevEq, data])
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
  } catch (error) {
    console.log(error) //Change this later
  }
};
  
const bulkUpdateStatus = (newStatus: string) => {
    
  setEquipment(prevData =>
    prevData.map(equipment =>
      selectedRows[equipment.id] ? { ...equipment, status: newStatus } : equipment
    )
  );
  setSelectedRows({});
};

const updateData = (rowIndex: number, columnId: number, value: string) => {
  setEquipment((old) =>
    old.map((row, index) => {
      if (index === rowIndex) {
        return {
          ...row,
          [columnId]: value,
        };
      }
      return row;
    })
  );
};
const toggleRowSelection = (id: string) => {
  setSelectedRows(prev => ({ ...prev, [id]: !prev[id] }));
};

const selectAllRows = () => {
 

  const newRows = Object.fromEntries(
    Object.keys(selectedRows).map(key => [key, true])
  )
  equipment.forEach(eq => {
    if(!Object.keys(selectedRows).includes(eq.id)){
     setSelectedRows(prev => ({...prev, [eq.id]: true}))
    }
  }
)}
 

  return (
  <>
  <div className="bg-gray-800 text-white">
    <EquipmentForm onSubmit={onSubmit} />
    <DynamicPieChart equipmentData={equipment}/>
  <EquipmentTable data = {equipment} bulkUpdateStatus={bulkUpdateStatus} toggleRowSelection={toggleRowSelection} selectedRows={selectedRows} updateData={updateData} selectAllRows = {selectAllRows}/>
  <MainetenanceRecordsTable equipmentData={equipment}/>
  
  </div>
  {/* Equipment Form */}
  {/* <EquipmentForm onSubmit = {onSubmit}/> */}
  
  </>
  );
}
