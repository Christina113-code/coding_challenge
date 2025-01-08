'use client'
import { useState } from "react";
import EquipmentForm from "./Equipment/EquipmentForm";
import { SubmitHandler } from "react-hook-form";
import { Equipment } from "./Equipment/EquipmentForm";
import EquipmentTable from "./Equipment/EquipmentTable";
import MaintenanceRecordForm from "./MaintenanceRecordForm";
import MainetenanceRecordsTable from "./MainetenanceRecordsTable";


export default function Home() {
const [equipment, setEquipment] = useState<Equipment[]>([])
const onSubmit: SubmitHandler<Equipment> = async (data: Equipment) => {
  try {
    
    setEquipment(prevEq => [...prevEq, data])
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
  } catch (error) {
    console.log(error) //Change this later
  }
};
  
  return (
  <>
  {/* Equipment Form */}
  {/* <EquipmentForm onSubmit = {onSubmit}/> */}
  <EquipmentTable/>
<MainetenanceRecordsTable/>
  </>
  );
}
