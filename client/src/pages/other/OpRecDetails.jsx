import React, { useState, useEffect } from 'react';

import { useNavigate, useParams } from 'react-router-dom';
import { axiosInstance } from '../../config/axiosInstance';
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useFetch } from '../../hooks/useFetch';

export const OpRecDetails = () => {
const { id } = useParams(); 
  
 const { register, handleSubmit } = useForm();
   const [opDetails, isLoading, error] = useFetch(`common/get-op-details/${id}`);
 const navigate = useNavigate();


 const onSubmit = async (data) => {
  try {
      console.log(data,'====data');
      
      const response = await axiosInstance({ method: "PUT", url: `common/update-Op/${id}`, data });
      console.log(response, "====response");
      navigate("/patient");
      // console.log(response.data.data.employeeID, "====id");
      
      toast.success("Updated");
     
      
  } catch (error) {
      toast.error("updation failed");
      console.log(error);
  }
};

const RecBill=opDetails?.reception_bill
const PharmBill=opDetails?.pharmacy_bill
const total=RecBill+PharmBill
// console.log(total,"total");



  return (
    <div className="min-h-screen  flex items-center justify-center">
    <div className="card w-full max-w-md  shadow-lg p-8">
      <h2 className="text-4xl font-bold text-center mb-4">OP-Details</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Date */}
        <div className="form-control  ">
          <label className="label" >
            <span className="text-blue-400 label-text text-sm font-bold text-center">Date: {opDetails?.date}   </span>
            <span className="text-pink-400 label-text text-sm font-bold text-center">Dept: {opDetails?.department}   </span>
          </label>
        </div>
        {/* Name */}
        <div className="form-control ">
          <label className="label">
            <span className="label-text text-xl font-bold text-center">Name: {opDetails?.name}</span>
          </label>
        </div>
        {/* op_Id */}
        <div className="form-control ">
          <label className="label">
            <span className="text-blue-600 label-text text-xl font-bold text-center">op Id: {opDetails?.op_Id}</span>
          </label>
        </div>
        {/* Doctor */}
        <div className="form-control ">
          <label className="label">
            <span className="label-text text-xl font-bold text-center">Doctor: {opDetails?.doctor?.name}</span>
          </label>
        </div>
         {/* Status */}
         <div className="form-control mb-4">
          <label className="label">
            <span className="text-red-500 label-text text-xl font-bold text-center">Status: {opDetails?.status}</span>
          </label>
        </div>

        
        {/* diagnosis */}
        <div className="form-control ">
          <label className="label">
            <span className="label-text text-green-500">Diagnosis</span>
          </label>
          <textarea
            className="textarea textarea-bordered"
            readOnly
            value={opDetails?.diagnosis||"nill"}
          ></textarea>
         
        </div>
        {/* prescription */}
        <div className="form-control ">
          <label className="label">
            <span className="label-text text-green-500">Prescription</span>
          </label>
          <textarea
            className="textarea textarea-bordered"
            readOnly
            value={opDetails?.prescription||"nill"}
          ></textarea>
         
        </div>

        {/* reception bill */}
        <div className="form-control mb-4">
          <label className="label">
            <span className="text-green-600 label-text text-lg font-bold text-center">
                Reception Bill: {opDetails?.reception_bill}</span>
          </label>
        </div>
        {/* pharmacy bill */}
        <div className="form-control mb-4">
          <label className="label">
            <span className="text-green-600 label-text text-lg font-bold text-center">
            Pharmacy Bill: {opDetails?.pharmacy_bill}</span>
          </label>
        </div>
        {/* total bill */}
        <div className="form-control mb-4">
          <label className="label">
            <span className="text-green-600 label-text text-lg font-bold text-center">
            Total Bill: {total}</span>
          </label>
        </div>
        {/* total bill */}
        <div className="form-control mb-4">
          <label className="label" htmlFor="total_bill">
            <span className="label-text">Total Bill</span>
          </label>
          <textarea
            id="total_bill"
            placeholder={total||"total bill"}
            className="textarea textarea-bordered font-bold text-2xl text-red-500"
            {...register("total_bill", { required: "total_bill is required" })}
            
          ></textarea>
          {/* {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>} */}
        </div>
        {/* status */}
        <div className="form-control mb-4">
          <label className="label" htmlFor="status">
            <span className="label-text">Status</span>
          </label>
          <select
            id="role"
            className="select select-bordered"
            {...register("status", { required: "Role is required" })}
          >
            <option value="">Select a status</option>
            <option value="ACTIVE">ACTIVE</option>
            <option value="DISPENSED">DISPENSED</option>
            <option value="OUT">OUT</option>
            
          </select>
        
        </div>

        {/* Submit Button */}
        <div className="form-control mt-4">
          <button type="submit" className="btn btn-primary w-full">
            Change Status
          </button>
        </div>
      </form>
    </div>

    
  </div>
  )
}
