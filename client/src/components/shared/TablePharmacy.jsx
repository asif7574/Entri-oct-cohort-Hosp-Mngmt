import React from 'react'

export const TablePharmacy = (props) => {
  return (
     <div className="overflow-x-auto">
      <table className="table table-zebra">
        {/* head */}
        <thead>
          <tr>
            
            <th>Patient</th>
            <th>Op Id</th>
            <th>Doctor</th>
            <th>Status</th>
        
          </tr>
        </thead>
        <tbody>
          {props?.state?.map((item)=>(
            <tr>
            
          
            <th>{item?.name}</th>
            <th className='text-blue-600'>{item?.op_Id}</th>
            <th>{item?.doctor?.name}</th>
            <th className='text-red-700'>{item?.status}</th>
          </tr>
          
          ))}
          
        </tbody>
      </table>
    </div>
  )
}
