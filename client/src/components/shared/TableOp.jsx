import React from 'react'
import { Link } from "react-router-dom";
export const TableOp = (props) => {
  // console.log("props===",props.state[0].name);
  
  return (
    <div className="overflow-x-auto">
  <table className="table table-zebra">
    {/* head */}
    <thead>
      <tr>
        <th>Date</th>
        <th>Doctor</th>
        <th>Status</th>
    
      </tr>
    </thead>
    <tbody>
      {props?.state?.map((item)=>(
        <tr key={item?._id}>
        <Link to={`/${props.to}-details/${item?._id}`}>
        <th>{item?.date}</th>
        </Link>
        <th>{item?.doctor?.name}</th>
        <th className='text-red-700'>{item?.status}</th>
      </tr>
      
      ))}
      
    </tbody>
  </table>
</div>
  )
}
{/* <Link to={`/patientDetails/${item?._id}`}><td>{item.name}</td></Link> */}