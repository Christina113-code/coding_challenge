'use client'
import React from 'react'
import {z} from "zod";
import {useForm, SubmitHandler} from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';


const departments = ["Machining", "Assembly","Packaging","Shipping"]
const statuses = ["Operational","Down","Maintenance","Retired"]
const EquipmentSchema = z.object({
    name: z.string().min(3),
    location: z.string(),
    department: z.enum(["Machining", "Assembly","Packaging","Shipping"]),
    model: z.string(),
    serialNumber: z.string(),
    installDate:z.date(), //TODO: MAKE IT SO YOU CAN ONLY USE PAST DATES
    status: z.enum(["Operational","Down","Maintenance","Retired"])
})

type Equipment = z.infer<typeof EquipmentSchema>

const EquipmentForm = () => {
  const {register, handleSubmit, setError, formState:
    {errors, isSubmitting}, 

  } = useForm<Equipment>({
    defaultValues: {
      name: "Bob",
      location: "New York City", 
      model: "5FDSF6798ASDF",
      serialNumber: "54315853",
      installDate: new Date(),
      
    },
    resolver: zodResolver(EquipmentSchema)
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