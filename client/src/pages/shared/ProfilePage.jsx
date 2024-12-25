import React from "react";
import { useFetch } from "../../hooks/useFetch";
import { axiosInstance } from "../../config/axiosInstance";
import { useNavigate } from "react-router-dom";

export const ProfilePage = () => {
    const [profile, isLoading, error] = useFetch("/staff/profile");
    const navigate = useNavigate();

    console.log("profile====", profile);
    const firstLetter = profile?.name?.slice(0, 1);
    console.log(firstLetter, "====firstLetter");

    const userLogout = async () => {
        try {
            const response = await axiosInstance({ method: "PUT", url: "/staff/logout" });
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
          
                {/* <div className="uppercase font-semibold "> {firstLetter} </div> */}
                
            <div className="min-h-screen flex items-center justify-center">
      <div className="card w-96  shadow-xl">
        <div className="card-body">
          <div className="flex flex-col items-center">
            <img
              src={profile?.profiePic}
              alt="Profile"
              className="w-24 h-24 rounded-full border-2 "
            />
            <h2 className="text-2xl font-bold mt-4">{profile?.name}</h2>
            <p className="">Role: {profile?.role}</p>
          </div>
          <div className="divider"></div>
          <div className="text-left">
            <p>
              <strong>Employee ID:</strong> {profile?.employeeID}
            </p>
            <p>
              <strong>Email:</strong> {profile?.email}
            </p>
            <p>
              <strong>Mobile:</strong> {profile?.mobile}
            </p>
            <p>
              <strong>Address:</strong> {profile?.address}
            </p>
            <p>
              <strong>Control Role:</strong> {profile?.control_role}
            </p>
            <button className="btn btn-warning" onClick={userLogout}>
                Log out{" "}
            </button>

          </div>
        </div>
      </div>
    </div>

            
            
        </div>
    );
};
