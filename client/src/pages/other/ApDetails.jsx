import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { axiosInstance } from '../../config/axiosInstance';
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export const ApDetails = () => {
  const { id } = useParams(); 
  const [appointment, setAppointment] = useState(null);
 const { register, handleSubmit } = useForm();
  
  const fetchAppointment = async () => {
          try {
              const response = await axiosInstance({ method: "GET", url: `/common/ap-details/${id}` });
              
              setAppointment(response?.data?.data);
              
              console.log( "response.data==", response.data.data);
              
          } catch (error) {
              console.log(error);
          }
      };
      useEffect(() => {
        fetchAppointment();
    }, [id]);
    // console.log( "appointment==", appointment);
    const onSubmit = async (data) => {
      try {
          console.log(data,'====data');
          
          const response = await axiosInstance({ method: "PUT", url:`/common/ap-update/${id}`, data });
          console.log(response, "====response");
          // console.log(response.data.data.employeeID, "====id");
          setAppointment((prev) => ({ ...prev, status: data.status }));
          toast.success("status updated");
         
          
      } catch (error) {
          toast.error(" failed");
          console.log(error);
      }
  };
  // const updateStatus = async (newStatus) => {
  //   try {
  //     console.log( "newStatus==", newStatus);
  //     const response =await axiosInstance({ method: "PUT", url: `/common/ap-update/${id}`}, { status: newStatus }   );
  //     console.log( "response==", response.data);
  //     // await axios.put(`/common/ap-update/${id}`, { status: newStatus });
  //     setAppointment((prev) => ({ ...prev, status: newStatus }));
  //   } catch (error) {
  //     console.error('Error updating status:', error);
  //   }
  // };

  if (!appointment) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Appointment Details</h1>
      <div className="card w-75 shadow-xl">
        <div className="card-body">
          <div className="flex flex-col items-center">
          <h2 className="card-title">Patient:  {appointment?.name || "name"}</h2>
          
          
          <p>
            <strong>Doctor:</strong> {appointment?.doctor.name|| "doctor"}
          </p>
          <p>
            <strong>Date:</strong> {appointment?.date|| "date"}
          </p>
          <p>
            <strong>Time:</strong> {appointment?.time|| "time"}
          </p>
          <p>
            <strong>Status:</strong> {appointment?.status|| "status"}
          </p>
          <div className="card-actions justify-end">
          <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control mb-4">
            <label className="label" htmlFor="status">
              <span className="label-text">status</span>
            </label>
            <select
              id="status"
              className="select select-bordered"
              {...register("status", { required: "status is required" })}
            >
              <option value="">Select a role</option>
              <option value="Waitig for Approval">Waitig for Approval</option>
              <option value="Booked">Booked</option>
              <option value="Completed">Completed</option>
              <option value="Canceled">Canceled</option>
              
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
        </div>
        </div>
      </div>
    </div>
  );
};

