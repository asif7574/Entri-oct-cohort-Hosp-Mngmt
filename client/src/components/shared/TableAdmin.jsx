import React from 'react'
import { Link } from "react-router-dom";


export const TableAdmin = (props) => {

  
  return (
    <div className="overflow-x-auto">
  <table className="table table-zebra">
    {/* head */}
    <thead>
      <tr>
        <th>employeeID</th>
        <th>name</th>
        <th>role</th>
        
    
      </tr>
    </thead>
    <tbody>
      {props?.state?.map((item)=>(
        <tr key={item?._id} >
           
        <th  className='text-red-700'>{item?.employeeID}</th>
        <th>{item?.name}</th>
        <th className='text-blue-600'>{item?.role}</th>
        
        
      </tr>
      
      ))}
      
    </tbody>
  </table>
</div>
  )
}