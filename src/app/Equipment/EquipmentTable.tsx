'use client'
import React, { useState } from 'react'
import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper
} from '@tanstack/react-table';
import EquipmentForm, { Equipment } from './EquipmentForm';
import { SubmitHandler } from 'react-hook-form';
// Table Column Formatting 

const columnHelper = createColumnHelper<Equipment>()

export const columns = [
  columnHelper.accessor('id', {
    cell: info => info.getValue(),
    footer: info => info.column.id,
  }),
  columnHelper.accessor('name', {
    cell: info => info.getValue(),
    footer: info => info.column.id,
  }),
  columnHelper.accessor('location', {
    cell: info => info.getValue(),
    footer: info => info.column.id,
  }),
  columnHelper.accessor('department', {
    cell: info => info.getValue(),
    footer: info => info.column.id,
  }),
  columnHelper.accessor('model', {
    cell: info => info.getValue(),
    footer: info => info.column.id,
  }),
  columnHelper.accessor('serialNumber', {
    cell: info => info.getValue(),
    footer: info => info.column.id,
  }),
  columnHelper.accessor('installDate', {
    cell:  ({ getValue }) => {
      const date = getValue() as unknown as Date;
      return date.toLocaleDateString(); // Formats date as MM/DD/YYYY
    },
    footer: info => info.column.id,
  }),
  columnHelper.accessor('status', {
    cell: info => info.getValue(),
    footer: info => info.column.id,
  }),
]


const EquipmentTable = () => {
  const [data, setData] = useState<Equipment[]>([])
  const rerender = React.useReducer(() => ({}), {})[1]

  const onSubmit: SubmitHandler<Equipment> = (newEquipment) => {
    console.log("submitted")
    setData((prev: Equipment[]) => [...prev, newEquipment]);
   console.log(data)


  };
  
  const table = useReactTable<Equipment>({
    data, 
    columns,
    getCoreRowModel: getCoreRowModel()
  })
  
  return (
    <>
    <EquipmentForm onSubmit={onSubmit}/>
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

export default EquipmentTable