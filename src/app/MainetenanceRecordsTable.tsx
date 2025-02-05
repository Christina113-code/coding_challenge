'use client'
import React, { useState } from 'react'
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
import { Filter } from 'lucide-react';
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


const MaintenanceRecordsTable = () => {
  const [data, setData] = useState<MaintenanceRecord[]>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([])
  const [selectedRows, setSelectedRows] = useState<Record<string, boolean>>({})


  const rerender = React.useReducer(() => ({}), {})[1]

  const toggleRowSelection = (id: string) => {
    setSelectedRows(prev => ({...prev, [id]: !prev[id]}))
  }


  const onSubmit: SubmitHandler<MaintenanceRecord> = (newMaintenanceRecord) => {
    console.log("submitted")
    setData((prev: MaintenanceRecord[]) => [...prev, newMaintenanceRecord]);
   console.log(data)


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
// Implement sorting and filtering
// Group by equipment option
  return (
    <>
   
    <MaintenanceRecordForm onSubmit={onSubmit}/>
    <div className="p-2 ">
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => onFilterChange("name",e.target.value)}
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
    </div>
  
    </>
    
  )
}

export default MaintenanceRecordsTable