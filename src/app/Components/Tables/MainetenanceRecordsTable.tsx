'use client'
import React, {  useState } from 'react'
import dynamic from 'next/dynamic'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
  getFilteredRowModel, 
  getSortedRowModel,
  SortingState,
  ColumnFiltersState
} from '@tanstack/react-table';
import MaintenanceRecordForm , {MaintenanceRecord} from '../Forms/MaintenanceRecordForm';
import { SubmitHandler } from 'react-hook-form';
import { Equipment } from '../Forms/EquipmentForm';
const MaintHoursChart = dynamic(() => import('../Dashboard/MaintenanceHoursChart'), { ssr: false });

// Table Column Formatting 

const columnHelper = createColumnHelper<MaintenanceRecord>()


export const columns = [
  columnHelper.accessor('id', {
    cell: info => info.getValue(),
    footer: info => info.column.id,
  }),
  columnHelper.accessor('equipmentId', {
    cell: info => info.getValue(),
    footer: info => info.column.id,
  }),
  columnHelper.accessor('equipmentName', {
    cell: info => info.getValue(),
    footer: info => info.column.id,
  }),
  
  columnHelper.accessor('date', {
    cell:  ({ getValue }) => {
      const date = getValue() as unknown as Date;
      return date.toLocaleDateString(); // Formats date as MM/DD/YYYY
    },
    footer: info => info.column.id,
  }),
  columnHelper.accessor('type', {
    cell: info => info.getValue(),
    footer: info => info.column.id,
  }),
  columnHelper.accessor('technician', {
    cell: info => info.getValue(),
    footer: info => info.column.id,
  }),
  columnHelper.accessor('hoursSpent', {
    cell: info => info.getValue(),
    footer: info => info.column.id,
  }),
  columnHelper.accessor('description', {
    cell:  info => info.getValue(),
    footer: info => info.column.id,
  }),
  columnHelper.accessor('partsReplaced', {
    cell: info => info.getValue(),
    footer: info => info.column.id,
  }),
  columnHelper.accessor('priority', {
    cell: info => info.getValue(),
    footer: info => info.column.id,
  }),
  columnHelper.accessor('completionStatus', {
    cell: info => info.getValue(),
    footer: info => info.column.id,
  }),
]

export type MaintenanceHoursRecord = {
  department: string, 
  hours: number
}
const MaintenanceRecordsTable = ({equipmentData}: {equipmentData: Equipment[]}) => {
  const [data, setData] = useState<MaintenanceRecord[]>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([])
  const [barData, setBarData] = useState<{department: string, hours: number}[]>([]);

  const rerender = React.useReducer(() => ({}), {})[1]



  const onSubmit: SubmitHandler<MaintenanceRecord> = (newMaintenanceRecord) => {
    //check if equipment id is valid in equipment table
    //I originally tried to use a map/obj here but ran into bugs with it not updating properly and overriding previous data when using the spread operator and useState

      const equipment_item = equipmentData.find(eq => eq.id === newMaintenanceRecord.equipmentId)? equipmentData.find(eq => eq.id === newMaintenanceRecord.equipmentId): null;
      if(!equipment_item) {
        toast.error("Equipment ID not found") //change this to display to user later or put in try catch later
        return;
      };
      //join equipment name to maintenance record table
      newMaintenanceRecord.equipmentName = equipment_item.name;
      
      setData((prev: MaintenanceRecord[]) => [...prev, newMaintenanceRecord]);
  
  
  
  
      const newRecord: MaintenanceHoursRecord = {department: equipment_item.department, hours: newMaintenanceRecord.hoursSpent}
      setBarData(prev=>[...prev, newRecord])
    
    

  };

 
  
  const table = useReactTable<MaintenanceRecord>({
    data, 
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
      columnFilters
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters
  })

  const onFilterChange = (id: string, value: string) => setColumnFilters(
    prev => prev.filter(f => f.id !== id).concat({
      id, value
    })
  )
  return (
    <>
   
    <MaintenanceRecordForm onSubmit={onSubmit}/>
    <div className="p-2 ">
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => onFilterChange("technician",e.target.value)}
          className="bg-gray-900 text-white p-4 rounded-lg"
        />
      </div>
    <div className="p-2">
      <table>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id} className='p-6 cursor-pointer bg-slate-900' onClick={header.column.getToggleSortingHandler()}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {header.column.getIsSorted() === 'asc' ? '🔼': header.column.getIsSorted() === 'desc' ? '🔽' : ''}

                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          {table.getFooterGroups().map(footerGroup => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map(header => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
      <div className="h-4" />
      <button onClick={() => rerender()} className="border p-2">
        Refresh Table
      </button>
      <ToastContainer/>
    </div>
    <MaintHoursChart data={barData}/>
    </>
    
  )
}

export default MaintenanceRecordsTable