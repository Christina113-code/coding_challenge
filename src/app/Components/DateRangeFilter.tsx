import { Column } from '@tanstack/react-table';
import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';
type DateRange = [Date | null, Date | null];
interface DateRangeFilterProps {
    column: Column<any, unknown>
}
const DateRangeFilter : React.FC<DateRangeFilterProps>= ({column}) => {
    const [dateRange, setDateRange] = useState<DateRange>([null, null]);
  const [startDate, endDate] = dateRange;
    
    const onChange = (dates: DateRange) => {
        setDateRange(dates);
         column.setFilterValue(dates);
    }
  return (
    <DatePicker
    selected={startDate}
    onChange={onChange}
    startDate={startDate}
    selectsRange
    isClearable
    placeholderText='Select date range'
    
    />
  )
}

export default DateRangeFilter