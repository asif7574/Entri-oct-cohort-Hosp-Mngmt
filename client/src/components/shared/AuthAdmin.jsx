import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { axiosInstance } from "../../config/axiosInstance";

export const AuthAdmin = () => {

     const { register, handleSubmit } = useForm();

     const onSubmit = async (data) => {
        try {
            console.log(data,'====data');
            
            const response = await axiosInstance({ method: "PUT", url: "admin/authorize", data });
            console.log(response, "====response");
            
            toast.success("Authourized");
        
        } catch (error) {
            toast.error("S failed");
            console.log(error);
        }
    };

  return (
    <div className="card-actions justify-end">
    <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
    <div className="form-control mb-4">
            <label className="label" htmlFor="employeeID">
              <span className="label-text">employeeID</span>
            </label>
            <input
              id="employeeID"
              type="text"
              placeholder="Enter employeeID"
              className="input input-bordered"
              {...register("employeeID", { required: "employeeID is required" })}
            />
          </div>
    <div className="form-control mb-4">
      <label className="label" htmlFor="role">
        <span className="label-text">role</span>
      </label>
      <select
        id="role"
        className="select select-bordered"
        {...register("role", { required: "role is required" })}
      >
        <option value="">Select a role</option>
        <option value="staff">staff</option>
        <option value="doctor">doctor</option>
        <option value="pharmacist">pharmacist</option>
        <option value="receptionist">receptionist</option>
        <option value="admin">admin</option>
        
      </select>
   
    </div>

    {/* Submit Button */}
    <div className="form-control mt-4">
      <button type="submit" className="btn btn-primary w-full">
        Update status
      </button>
    </div>
      </form>
    </div>
  )
}

