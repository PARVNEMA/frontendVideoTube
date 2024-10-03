import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
function Navbar() {
	const [data, setdata] = useState(null);
	const [loggedin, setLoggedIn] = useState(false);
	const [theme, setTheme] = useState(
		localStorage.getItem("theme") || "light"
	);

	const { user } = useSelector((state) => state.auth);

	const navigate = useNavigate();
	const backendUrl = "/api";
	useEffect(() => {
		localStorage.setItem("theme", theme);
		const userInfo = localStorage.getItem("userInfo");
		const localTheme = localStorage.getItem("theme");
		document
			.querySelector("html")
			.setAttribute("data-theme", localTheme);

		// Ensure userInfo is not null or malformed
		try {
			if (userInfo && user) {
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
	}, [loggedin, theme]); // Run only once on mount

	// Logout function
	async function logout() {
		try {
			await axios.post(`${backendUrl}/users/logout`);
			// Clear localStorage and reset state
			setdata(null);
			localStorage.removeItem("userInfo");
			setLoggedIn(false);
			toast.success("Logout successful");
			// Redirect to login page
			navigate("/login");
		} catch (error) {
			console.error("Logout failed:", error);
		}
	}
	const handleToggle = (e) => {
		if (e.target.checked) {
			setTheme("black");
		} else {
			setTheme("cupcake");
		}
	};
	return (
		<div className="navbar bg-base-100">
			<div className="flex-1">
				<a className="btn btn-ghost text-xl">
					<Link to={"/"}>daisyUI</Link>
				</a>
			</div>
			<label className="swap swap-rotate">
				{/* this hidden checkbox controls the state */}
				<input type="checkbox" onChange={handleToggle} />

				{/* sun icon */}
				<svg
					className="swap-on h-10 w-10 fill-current"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
				>
					<path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
				</svg>

				{/* moon icon */}
				<svg
					className="swap-off h-10 w-10 fill-current"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
				>
					<path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
				</svg>
			</label>
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
										<img src={data.avatar} />
									</div>
								</div>
								<ul
									tabIndex={0}
									className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
								>
									<li>
										<a className="justify-between">
											Profile
											<span className="badge">New</span>
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
								<Link to={"/login"}>Login</Link>
							</button>
							<button className="btn btn-outline btn-accent">
								{" "}
								<Link to={"/signup"}>Signup</Link>
							</button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default Navbar;
