import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import { DarkMode } from "./DarkMode";

export const Header = () => {
  const navigate =useNavigate()
  return (
    <div className="flex justify-between items-center w-full px-20  h-24 shadow-2xl  ">
            <Link to={"/"}>
                <div className="text-3xl font-bold">Appolo Hospital</div>
            </Link>
            <nav className="flex gap-16 items-center font-semibold">
                <Link to={"/"}>Home</Link>
                {/* <Link to={"/about"}>Profile</Link> */}
                {/* <Link to={"/course"}>Admin Login</Link> */}
            </nav>

            <div className="flex items-center gap-10">
                <DarkMode/>
                <button onClick={()=>navigate('/login')} className="btn btn-primary">Login</button>
            </div>
        </div>
  )
}
