import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
function UserVideos() {
	const navigate = useNavigate();
	const [loggedIn, setLoggedIn] = useState(false);
	const [userInfo, setUserInfo] = useState(null);
	const [channelvideos, setchannelvideos] = useState(null);
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

	const getChannelVideos = async () => {
		try {
			console.log("user id", userInfo?.data?._id);
			const res = await axios.get(
				`${backendurl}/videos/allchannelvideos/${userInfo?.data?._id}`,
				{
					withCredentials: true,
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${cookies.accessToken}`,
					},
				}
			);

			console.log("channel videos", res.data.data);
			setchannelvideos(res.data.data);
		} catch (error) {
			console.log(
				"error in getting channel subscribers",
				error
			);

			toast.error(error.message);
		}
	};

	const deleteVideo = async (id) => {
		try {
			const response = await axios.delete(
				`${backendurl}/videos/${id}`,

				{
					withCredentials: true,
					Authorization: `Bearer ${cookies.accessToken}`,
				}
			);
			if (response) {
				toast.success("video deleted succesfully");
			}
		} catch (error) {
			toast.error(error.message);
		}
	};
	const ToggleVideo = async (id) => {
		try {
			const response = await axios.patch(
				`${backendurl}/videos/toggle/publish/${id}`,
				null,

				{
					withCredentials: true,
					Authorization: `Bearer ${cookies.accessToken}`,
				}
			);
			if (response) {
				toast.success("video Status Toggled succesfully");
			}
		} catch (error) {
			toast.error(error.message);
		}
	};

	useEffect(() => {
		getCurrentUser();
	}, []);
	useEffect(() => {
		if (loggedIn) {
			getChannelVideos();
		}
	}, [userInfo]);

	return (
		<div>
			{loggedIn ? (
				<div className="h-screen w-screen  flex flex-wrap  justify-center  ">
					<h1 className="text-4xl font-semibold">
						All Videos
					</h1>
					<div className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 ">
						{channelvideos &&
							channelvideos.map((item) => (
								<div className="card bg-base-100 w-96 shadow-xl">
									<figure className="px-10 pt-10">
										<img
											src={item.thumbnail}
											alt="Shoes"
											className="w-full h-48 object-cover"
										/>
									</figure>
									<div className="card-body items-center text-center">
										<h2 className="card-title">
											{item.title}
										</h2>
										<div className="card-actions">
											<button className="btn btn-primary">
												<Link to={`/video/${item._id}`}>
													Watch now
												</Link>
											</button>

											<button
												className={`btn btn-primary ${
													item.owner === userInfo?.data?._id
														? "bg-red-500"
														: "hidden"
												}`}
												onClick={() =>
													deleteVideo(item._id)
												}
											>
												Delete Video
											</button>
											<button
												className={`btn btn-primary `}
												onClick={() => {
													navigate(
														`/updatevideo/${item._id}`
													);
												}}
											>
												update Video
											</button>

											<input
												type="checkbox"
												className="toggle toggle-info"
												defaultChecked={item.isPublished}
												onChange={() =>
													ToggleVideo(item._id)
												}
											/>
										</div>
									</div>
								</div>
							))}
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

export default UserVideos;
