import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../../config/axiosInstance';
import { useParams } from 'react-router-dom';
import { CreateOp } from '../other/CreateOp';
import { CreateAppointment } from '../other/CreateAppointment';
import { useFetch } from '../../hooks/useFetch';
import { TableOp } from '../../components/shared/TableOp';
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

export const PatientDetails = () => {
  const [patientDetails,setPatientDetails]=useState({})
  const [isModalCreateOpOpen, setIsModalCreateOpOpen] = useState(false);
  const [isModalCreateApoointmentOpen, setIsModalCreateApoointmentOpen] = useState(false);

    const { id } = useParams();
    const name=patientDetails?.name
    
     const [opDetails, isLoading, error] = useFetch(`/reception/get-op-reception/${id}`);
     const [apDetails, isLoading2, error2] = useFetch(`/reception/get-ap-reception/${id}`);
console.log("op===",opDetails);
console.log("ap===",apDetails);


    const fetchPatientDetails = async () => {
        try {
            const response = await axiosInstance({
                url: `/reception/get-patient-details/${id}`,
            });
            setPatientDetails(response?.data?.data)
        } catch (error) {
            console.log(error);
        }
    };

    console.log('patienmtDetails===',patientDetails);
    
    const togleOp=()=>{
      setIsModalCreateOpOpen(true)
    }
    const togleAp=()=>{
      setIsModalCreateApoointmentOpen(true)
    }
    const closeOpModal=()=>{
      setIsModalCreateOpOpen(false)
    }
    const closeApModal=()=>{
      setIsModalCreateApoointmentOpen(false)
    }
    const refreshPage = () => {
      window.location.reload(false);
    };
    

    useEffect(()=>{
        fetchPatientDetails()
    },[])
  return (
    <>
    <div className="flex w-full flex-col lg:flex-row">
  <div className="card bg-base-300 rounded-box grid h-100 flex-grow place-items-center m-10">
  
      <div className="card w-75  shadow-xl">
        <div className="card-body">
          <div className="flex flex-col items-center">
            <img
              src={patientDetails?.profiePic}
              alt="patientDetails"
              className="w-24 h-24 rounded-full border-2 "
            />
            <h2 className="text-2xl font-bold mt-4">{patientDetails?.name}</h2>
            <p className="">Age: {patientDetails?.age}</p>
          </div>
          <div className="divider"></div>
          <div className="text-left">
            <p>
              <strong>Patient ID:</strong> {patientDetails?.patientID}
            </p>
            <p>
              <strong>Email:</strong> {patientDetails?.email}
            </p>
            <p>
              <strong>Mobile:</strong> {patientDetails?.mobile}
            </p>
            <p>
              <strong>Address:</strong> {patientDetails?.address}
            </p>
            <p>
              <strong>Sex:</strong> {patientDetails?.sex || "nil"}
            </p>

          </div>
        </div >
        <div className='flex gap-6'>

            <button onClick={togleOp} className="btn btn-warning" >
                Create New Op
            </button>
            <button onClick={togleAp} className="btn btn-accent" >
                Book appointment
            </button>
        </div>
      </div>
   
    </div>


  <div className="divider lg:divider-horizontal"></div>


  <div className="card bg-base-300 rounded-box grid h-150 flex-grow place-items-center m-10 gap-8">
    
    <div>
    <h3 className='text-3xl font-bold'>Op list</h3>
    <div>
      <TableOp state={opDetails} to={"oprec"}/>
    </div>
    </div>
    <div>
    <h3 className='text-3xl font-bold'>Appointment list</h3>
    <div>
    <TableOp state={apDetails} to={"aprec"}/>
    </div>
    </div>
  </div>
</div>
{isModalCreateOpOpen && (
        <div className="modal modal-open">
          <div className="modal-box ">
            <div className="modal-action">
              <button className="btn bg-red-700" onClick={closeOpModal}>Close</button>
            </div>
            <CreateOp close={closeOpModal} patient={id} name={name} refresh={refreshPage}/>
          </div>
        </div>
      )}
{isModalCreateApoointmentOpen && (
        <div className="modal modal-open">
          <div className="modal-box ">
            <div className="modal-action">
              <button className="btn bg-red-700" onClick={closeApModal}>Close</button>
            </div>
            <CreateAppointment close={closeApModal} patient={id} name={name} refresh={refreshPage}/>
          </div>
        </div>
      )}
</>
  )
}
