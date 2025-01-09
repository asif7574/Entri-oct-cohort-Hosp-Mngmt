import React from 'react'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { axiosInstance } from "../../config/axiosInstance";

export const CreatePatient = (props) => {
    const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
    
  const patient = {
    save_api: "/reception/create-patient",
    profile_route: "/profile",
    signup_route: "/signup",
};
  const onSubmit = async (data) => {
    try {
        console.log(data,'====data');
        
        const response = await axiosInstance({ method: "POST", url: patient.save_api, data });
        console.log(response, "====response");
        // console.log(response.data.data.employeeID, "====id");
        // setDataRes(response.data.data);
        
        toast.success("Patient Created");
        // setIsModalOpen(true);
        props.modalState()
        props.refresh()
        
    } catch (error) {
        toast.error("failed");
        console.log(error);
    }
};
    
  return (
    <div className="flex justify-center items-center ">
    <div className="w-full max-w-md  p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center mb-6">Patient Details</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Name */}
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            type="text"
            placeholder="Enter name"
            className="input input-bordered"
            {...register('name', { required: 'Name is required' })}
          />
          {/* {errors.name && (
            <span className="text-red-500 text-sm">{errors.name.message}</span>
          )} */}
        </div>

        {/* Email */}
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            placeholder="Enter email"
            className="input input-bordered"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Invalid email address',
              },
            })}
          />
          {/* {errors.email && (
            <span className="text-red-500 text-sm">{errors.email.message}</span>
          )} */}
        </div>

        {/* Mobile */}
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Mobile</span>
          </label>
          <input
            type="tel"
            placeholder="Enter mobile number"
            className="input input-bordered"
            {...register('mobile', {
              required: 'Mobile number is required',
              pattern: {
                value: /^[0-9]{10}$/,
                message: 'Invalid mobile number',
              },
            })}
          />
          {/* {errors.mobile && (
            <span className="text-red-500 text-sm">{errors.mobile.message}</span>
          )} */}
        </div>

        {/* Address */}
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Address</span>
          </label>
          <textarea
            placeholder="Enter address"
            className="textarea textarea-bordered"
            {...register('address', { required: 'Address is required' })}
          ></textarea>
          {/* {errors.address && (
            <span className="text-red-500 text-sm">{errors.address.message}</span>
          )} */}
        </div>

        {/* Sex */}
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Sex</span>
          </label>
          <select
            className="select select-bordered"
            {...register('sex', { required: 'Please select sex' })}
          >
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {/* {errors.sex && (
            <span className="text-red-500 text-sm">{errors.sex.message}</span>
          )} */}
        </div>

        {/* Age */}
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Age</span>
          </label>
          <input
            type="number"
            placeholder="Enter age"
            className="input input-bordered"
            {...register('age', {
              required: 'Age is required',
              min: {
                value: 0,
                message: 'Age cannot be negative',
              },
            })}
          />
          {/* {errors.age && (
            <span className="text-red-500 text-sm">{errors.age.message}</span>
          )} */}
        </div>
       
        <button  type="submit" className="btn btn-primary w-full">
          Submit
        </button>
         
       
      </form>
    </div>
  </div>
  )
}
