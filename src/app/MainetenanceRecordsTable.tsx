'use client'
import React, { useState } from 'react'
import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper
} from '@tanstack/react-table';
import MaintenanceRecordForm , {MaintenanceRecord} from './MaintenanceRecordForm';
import { SubmitHandler } from 'react-hook-form';
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
  const rerender = React.useReducer(() => ({}), {})[1]

  const onSubmit: SubmitHandler<MaintenanceRecord> = (newMaintenanceRecord) => {
    console.log("submitted")
    setData((prev: MaintenanceRecord[]) => [...prev, newMaintenanceRecord]);
   console.log(data)


  };
  
  const table = useReactTable<MaintenanceRecord>({
    data, 
    columns,
    getCoreRowModel: getCoreRowModel()
  })
  
  return (
    <>
    <MaintenanceRecordForm onSubmit={onSubmit}/>
    <div className="p-2">
      <table>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
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