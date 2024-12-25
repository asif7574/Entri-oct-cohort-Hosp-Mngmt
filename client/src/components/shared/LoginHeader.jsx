
import React from "react";
import { LogOut } from 'lucide-react';
import { UserRoundPen } from 'lucide-react';
import { Link } from "react-router-dom";
import { DarkMode } from "./DarkMode";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";


export const LoginHeader = () => {
     const navigate = useNavigate();
    const userLogout = async () => {
        try {
            const response = await axiosInstance({ method: "PUT", url: "/staff/logout" });
            navigate("/login");
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="flex justify-between items-center w-full px-20  h-24 shadow-2xl  ">
            <Link to={"/"}>
                <div className="text-3xl font-bold">Appolo Hospital</div>
            </Link>
            <nav className="flex gap-16 items-center font-semibold">
                <Link to={"/home"}>Home</Link>
                <Link to={"/patient"}>Patient Search</Link>
                {/* <Link to={"/"}>Main Page</Link> */}
                {/* <Link to={"/about"}>Op Search</Link> */}
    

            </nav>

            <div className="flex gap-14 items-center ">
                <DarkMode/>
                <Link to={'/profile'}>
                        <UserRoundPen />
                </Link>
               
                        <LogOut onClick={userLogout} />
                
            </div>
        </div>
    );
};




