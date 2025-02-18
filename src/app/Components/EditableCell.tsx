import React, { ChangeEvent, useEffect, useState } from 'react'
import { Row, Column, Table } from '@tanstack/react-table'
import { Equipment } from './Forms/EquipmentForm';

interface props  {
    getValue: () => string;
    row: Row<any>;
    column: Column<any, unknown>
    table: Table<Equipment>;
}
const EditableCell : React.FC<props>= ({getValue, row, column, table}) => {
    const initialValue = getValue()
  const [val, setVal] = useState(initialValue)

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setVal(e.target.value);
    table.options.meta?.updateData(row.index, column.id, val);
  }
  useEffect(() => {
    setVal(initialValue)
  },[initialValue])

    return (
    <input type="text" value={val} onChange={e => onChange(e)} />
  )
}

export default EditableCell