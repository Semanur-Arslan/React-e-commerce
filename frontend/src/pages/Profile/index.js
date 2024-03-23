import React from 'react'
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

function Profile() {
    const {user, logout} = useAuth()
    const navigate = useNavigate();
    const handleLogout = async() => {
        logout(() => {
            navigate("/")
        });
    }
  return (
    <div>Profile
        <code>{JSON.stringify(user)}</code>

        <button class="btn btn-secondary  rounded-lg text-slate-50"
        onClick={handleLogout}
        >Logout</button>
    </div>

  )
}

export default Profile