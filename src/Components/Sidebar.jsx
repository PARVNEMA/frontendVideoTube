import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";
import { useAuth } from "./Logincontext.jsx";

function Sidebar() {
	const backendUrl = import.meta.env.VITE_URL;
	const [loggedin, setloggedin] = useState(false);
	const [cookies] = useCookies([
		"accessToken,refreshToken",
	]);

	const { state, dispatch } = useAuth();

	async function getCurrentUser() {
		try {
			const res = await axios.get(
				`${backendUrl}/users/current-user`,
				{
					withCredentials: true, // This ensures cookies are included in requests
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${cookies.accessToken}`,
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
				withCredentials: true,
				Authorization: `Bearer ${cookies.accessToken}`, // Ensure cookies are included in the request
			});
			// Clear localStorage and reset state
			localStorage.removeItem("userInfo");
			setloggedin(false);
			dispatch({ type: "LOGOUT" });
			toast.success("Logout successful");
			// Redirect to login page
			navigate("/login");
		} catch (error) {
			console.error("Logout failed:", error);
		}
	}
	useEffect(() => {
		getCurrentUser();
	}, [loggedin, state.isLoggedIn]);
	return (
		<div className="h-full w-[20vw]">
			{state.isLoggedIn ? (
				<>
					<div className="drawer lg:drawer-open w-full ">
						<input
							id="my-drawer-2"
							type="checkbox"
							className="drawer-toggle"
						/>

						<div className="drawer-side w-full">
							<label
								htmlFor="my-drawer-2"
								aria-label="close sidebar"
								className="drawer-overlay"
							></label>
							<ul className="menu  text-base-content min-h-full w-[20vw] p-4 pt-8 gap-2">
								{/* Sidebar content here */}
								<li>
									<NavLink
										className={`justify-between btn btn-outline   `}
										to={"/"}
										style={({ isActive }) => {
											return isActive
												? { backgroundColor: "green" }
												: { color: "gray" };
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
											return isActive
												? { backgroundColor: "indigo" }
												: { color: "gray" };
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
											return isActive
												? { backgroundColor: "indigo" }
												: { color: "gray" };
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
											return isActive
												? { backgroundColor: "indigo" }
												: { color: "gray" };
										}}
									>
										Publish Video
									</NavLink>
								</li>
								<li>
									<NavLink
										className="justify-between btn  btn-outline"
										to={"/uservideos"}
										style={({ isActive }) => {
											return isActive
												? { backgroundColor: "indigo" }
												: { color: "gray" };
										}}
									>
										User Videos
									</NavLink>
								</li>
								<li>
									<NavLink
										className="justify-between btn  btn-outline"
										to={"/tweets"}
										style={({ isActive }) => {
											return isActive
												? { backgroundColor: "indigo" }
												: { color: "gray" };
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
				<>
					<div className="h-[90vh]  w-[20vw] flex flex-col items-center
					justify-center 		  ">
						<img
							src="/logo.png"
							alt="Nature Tube"
							className="h-[40vh] w-[16vw]"
						/>
						<p className="font-medium">
							Login/Signup to have more accessibility
						</p>
						<Link to="/login">
							<button className="btn glass">Login</button>
						</Link>
						<Link to="/signup">
							<button className="btn glass">Sign Up</button>
						</Link>
					</div>
				</>
			)}
		</div>
	);
}

export default Sidebar;
