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
import EquipmentForm, { Equipment } from './EquipmentForm';
import { SubmitHandler } from 'react-hook-form';
import { Filter } from 'lucide-react';

const columnHelper = createColumnHelper<Equipment>();

export const columns = [
  columnHelper.accessor('id', {
    cell: info => info.getValue(),
    footer: info => info.column.id,
    filterFn: 'includesString',
  }),
  columnHelper.accessor('name', {
    cell: info => info.getValue(),
    footer: info => info.column.id,
    filterFn: 'includesString',
  }),
  columnHelper.accessor('location', {
    cell: info => info.getValue(),
    footer: info => info.column.id,
    filterFn: 'includesString',
  }),
  columnHelper.accessor('department', {
    cell: info => info.getValue(),
    footer: info => info.column.id,
    filterFn: 'includesString',
  }),
  columnHelper.accessor('model', {
    cell: info => info.getValue(),
    footer: info => info.column.id,
    filterFn: 'includesString',
  }),
  columnHelper.accessor('serialNumber', {
    cell: info => info.getValue(),
    footer: info => info.column.id,
    filterFn: 'includesString',
  }),
  columnHelper.accessor('installDate', {
    cell: ({ getValue }) => {
      const date = getValue() as unknown as Date;
      return date.toLocaleDateString();
    },
    footer: info => info.column.id,
    filterFn: 'includesString',
  }),
  columnHelper.accessor('status', {
    cell: info => info.getValue(),
    footer: info => info.column.id,
    filterFn: 'includesString',
  }),
];

interface EquipmentTableProps {
  data: Equipment[],
  bulkUpdateStatus: (newStatus: string) => void;
  toggleRowSelection: (id: string) => void; 
  selectedRows: Record<string, boolean>
}
const EquipmentTable: React.FC<EquipmentTableProps> = ({data, bulkUpdateStatus,toggleRowSelection, selectedRows }) => {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([
  ]);
  const [sorting, setSorting] = useState<SortingState>([]);
  

  const [search, setSearch] = useState('')
  const rerender = React.useReducer(() => ({}), {})[1];



  
  const filteredData = data.filter(item => 
    Object.values(item).some(value => 
      value.toString().toLowerCase().includes(search.toLowerCase())
    )
  
  )
  const table = useReactTable<Equipment>({
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
    onColumnFiltersChange: setColumnFilters,
  });

const onFilterChange = (id: string, value: string) => setColumnFilters(
  prev => prev.filter(f => f.id !== id).concat({
    id, value
  })
)

  return (
    <>
     
      <div className="p-2 ">
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => onFilterChange("name",e.target.value)}
          className="bg-gray-900 text-white p-4 rounded-lg"
        />
      </div>
      
      <div className="p-2">
        <table className="p-1 rounded-lg">
          <thead className="p-1">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id} className="p-1 bg-slate-900">
                <th>Select</th>
                {headerGroup.headers.map(header => (
                  <th key={header.id} className="p-6 cursor-pointer" onClick={header.column.getToggleSortingHandler()}>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    {header.column.getIsSorted() === 'asc' ? ' 🔼' : header.column.getIsSorted() === 'desc' ? ' 🔽' : ''}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr
                key={row.id}
                className={
                  row.original.status === 'Operational'
                    ? 'bg-green-900'
                    : row.original.status === 'Down'
                    ? 'bg-blue-900'
                    : row.original.status ==='Maintenance'? 
                    'bg-red-900':
                    'bg-purple-900'
                }
              >
                <td>
                  <input
                    type="checkbox" 
                    checked={!!selectedRows[row.original.id]}
                    onChange={() => toggleRowSelection(row.original.id)}
                  />
                </td>
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="p-6">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
          <tfoot>
            {table.getFooterGroups().map(footerGroup => (
              <tr key={footerGroup.id}>
                <th>Select</th>
                {footerGroup.headers.map(header => (
                  <th key={header.id}>
                    {flexRender(header.column.columnDef.footer, header.getContext())}
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
        <div className="flex gap-2 mt-4">
          <button onClick={() => bulkUpdateStatus('Operational')} className="border p-2 bg-green-900">
            Mark as Operational
          </button>
          <button onClick={() => bulkUpdateStatus('Down')} className="border p-2 bg-blue-900">
            Mark as Down
          </button>
          <button onClick={() => bulkUpdateStatus('Maintenance')} className="border p-2 bg-red-900">
            Mark as Maintenance
          </button>
          <button onClick={() => bulkUpdateStatus('Retired')} className="border p-2 bg-purple-900">
            Mark as Retired
          </button>
        </div>
      </div>
    </>
  );
};

export default EquipmentTable;
