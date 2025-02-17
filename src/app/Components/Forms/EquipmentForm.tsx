'use client'
import React from 'react'
import {z} from "zod";
import {useForm, SubmitHandler} from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import {v4 as uuidv4} from 'uuid'



const departments = ["Machining", "Assembly","Packaging","Shipping"]
const statuses = ["Operational","Down","Maintenance","Retired"]
const EquipmentSchema = z.object({
  id: z.string(),
    name: z.string().min(3),
    location: z.string(),
    department: z.enum(["Machining", "Assembly","Packaging","Shipping"]),
    model: z.string(),
    serialNumber: z.string(),
    installDate: z.string().refine(
      (dateStr) => {
        const date = new Date(dateStr);
        return date <= new Date(); // Ensure date is not in the future
      },
      { message: "Install date must be in the past" }
    ),
    status: z.enum(["Operational","Down","Maintenance","Retired"])
})

export type Equipment = z.infer<typeof EquipmentSchema>

interface EquipmentFormProps {
  onSubmit: SubmitHandler<Equipment>;
}

// TODO: Error messages for invalid inputs!
//select all feature for bulk status updates 


const EquipmentForm: React.FC<EquipmentFormProps> = ({onSubmit}) => {
  const {register, handleSubmit, reset,setError, formState:
    {errors, isSubmitting}, 

  } = useForm<Equipment>({
    defaultValues: {
      id: uuidv4(),
    name: "Drill Press",
    location: "Assembly",
    department: "Machining", // Matches enum
    model: "DP-101",
    serialNumber: "123456789",
    installDate: new Date().toISOString().split("T")[0], // Format for input type="date"
    status: "Operational", // Matches enum
      
    },
    resolver: zodResolver(EquipmentSchema)
  });
  
  const handleFormSubmit: SubmitHandler<Equipment>= data => {
    
    try {
      const newid = uuidv4()
      const newData = {...data, id: newid, installDate: new Date(data.installDate)}
      onSubmit(newData)
      reset()
      
    } catch (error) {
      setError("root", {
        message: "Must fill in all input fields",
      });
    }

  
  }
  return (
   <>
   <h1 className='p-2 font-bold text-lg'>Equipment Form</h1>
    <form onSubmit={handleSubmit(handleFormSubmit)} className='flex flex-col gap-5 p-5 justify-center font-sans'>
      <div>
      <label htmlFor="name">Name: </label>
      <input {...register("name")}type="text" className='bg-gray-900 p-1 m-3 rounded-lg text-indigo-100' />
      {errors.name && <p>{errors.name.message}</p>}
      </div>
     <div>
     <label htmlFor="location">Location</label>
     <input {...register("location")} type="text" className='bg-gray-900 p-1 m-3 rounded-lg text-indigo-100' />
     {errors.location && <p>{errors.location.message}</p>}

     </div>
    <div>
    <label htmlFor="department">Department</label>
      <select  id="department" {...register("department")}className='bg-gray-900 p-1 m-3 rounded-lg text-indigo-100'>
          {departments.map(dpt => 

            <option key={dpt}value={dpt}>{dpt}</option>
          )}
      </select>
      {errors.department && <p>{errors.department.message}</p>}

    </div>
     <div>
     <label htmlFor="model">Model:</label>
     <input type="text"{...register("model")} className='bg-gray-900 p-1 m-3 rounded-lg text-indigo-100'/>
     </div>
     {errors.model && <p>{errors.model.message}</p>}

    <div>
    <label htmlFor="serialNumber">Serial Number: </label>
    <input type="text"{...register("serialNumber")}className='bg-gray-900 p-1 m-3 rounded-lg text-indigo-100'/>
    {errors.serialNumber && <p>{errors.serialNumber.message}</p>}

    </div>
    <div>
<label htmlFor="installDate">Install Date: </label>
    <input type="date"{...register("installDate")} className='bg-gray-900 p-1 m-3 rounded-lg text-indigo-100'/>
    {errors.installDate && <p>{errors.installDate.message}</p>}
      

    </div>
    <div>
    <label htmlFor="status">Status: </label>
      <select  id="status" {...register("status")} className='bg-gray-900 p-1 m-3 rounded-lg text-indigo-100'>
      {statuses.map(stat => 

<option key={stat}value={stat}>{stat}</option>
)}
      </select>
      {errors.status && <p>{errors.status.message}</p>}

    </div>
    <div>
    <input type="submit" className='bg-gray-900 text-white p-4 rounded-lg'/>

    </div>

    </form>

   
   </>
  )
}

export default EquipmentForm