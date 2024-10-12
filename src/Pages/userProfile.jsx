import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
function UserProfile() {
	const [loggedIn, setLoggedIn] = useState(false);
	const [userInfo, setUserInfo] = useState(null);
	const [subscribersInfo, setsubscribersInfo] =
		useState(null);

	const [cookies] = useCookies([
		"accessToken,refreshToken",
	]);
	const backendurl = import.meta.env.VITE_URL;
	async function getCurrentUser() {
		try {
			const res = await axios.get(
				`${backendurl}/users/current-user`,
				{
					withCredentials: true,

					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${cookies.accessToken}`,
					},
				}
			);
			console.log("current user", res.data);
			setLoggedIn(true);
			setUserInfo(res.data);
			// console.log(user);
		} catch (error) {
			toast.error(error);
		}
	}
	const getSubscribers = async () => {
		try {
			console.log("user id", userInfo?.data?._id);
			const res = await axios.get(
				`${backendurl}/subscriptions/u/${userInfo?.data?._id}`,
				{
					withCredentials: true,
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${cookies.accessToken}`,
					},
				}
			);

			console.log(res.data);
			setsubscribersInfo(res.data);
		} catch (error) {
			console.log(
				"error in getting channel subscribers",
				error
			);

			toast.error(error.message);
		}
	};

	useEffect(() => {
		getCurrentUser();
	}, []);
	useEffect(() => {
		if (loggedIn) {
			getSubscribers();
		}
	}, [userInfo]);

	return (
		<div>
			{loggedIn ? (
				<div className="hero bg-base-200 min-h-screen ">
					<div className="h-screen   shadow-lg    transform   duration-200 easy-in-out">
						<div className=" h-[300px] overflow-hidden">
							<img
								className="w-full object-cover h-full"
								src={userInfo?.data.coverImage}
								alt=""
							/>
						</div>
						<div className="flex justify-center px-5  -mt-12">
							<img
								className="h-32 w-32 bg-white p-2 rounded-full   "
								src={userInfo?.data.avatar}
								alt=""
							/>
						</div>
						<div className=" ">
							<div className="text-center px-14">
								<h2 className="text-gray-800 text-3xl font-bold">
									{userInfo?.dataname}
								</h2>
								<a
									className="text-black mt-2 hover:text-blue-500"
									href="https://www.instagram.com/"
									target="BLANK()"
								>
									{userInfo?.data.fullName}
								</a>
								<p className="mt-2 text-gray-500 text-sm">
									Lorem Ipsum is simply dummy text of the
									printing and typesetting industry. Lorem
									Ipsum has been the industry's standard
									dummy text ever since the 1500s,{" "}
								</p>
							</div>
							<hr className="mt-6" />
							<div className="flex  bg-gray-50 ">
								<div className="text-center w-1/2 p-4 hover:bg-gray-100 cursor-pointer text-black">
									<p>
										<span className="font-semibold ">
											{subscribersInfo?.data?.number}{" "}
										</span>{" "}
										Subscribers
									</p>
								</div>
								<div className="border"></div>
								<div className="text-center w-1/2 p-4 cursor-pointer text-black ">
									<Link to={"/publishvideo"}>
										<button>Publish Video</button>
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			) : (
				<>
					{/* Open the modal using document.getElementById('ID').showModal() method */}

					<div id="" className={` `}>
						<div className=" outline">
							<h3 className="font-bold text-lg">
								Login / Signup to view profile
							</h3>
							<div className="flex gap-4 mt-4">
								<button className="btn btn-outline glass">
									<Link to={"/login"}>Login</Link>
								</button>
								<button className="btn btn-outline glass">
									{" "}
									<Link to={"/signup"}>Signup</Link>
								</button>
							</div>
						</div>
					</div>
				</>
			)}
		</div>
	);
}

export default UserProfile;
