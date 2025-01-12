import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useFetch } from '../../hooks/useFetch';
import { axiosInstance } from "../../config/axiosInstance";
import { TableAdmin } from '../../components/shared/TableAdmin';
import { AuthAdmin } from '../../components/shared/AuthAdmin';

export const Admin = () => {
  const [authPend, isLoading, error] = useFetch("/admin/auth-pending");
      
      
      

  return (
    <div className=' flex flex-col items-center justify-center gap-10'>
      <div>
        <Link to={"/sales"}>
        <button className='btn btn-accent'>  Sales of this month</button>
        </Link>
      </div>
      <div>

      </div>
      <div className="flex w-full flex-col lg:flex-row">
  <div className="card bg-base-300 rounded-box grid h-150 flex-grow place-items-center">
    
    <div>
    <label className='text-2xl font-bold' htmlFor="">Authorize</label>
    </div>
    <div>
    <AuthAdmin/>
    </div>
    
  </div>
  <div className="divider lg:divider-horizontal"></div>
  <div className="card bg-base-300 rounded-box grid h-150 flex-grow place-items-center gap-1">
    <div>
    <label className='text-2xl font-bold' htmlFor="">Pending Authorisations</label>
    </div>
  <div>
  <TableAdmin  state={authPend} />
  </div>
 
  </div>
</div>
    </div>
  )
}
