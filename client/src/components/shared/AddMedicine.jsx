import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { axiosInstance } from "../../config/axiosInstance";

export const AddMedicine = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataRes, setDataRes] = useState("");
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const employee = {
      role: "employee",
      signup_api: "/staff/signup",
      login_route: "/login",
  };


  const onSubmit = async (data) => {
      try {
          console.log(data,'====data');
          
          const response = await axiosInstance({ method: "POST", url: "/pharmacy/create-drug", data });
          console.log(response, "====response");
          // console.log(response.data.data.employeeID, "====id");
          setDataRes(response.data.data);
          toast.success("Medicine Added");
          setIsModalOpen(true);
          
      } catch (error) {
          toast.error("Sign-Up failed");
          console.log(error);
      }
  };
  // console.log(dataRes.employeeID, "=state");
  const closeModal = () => {
    setIsModalOpen(false);
    navigate(employee.login_route);
  };

  return (
   

<div className=" flex items-center justify-center">
      <div className="card w-full max-w-md  shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-4">Add new Medicine</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Name */}
          <div className="form-control mb-4">
            <label className="label" htmlFor="drug_name">
              <span className="label-text">Drug name</span>
            </label>
            <input
              id="drug_name"
              type="text"
              placeholder="Enter drug name "
              className="input input-bordered"
              {...register("drug_name", { required: "drug_name is required" })}
            />
            {/* {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>} */}
          </div>

          {/* Email */}
          <div className="form-control mb-4">
            <label className="label" htmlFor="brand_name">
              <span className="label-text">Brand name</span>
            </label>
            <input
              id="brand_name"
              type="text"
              placeholder="Enter brand name"
              className="input input-bordered"
              {...register("brand_name", {
                required: "brand_name is required",
                
              })}
            />
            {/* {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>} */}
          </div>

          <div className="form-control mb-4">
            <label className="label" htmlFor="company">
              <span className="label-text">company</span>
            </label>
            <input
              id="company"
              type="text"
              placeholder="Enter company name "
              className="input input-bordered"
              {...register("company", { required: "company is required" })}
            />
            {/* {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>} */}
          </div>
          <div className="form-control mb-4">
            <label className="label" htmlFor="price">
              <span className="label-text">price</span>
            </label>
            <input
              id="price"
              type="text"
              placeholder="price"
              className="input input-bordered"
              {...register("price", { required: "company is required" })}
            />
            {/* {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>} */}
          </div>
        
            
           

        


          {/* Submit Button */}
          <div className="form-control mt-4">
            <button type="submit" className="btn btn-primary w-full">
              Add
            </button>
          </div>
        </form>
      </div>

      
    </div>

   
  )
}
