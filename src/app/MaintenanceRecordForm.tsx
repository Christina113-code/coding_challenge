'use client'
import React from 'react'
import {z} from "zod";
import {useForm, SubmitHandler} from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import {v4 as uuidv4} from 'uuid'

const types = ['Preventive', 'Repair', 'Emergency']
const completionStatuses = ['Complete' , 'Incomplete' , 'Pending Parts']
const priorities = ['Low' , 'Medium' , 'High']
const MainetenanceRecordSchema = z.object({
  id: z.string(),
  equipmentId: z.string(),
  date: z.string().refine(
    (dateStr) => {
      const date = new Date(dateStr);
      return date <= new Date(); // Ensure date is not in the future
    },
    { message: "Install date must be in the past" }
  ), 
  type: z.enum(['Preventive', 'Repair', 'Emergency']),
  technician: z.string().min(2),
  hoursSpent: z.number().positive().max(24),
  description: z.string().min(10),
  partsReplaced: z.string().optional(), //optional dynamic arr of strings
  priority: z.enum(['Low' , 'Medium' , 'High']),
  completionStatus: z.enum(['Complete' , 'Incomplete' , 'Pending Parts'])

})
export type MaintenanceRecord = z.infer<typeof MainetenanceRecordSchema>

interface MaintenanceRecordProps {
  onSubmit: SubmitHandler<MaintenanceRecord>;
}


const MaintenanceRecordForm: React.FC<MaintenanceRecordProps>= ({onSubmit}) => {
  const {register, handleSubmit, setError, reset,formState:
    {errors, isSubmitting}, 

  } = useForm<MaintenanceRecord>({

 defaultValues: {
      id: uuidv4(),
    equipmentId: uuidv4(),
    date: new Date().toISOString().split("T")[0], // Format for input type="date"
    type: "Preventive", // Matches enum
    technician: "Bob",
    hoursSpent: 1,
    description: "description", // Format for input type="date"
    partsReplaced: "Operational", // Matches enum
    priority: "Low",
    completionStatus: "Complete",

  
  },
  resolver: zodResolver(MainetenanceRecordSchema)
});

 const handleFormSubmit: SubmitHandler<MaintenanceRecord>= data => {
   

    try {
      const newData = {...data, date: new Date(data.date)}
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
   <h1 className='p-2'>Maintenance Form</h1>
    <form onSubmit={handleSubmit(handleFormSubmit)} className='flex flex-col gap-5 p-5 justify-center font-sans'>
     
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