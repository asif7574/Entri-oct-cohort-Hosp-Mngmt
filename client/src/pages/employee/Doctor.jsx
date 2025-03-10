import React from 'react'
import { Link } from 'react-router-dom'
import { useFetch } from '../../hooks/useFetch';
import { TableDoc } from '../../components/shared/TableDoc';

export const Doctor = () => {
  const [activeOp, isLoading, error] = useFetch("/doctor/get-Doc-Op");
       const [waitingAp, isLoading2, error2] = useFetch("/doctor/get-Wait-Ap");
  return (
    <div className=' flex flex-col items-center justify-center gap-10'>
      <div>
        <Link to={"/patient"}>
        <button className='btn btn-accent'> Patient Search</button>
        </Link>
      </div>
      <div>

      </div>
      <div className="flex w-full flex-col lg:flex-row">
  <div className="card bg-base-300 rounded-box grid h-150 flex-grow place-items-center">
    
    <div>
    <label className='text-2xl font-bold' htmlFor="">Active Op</label>
    </div>
    <div>
    <TableDoc to={"op"} state={activeOp}/>
    </div>
    
  </div>
  <div className="divider lg:divider-horizontal"></div>
  <div className="card bg-base-300 rounded-box grid h-150 flex-grow place-items-center gap-4">
    <div>
    <label className='text-2xl font-bold' htmlFor="">Waiting Appointments</label>
    </div>
  <div>
  <TableDoc to={"ap"} state={waitingAp}/>
  </div>
 
  </div>
</div>
    </div>
  )
}
