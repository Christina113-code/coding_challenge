'use client'
import { useEffect, useRef, useState } from "react";
import EquipmentForm from "./Equipment/EquipmentForm";
import { SubmitHandler } from "react-hook-form";
import { Equipment } from "./Equipment/EquipmentForm";
import EquipmentTable from "./Equipment/EquipmentTable";
import MaintenanceRecordForm from "./MaintenanceRecordForm";
import MainetenanceRecordsTable from "./MainetenanceRecordsTable";


export default function Home() {
const [equipment, setEquipment] = useState<Equipment[]>([])
const [selectedRows, setSelectedRows] = useState<Record<string, boolean>>({});
const [equipIds, setEquipIds] = useState<Record<string, string>[]>([])




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

const toggleRowSelection = (id: string) => {
  setSelectedRows(prev => ({ ...prev, [id]: !prev[id] }));
};
  return (
  <>
  <div className="bg-gray-800 text-white">
    <EquipmentForm onSubmit={onSubmit} />
  <EquipmentTable data = {equipment} bulkUpdateStatus={bulkUpdateStatus} toggleRowSelection={toggleRowSelection} selectedRows={selectedRows}/>
  <MainetenanceRecordsTable equipmentData={equipment}/>
  </div>
  {/* Equipment Form */}
  {/* <EquipmentForm onSubmit = {onSubmit}/> */}
  
  </>
  );
}
