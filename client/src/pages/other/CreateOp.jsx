import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from "react-hot-toast";
import { axiosInstance } from '../../config/axiosInstance';

export const CreateOp = (props) => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [doctors, setDoctors] = useState([]);

  // Fetch doctors from API
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axiosInstance({
          url: '/common/search-doctor',
          
      });
      setDoctors(response?.data?.data)
      console.log("data====",response?.data?.data);
      
  } catch (error) {
      console.log(error);
      }
    };
    fetchDoctors();
  }, []);




  const onSubmit = async (data) => {
    try {
        console.log(data,'====data');
        
        const response = await axiosInstance({ method: "POST", url: "/reception/create-op", data });
        console.log(response, "====response");
        toast.success("op-created");
        props.close()
        navigate(user.profile_route);
    } catch (error) {
        toast.error(error.response.data.message);
        console.log(error);
        console.log("error=",error.response.data.message);
        
    }
};

  return (
    <div className="p-6 max-w-lg mx-auto  shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-4">Create new Op</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Name */}
        <div className="mb-4">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            type="text"
            className="input input-bordered w-full"
            value={props.name}
            readOnly
            {...register('name', { required: 'Name is required' })}
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>

        {/* Patient */}
        <div className="mb-4">
          <label className="label">
            <span className="label-text">Patient</span>
          </label>
          <input
            type="text"
            className="input input-bordered w-full"
            value={props.patient}
            readOnly
            {...register('patient', { required: 'Patient is required' })}
          />
          {errors.patient && <p className="text-red-500 text-sm mt-1">{errors.patient.message}</p>}
        </div>

        {/* Department */}
        <div className="mb-4">
          <label className="label">
            <span className="label-text">Department</span>
          </label>
          <select
            className="select select-bordered w-full"
            {...register('department', { required: 'Department is required' })}
          >
            <option value="">Select Department</option>
            <option value="Surgery">Surgery</option>
            <option value="Gynecology">Gynecology</option>
            <option value="General OP">General OP</option>
            
            <option value="Orthopedics">Orthopedics</option>
            <option value="Cardiology">Cardiology</option>
            <option value="Pulmonology">Pulmonology</option>
          </select>
          {errors.department && <p className="text-red-500 text-sm mt-1">{errors.department.message}</p>}
        </div>

        {/* Doctor */}
        <div className="mb-4">
          <label className="label">
            <span className="label-text">Doctor</span>
          </label>
          <div className="relative">
            <select
              className="select select-bordered w-full"
              {...register('doctor', { required: 'Doctor is required' })}
            >
              <option value="">Select Doctor</option>
              {doctors?.map((doctor) => (
                <option key={doctor._id} value={doctor._id}>
                  {doctor.name}
                </option>
              ))}
            </select>
          </div>
          {errors.doctor && <p className="text-red-500 text-sm mt-1">{errors.doctor.message}</p>}
        </div>

        {/* Reception Bill */}
        <div className="mb-4">
          <label className="label">
            <span className="label-text">Reception Bill</span>
          </label>
          <input
            type="number"
            className="input input-bordered w-full"
            {...register('reception_bill', {
              required: 'Reception Bill is required',
              min: { value: 0, message: 'Reception Bill must be at least 0' },
            })}
          />
          {errors.reception_bill && <p className="text-red-500 text-sm mt-1">{errors.reception_bill.message}</p>}
        </div>

        <button type="submit" className="btn btn-primary w-full">Submit</button>
      </form>
    </div>
  );
};


