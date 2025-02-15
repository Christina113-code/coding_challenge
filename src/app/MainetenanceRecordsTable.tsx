'use client'
import React, {  useEffect, useState } from 'react'
import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
  getFilteredRowModel, 
  getSortedRowModel,
  SortingState,
  ColumnFiltersState
} from '@tanstack/react-table';
import MaintenanceRecordForm , {MaintenanceRecord} from './MaintenanceRecordForm';
import { SubmitHandler } from 'react-hook-form';
import { Equipment } from './Equipment/EquipmentForm';
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


const MaintenanceRecordsTable = ({equipmentData}: {equipmentData: Equipment[]}) => {
  const [data, setData] = useState<MaintenanceRecord[]>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([])


  const rerender = React.useReducer(() => ({}), {})[1]


useEffect(() => {
  console.log(equipmentData);
}, [equipmentData])

  const onSubmit: SubmitHandler<MaintenanceRecord> = (newMaintenanceRecord) => {
    //check if equipment id is valid in equipment table 
    if(!equipmentData.find(eq => eq.id === newMaintenanceRecord.equipmentId )) {
      console.log("equipment id not found");
      
      return;
    };
    const equipment_name = equipmentData.find(eq => eq.id === newMaintenanceRecord.equipmentId).name;
    newMaintenanceRecord.equipmentName = equipment_name;
    console.log(newMaintenanceRecord)
    setData((prev: MaintenanceRecord[]) => [...prev, newMaintenanceRecord]);


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
//TODO
// Include equipment name (joined from equipment data)
// Group by equipment option
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
      <button onClick={() => console.log(equipmentMap)}>fjdskalfj</button>
    </div>
  
    </>
    
  )
}

export default MaintenanceRecordsTable