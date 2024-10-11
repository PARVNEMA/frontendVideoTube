import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";

function Sidebar() {
	const backendUrl = import.meta.env.VITE_URL;
	const [loggedin, setloggedin] = useState(false);
	async function getCurrentUser() {
		try {
			const res = await axios.get(
				`${backendUrl}/users/current-user`,
				{
					withCredentials: true, // This ensures cookies are included in requests
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			console.log("current user", res.data);
			setloggedin(true);
			// console.log(user);
		} catch (error) {
			toast.error(error);
		}
	}
	async function logout() {
		try {
			await axios.post(`${backendUrl}/users/logout`, null, {
				withCredentials: true, // Ensure cookies are included in the request
			});
			// Clear localStorage and reset state
			localStorage.removeItem("userInfo");
			setloggedin(false);
			toast.success("Logout successful");
			// Redirect to login page
			navigate("/login");
		} catch (error) {
			console.error("Logout failed:", error);
		}
	}
	useEffect(() => {
		getCurrentUser();
	}, [loggedin]);
	return (
		<div>
			{loggedin ? (
				<>
					<div className="drawer lg:drawer-open drawer-open ">
						<input
							id="my-drawer-2"
							type="checkbox"
							className="drawer-toggle"
						/>
						<div className="drawer-content flex flex-col items-center justify-center">
							{/* Page content here */}
							<label
								htmlFor="my-drawer-2"
								className="btn btn-primary drawer-button lg:hidden"
							>
								Open drawer
							</label>
						</div>
						<div className="drawer-side">
							<label
								htmlFor="my-drawer-2"
								aria-label="close sidebar"
								className="drawer-overlay"
							></label>
							<ul className="menu  text-base-content min-h-full w-80 p-4 gap-2">
								{/* Sidebar content here */}
								<li>
									<NavLink
										className={`justify-between btn btn-outline   `}
										to={"/"}
										style={({ isActive }) => {
											return isActive ? { backgroundColor: "indigo" } : {color:"gray"};
											}}
									>
										Home
									</NavLink>
								</li>
								<li>
									<NavLink
										className="justify-between btn btn-outline"
										to={"/watchhistory"}
										style={({ isActive }) => {
											return isActive ? { backgroundColor: "indigo" } : {color:"gray"};
											}}
									>
										Watch History
									</NavLink>
								</li>
								<li>
									<NavLink
										className="justify-between btn  btn-outline"
										to={"/userprofile"}
										style={({ isActive }) => {
											return isActive ? { backgroundColor: "indigo" } : {color:"gray"};
											}}
									>
										View Profile
									</NavLink>
								</li>
								<li>
									<NavLink
										className="justify-between btn  btn-outline"
										to={"/publishvideo"}
										style={({ isActive }) => {
											return isActive ? { backgroundColor: "indigo" } : {color:"gray"};
											}}
									>
										Publish Video
									</NavLink>
								</li>
								<li>
									<NavLink
										className="justify-between btn  btn-outline"
										to={"/tweets"}
										style={({ isActive }) => {
											return isActive ? { backgroundColor: "indigo" } : {color:"gray"};
											}}
									>
										Tweet
									</NavLink>
								</li>
								<button
									onClick={logout}
									className="btn btn-error "
								>
									Logout
								</button>
							</ul>
						</div>
					</div>
				</>
			) : (
				<> Login first</>
			)}
		</div>
	);
}

export default Sidebar;
