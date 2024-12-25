import React, { useEffect, useState } from "react";
import { useFetch } from "../../hooks/useFetch";

import { Link, useNavigate } from "react-router-dom";
export const LandingPage = () => {
    const [profileData, isLoading, error] = useFetch("/staff/profile");
  const role=profileData?.control_role
   console.log(role);
   
 
 <Link to={"/pharmacy"}> </Link>
    
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      {/* Welcome Message */}
      <h1 className="text-8xl font-bold mb-10  text-slate-600 items-center">
        Appolo Hospital Employee Dashboard
      </h1>
      <h1 className="text-4xl font-bold mb-4 text-primary">
        Welcome  {profileData?.name || "Employee"} !!
      </h1>
      <h1 className="text-2xl font-bold  text-primary">
        {profileData?.role || ""} 
      </h1>
      <p className="mb-6 text-gray-600">
        Choose Where to be in
      </p>

      {/* Role Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link to={"/doctor"}>
        <button className="btn btn-primary w-48 shadow-md hover:shadow-lg">
          Doctor
        </button>
        </Link>
        <Link to={"/pharmacy"}>
        <button className="btn btn-accent w-48 shadow-md hover:shadow-lg">
          Pharmacist
        </button>
        </Link>
        <Link to={"/reception"}>
        <button className="btn btn-info w-48 shadow-md hover:shadow-lg">
          Receptionist
        </button>
        </Link>
        <Link to={"/admin"}>
        <button className="btn btn-warning w-48 shadow-md hover:shadow-lg">
          Admin
        </button>
        </Link>
      </div>
    </div>
  );
};
