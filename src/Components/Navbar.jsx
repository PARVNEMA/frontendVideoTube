import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
function Navbar() {
    const [data, setdata] = useState(null);
    const [loggedin, setLoggedIn] = useState(false);
    const navigate = useNavigate();
    const backendUrl = "/api";
    useEffect(() => {
        const userInfo = localStorage.getItem("userInfo");
        // Ensure userInfo is not null or malformed
        try {
            if (userInfo) {
                const parsedUserInfo = JSON.parse(userInfo);
                if (
                    parsedUserInfo &&
                    parsedUserInfo.data &&
                    parsedUserInfo.data.user
                ) {
                    setdata(parsedUserInfo.data.user);
                    setLoggedIn(true);
                } else {
                    console.error(
                        "Invalid userInfo structure",
                        parsedUserInfo
                    );
                }
            }
        } catch (error) {
            console.error("Error parsing userInfo:", error);
            // If parsing fails, you might want to clear the invalid item
            localStorage.removeItem("userInfo");
        }
    }, [loggedin]); // Run only once on mount

    // Logout function
    async function logout() {
        try {
            await axios.post(`${backendUrl}/users/logout`);
            // Clear localStorage and reset state
            setLoggedIn(false);
            setdata(null);
            localStorage.removeItem("userInfo");
            toast.success("Logout successful");
            // Redirect to login page
            navigate("/login");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    }
    return (
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl">
                    <Link to={"/"}>daisyUI</Link>
                </a>
            </div>

            <div className="flex-none px-4">
                <div className="dropdown dropdown-end">
                    {loggedin ? (
                        <>
                            <div className="dropdown dropdown-end">
                                <div
                                    tabIndex={0}
                                    role="button"
                                    className="btn btn-ghost btn-circle avatar"
                                >
                                    <div className="w-24 rounded-full">
                                        <img
                                            src={
                                                data.avatar
                                            }
                                        />
                                    </div>
                                </div>
                                <ul
                                    tabIndex={0}
                                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                                >
                                    <li>
                                        <a className="justify-between">
                                            Profile
                                            <span className="badge">
                                                New
                                            </span>
                                        </a>
                                    </li>
                                    <li>
                                        <a>Settings</a>
                                    </li>
                                    <li>
                                        <button
                                            onClick={logout}
                                            className="text-red-500 "
                                        >
                                            Logout
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </>
                    ) : (
                        <div className="flex gap-2">
                            <button className="btn btn-outline btn-primary">
                                <Link to={"/login"}>
                                    Login
                                </Link>
                            </button>
                            <button className="btn btn-outline btn-accent">
                                {" "}
                                <Link to={"/signup"}>
                                    Signup
                                </Link>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Navbar;
