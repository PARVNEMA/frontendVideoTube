import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
    const navigate = useNavigate();
    const backendUrl = "/api";
    async function logout() {
        await axios.post(`${backendUrl}/users/logout`);
        localStorage.setItem("userInfo", " ");
        navigate("/login");
    }
    return (
        <div>
            {" "}
            <button
                onClick={logout}
                className="text-red-500 "
            >
                Logout
            </button>
        </div>
    );
}

export default Logout;
