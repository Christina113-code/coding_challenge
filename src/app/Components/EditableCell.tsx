import React, { useEffect, useState } from 'react'

interface props  {
    getValue: () => string
}
const EditableCell : React.FC<props>= ({getValue}) => {
    const initialValue = getValue()
  const [val, setVal] = useState(initialValue)

  useEffect(() => {
    setVal(initialValue)
  },[initialValue])
  
    return (
    <input type="text" value={val} onChange={e => setVal(e.target.value)} />
  )
}

export default EditableCell