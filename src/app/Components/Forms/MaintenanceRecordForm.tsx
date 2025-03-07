'use client'
import React from 'react'
import {optional, z} from "zod";
import {useForm, SubmitHandler} from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import {v4 as uuidv4} from 'uuid'

const types = ['Preventive', 'Repair', 'Emergency']
const completionStatuses = ['Complete' , 'Incomplete' , 'Pending Parts']
const priorities = ['Low' , 'Medium' , 'High']
const MainetenanceRecordSchema = z.object({
  id: z.string(),
  equipmentId: z.string(),
  equipmentName: z.string().optional(),
  date: z.string().refine(
    (dateStr) => {
      const date = new Date(dateStr);
      return date <= new Date(); // Ensure date is not in the future
    },
    { message: "Install date must be in the past" }
  ), 
  type: z.enum(['Preventive', 'Repair', 'Emergency']),
  technician: z.string().min(2),
  hoursSpent: z.coerce.number().positive().max(24),
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
    equipmentId: '1',
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

      const newData = {...data,  date: new Date(data.date)}
      onSubmit(newData) //fix laturr
      reset()
      
    } catch (error) {
      setError("root", {
        message: "Must fill in all input fields",
      });
    }
  }
  return (
   <>
   <h1 className='p-2 text-lg font-bold'>Maintenance Form</h1>
    <form onSubmit={handleSubmit(handleFormSubmit)} className='flex flex-col gap-5 p-5 justify-center font-sans'>
     
     <div>
     <label htmlFor="equipmentId">Equipment ID: </label>
     <input {...register("equipmentId")} type="text" className='bg-gray-900 p-1 m-3 rounded-lg text-indigo-100' />
     {errors.equipmentId && <p>{errors.equipmentId.message}</p>}

     </div>
    <div>
    <label htmlFor="date">date</label>
      <input  type="date"id="date" {...register("date")}className='bg-gray-900 p-1 m-3 rounded-lg text-indigo-100'/>
      {errors.date && <p>{errors.date.message}</p>}

    </div>
     <div>
     <label htmlFor="type">type:</label>
     <select {...register("type")} className='bg-gray-900 p-1 m-3 rounded-lg text-indigo-100'>
        {types.map(type => 
          <option key={type} value={type}>{type}</option>
        )}

     </select>
     {errors.type && <p>{errors.type.message}</p>}

     </div>
    <div>
    <label htmlFor="technician">Technician: </label>
    <input type="text"{...register("technician")}className='bg-gray-900 p-1 m-3 rounded-lg text-indigo-100'/>
    {errors.technician && <p>{errors.technician.message}</p>}

    </div>
    <div>
<label htmlFor="hoursSpent">Hours Spent </label>
    <input type="number"{...register("hoursSpent")} className='bg-gray-900 p-1 m-3 rounded-lg text-indigo-100'/>
      
    {errors.hoursSpent && <p>{errors.hoursSpent.message}</p>}

    </div>
    <div>
    <label htmlFor="description">Description: </label>
      <input  id="description" {...register("description")}className='bg-gray-900 p-1 m-3 rounded-lg text-indigo-100'/>
      {errors.description && <p>{errors.description.message}</p>}
      
    </div>
    <div>
      <label htmlFor="partsReplaced">Parts Replaced (optionaL)</label>
      <input type="text" {...register("partsReplaced")} className='bg-gray-900 p-1 m-3 rounded-lg text-indigo-100'/>
      {errors.partsReplaced && <p>{errors.partsReplaced.message}</p>}

    </div>
    <div>
      <label htmlFor="priority">priority</label>
      <select name="priority" id="priority"className='bg-gray-900 p-1 m-3 rounded-lg text-indigo-100'>
        {priorities.map(priority => 
          <option key={priority}value={priority}>{priority}</option>
        )}
      </select>
      {errors.priority && <p>{errors.priority.message}</p>}

    </div>
    <div>
      <label htmlFor="completionStatus">Completion Status</label>
      <select name="completionStatuses" id="completionStatuses"className='bg-gray-900 p-1 m-3 rounded-lg text-indigo-100'>
        {completionStatuses.map(cs => 
          <option value={cs} key={cs}>{cs}</option>
        )}
         </select>
         {errors.completionStatus && <p>{errors.completionStatus.message}</p>}

    </div>
    <div>
    <input type="submit" className='bg-gray-900 text-white p-4 rounded-lg '/>

    </div>
    

    </form>
   </>
  )
}

export default MaintenanceRecordForm