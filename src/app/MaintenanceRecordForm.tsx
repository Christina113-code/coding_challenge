'use client'
import React from 'react'
import {z} from "zod";
import {useForm, SubmitHandler} from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';


const types = ['Preventive', 'Repair', 'Emergency']
const completionStatuses = ['Complete' , 'Incomplete' , 'Pending Parts']
const MainetenanceRecordSchema = z.object({
  id: z.string(),
  equipmentId: z.string(),
  date: z.date(), //TODO: NOT FUTURE DATE
  type: z.enum(['Preventive', 'Repair', 'Emergency']),
  technician: z.string().min(2),
  hoursSpent: z.number().positive().max(24),
  description: z.string().min(10),
  partsReplaced: z.string().optional(), //optional dynamic arr of strings
  priority: z.enum(['Low' , 'Medium' , 'High']),
  completionStatus: z.enum(['Complete' , 'Incomplete' , 'Pending Parts'])

})
type MaintenanceRecord = z.infer<typeof MainetenanceRecordSchema>

const MaintenanceRecordForm = () => {
  const {register, handleSubmit, setError, formState:
    {errors, isSubmitting}, 

  } = useForm<MaintenanceRecord>({
    resolver: zodResolver(MainetenanceRecordSchema)
  });
  const onSubmit: SubmitHandler<Equipment> = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
    } catch (error) {
      setError("root", {
        message: "This email is already taken",
      });
    }
  };

  return (
   <>
   <h1 className='p-2'>Equipment Form</h1>
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5 p-5 justify-center font-sans'>
      <div>
      <label htmlFor="name">Name: </label>
      <input {...register("id")}type="text"  />
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

export default MaintenanceRecordForm