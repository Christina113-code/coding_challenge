import React from 'react'
import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
} from '@tanstack/react-table';
import { Equipment } from './EquipmentForm';
import { v4 as uuidv4 } from "uuid";
// Table Column Formatting 
export const columns: ColumnDef<Equipment>[] = [
  {
    accessorKey: 'name',
    header: 'Name',

  },
  {
    accessorKey: 'location',
    header: 'Location',
  },
  {
    accessorKey: 'department',
    header: 'department',
  },
  {
    accessorKey: 'model',
    header: 'Model',
  },
  {
    accessorKey: 'serialNumber',
    header: 'Serial Number',
  },
  {
    accessorKey: 'installDate',
    header: 'Install Date',
  },
  {
    accessorKey: 'status',
    header: 'Status',
  }
]

interface EquipmentDataProps {
  equipment: Equipment[];
}

const EquipmentTable: React.FC<EquipmentDataProps>= ({equipment}) => {

  return (
    <>
    <ul>
    {equipment.map((eq: Equipment) => 

<li key={uuidv4()}>{eq.name}</li>
)}
    </ul>
    
    </>
  )
}

export default EquipmentTable