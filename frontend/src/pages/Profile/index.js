import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    logout(() => {
      navigate("/");
    });
  };
  return (
    <div className=" px-2 md:px-32 mt-6 ">
      <h3 className="text-xl font-medium mb-4 text-accent  mt-5 text-center md:text-left">Profile</h3>

      <div className="container mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center md:justify-items-start items-center">
    
        <div className="avatar online ">
          <div className="w-24 rounded-full">
          <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
          </div>
        </div>
     

        <p >{user.email}</p>
      

        <button
          className="btn btn-neutral rounded-lg "
          onClick={handleLogout}
        >
          Logout
        </button>
       
      </div>
    </div>
  );
}

export default Profile;
