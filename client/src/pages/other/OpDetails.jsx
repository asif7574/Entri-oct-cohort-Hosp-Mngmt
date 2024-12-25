import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { axiosInstance } from '../../config/axiosInstance';
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useFetch } from '../../hooks/useFetch';

export const OpDetails = () => {
const { id } = useParams(); 
  const [appointment, setAppointment] = useState(null);
 const { register, handleSubmit } = useForm();
   const [opDetails, isLoading, error] = useFetch(`common/get-op-details/${id}`);
 const navigate = useNavigate();


 const onSubmit = async (data) => {
  try {
      console.log(data,'====data');
      
      const response = await axiosInstance({ method: "PUT", url: `doctor/prescribe-Op/${id}`, data });
      console.log(response, "====response");
      navigate("/doctor");
      // console.log(response.data.data.employeeID, "====id");
      
      toast.success("Prescribed");
     
      
  } catch (error) {
      toast.error("failed");
      console.log(error);
  }
};



  return (
    <div className="min-h-screen  flex items-center justify-center">
    <div className="card w-full max-w-md  shadow-lg p-8">
      <h2 className="text-4xl font-bold text-center mb-4">Doctor Consultation</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Date */}
        <div className="form-control  ">
          <label className="label" >
            <span className="text-blue-400 label-text text-sm font-bold text-center">Date: {opDetails?.date}   </span>
            <span className="text-pink-400 label-text text-sm font-bold text-center">Dept: {opDetails?.department}   </span>
          </label>
        </div>
        {/* Name */}
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text text-xl font-bold text-center">Name: {opDetails?.name}</span>
          </label>
        </div>
        {/* Status */}
        <div className="form-control mb-4">
          <label className="label">
            <span className="text-red-500 label-text text-sm font-bold text-center mb-4">Status: {opDetails?.status}</span>
          </label>
        </div>

      

        {/* diagnosis */}
        <div className="form-control mb-4">
          <label className="label" htmlFor="diagnosis">
            <span className="label-text">Diagnosis</span>
          </label>
          <textarea
            id="diagnosis"
            placeholder={opDetails?.diagnosis||"Enter your diagnosis"}
            className="textarea textarea-bordered"
            {...register("diagnosis", { required: "Diagnosis is required" })}
          ></textarea>
          {/* {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>} */}
        </div>
        {/* prescription */}
        <div className="form-control mb-4">
          <label className="label" htmlFor="prescription">
            <span className="label-text">Prescription</span>
          </label>
          <textarea
            id="prescription"
            placeholder={opDetails?.prescription||"Enter your prescription"}
            className="textarea textarea-bordered"
            {...register("prescription", { required: "Prescription is required" })}
          ></textarea>
          {/* {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>} */}
        </div>

        {/* status */}
        {/* <div className="form-control mb-4">
          <label className="label" htmlFor="role">
            <span className="label-text">Role</span>
          </label>
          <select
            id="role"
            className="select select-bordered"
            {...register("role", { required: "Role is required" })}
          >
            <option value="">Select a role</option>
            <option value="staff">Staff</option>
            <option value="doctor">Doctor</option>
            <option value="pharmacist">Pharmacist</option>
            <option value="receptionist">Receptionist</option>
            <option value="admin">Admin</option>
          </select>
        
        </div> */}

        {/* Submit Button */}
        <div className="form-control mt-4">
          <button type="submit" className="btn btn-primary w-full">
            Prescribe
          </button>
        </div>
      </form>
    </div>

    
  </div>
  )
}
