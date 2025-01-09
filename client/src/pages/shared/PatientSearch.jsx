import React, { useEffect, useState } from 'react'
import { useFetch } from '../../hooks/useFetch';
import { Link } from "react-router-dom";
import { CreatePatient } from '../other/CreatePatient';

export const PatientSearch = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [patients, isLoading, error] = useFetch("/reception/find-all-patients");
  const [val,setVal]=useState('')
console.log("patients==",patients);
console.log("val==",val);

const handleSearch=(value)=>{
setVal(value);
};
const openmodal=()=>{
  setIsModalOpen(true);
};
const closeModal = () => {
  setIsModalOpen(false);
  
};
const refreshPage = () => {
  window.location.reload(false);
};

  
  return (
    <>
    <div className='flex gap-28'>
      <textarea
  placeholder="Search patient"
  className="text-lg textarea textarea-bordered textarea-xs w-full max-w-md max-h-1" 
  onChange={(e) => handleSearch(e.target.value)}></textarea>
  <div>
  
  <button className="btn btn-outline btn-accent" onClick={openmodal}>Create new Patient</button>
  
  </div>
      </div>
    <div className="overflow-x-auto">
      
  <table className="table table-zebra">
    {/* head */}
    <thead>
      <tr>
        <th>Patient id</th>
        <th>Name</th>
        <th>Adress</th>
        <th>Age</th>
        <th>Mobile No.</th>
      </tr>
    </thead>
    <tbody>
     {patients?.filter((item)=>{
      return item.name.toLowerCase().includes(val.toLowerCase())
     }).map((item)=>(
      
      // <Link to={`/patientDetails/${item?._id}`}><td>{item.name}</td></Link>
      <tr key={item._id}>
        <th>{item.patientID}</th>
        <Link to={`/patientDetails/${item?._id}`}><td>{item.name}</td></Link>
        <td>{item.address}</td>
        <td>{item.age}</td>
        <td>{item.mobile}</td>
      </tr>
        
      ))}
    </tbody>
  </table>
</div>
{isModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box ">
            <div className="modal-action">
              <button className="btn bg-red-700" onClick={closeModal}>Close</button>
            </div>
            <CreatePatient modalState={closeModal} refresh={refreshPage}/>
          </div>
        </div>
      )}
</>
  )
}
