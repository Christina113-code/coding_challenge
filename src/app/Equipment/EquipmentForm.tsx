'use client'
import React from 'react'
import {z} from "zod";
import {useForm, SubmitHandler} from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';



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


const EquipmentForm: React.FC<EquipmentFormProps> = ({onSubmit}) => {
  const {register, handleSubmit, reset, formState:
    {errors, isSubmitting}, 

  } = useForm<Equipment>({
    defaultValues: {
      id: "default-id",
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
  const equipment: Equipment[] = []
  
  const handleFormSubmit: SubmitHandler<Equipment>= data => {
    const newData = {...data, installDate: new Date(data.installDate)}
    console.log(newData)
    onSubmit(newData)
    reset()

  
  }
  return (
   <>
   <h1 className='p-2'>Equipment Form</h1>
    <form onSubmit={handleSubmit(handleFormSubmit)} className='flex flex-col gap-5 p-5 justify-center font-sans'>
      <div>
      <label htmlFor="name">Name: </label>
      <input {...register("name")}type="text"  />
      </div>
     <div>
     <label htmlFor="location">Location</label>
     <input {...register("location")} type="text"  />
     </div>
    <div>
    <label htmlFor="department">Department</label>
      <select  id="department" {...register("department")}>
          {departments.map(dpt => 

            <option key={dpt}value={dpt}>{dpt}</option>
          )}
      </select>
    </div>
     <div>
     <label htmlFor="model">Model:</label>
     <input type="text"{...register("model")} />
     </div>
    <div>
    <label htmlFor="serialNumber">Serial Number: </label>
    <input type="text"{...register("serialNumber")}/>
    </div>
    <div>
<label htmlFor="installDate">Install Date: </label>
    <input type="date"{...register("installDate")} />
      

    </div>
    <div>
    <label htmlFor="status">Status: </label>
      <select  id="status" {...register("status")}>
      {statuses.map(stat => 

<option key={stat}value={stat}>{stat}</option>
)}
      </select>
    </div>
    <div>
    <input type="submit" className='bg-slate-100 text-black p-3 rounded-sm '/>

    </div>

    </form>

   
   </>
  )
}

export default EquipmentForm