'use client'
import React from 'react'
import {z} from "zod";
import {useForm, SubmitHandler} from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';


const types = ['Preventive', 'Repair', 'Emergency']
const completionStatuses = ['Complete' , 'Incomplete' , 'Pending Parts']
const priorities = ['Low' , 'Medium' , 'High']
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
  const onSubmit: SubmitHandler<MaintenanceRecord> = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
    } catch (error) {
      setError("root", {
        message: "Must fill in all input fields",
      });
    }
  };

  return (
   <>
   <h1 className='p-2'>Maintenance Form</h1>
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5 p-5 justify-center font-sans'>
      <div>
      <label htmlFor="name">Name: </label>
      <input {...register("id")}type="text"  />
      </div>
     <div>
     <label htmlFor="equipmentId">Equipment ID: </label>
     <input {...register("equipmentId")} type="text"  />
     </div>
    <div>
    <label htmlFor="date">date</label>
      <input  type="date"id="date" {...register("date")}/>
    </div>
     <div>
     <label htmlFor="type">type:</label>
     <select {...register("type")} >
        {types.map(type => 
          <option key={type} value={type}>{type}</option>
        )}

     </select>
     </div>
    <div>
    <label htmlFor="technician">Technician: </label>
    <input type="text"{...register("technician")}/>
    </div>
    <div>
<label htmlFor="hoursSpent">Hours Spent </label>
    <input type="text"{...register("hoursSpent")} />
      

    </div>
    <div>
    <label htmlFor="description">Description: </label>
      <input  id="description" {...register("description")}/>
      
    </div>
    <div>
      <label htmlFor="partsReplaced">Parts Replaced (optionaL)</label>
      <input type="text" {...register("partsReplaced")} />

    </div>
    <div>
      <label htmlFor="priority">priority</label>
      <select name="priority" id="priority">
        {priorities.map(priority => 
          <option key={priority}value={priority}>{priority}</option>
        )}
      </select>
    </div>
    <div>
      <label htmlFor="completionStatus">Completion Status</label>
      <select name="completionStatuses" id="completionStatuses">
        {completionStatuses.map(cs => 
          <option value={cs} key={cs}>{cs}</option>
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