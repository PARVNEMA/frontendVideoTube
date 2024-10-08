import axios from "axios";
import React, { useEffect, useState } from "react";

import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
function OtherChannel() {
	const { username } = useParams();
	const [loggedIn, setLoggedIn] = useState(false);
	const [channelinfo, setchannelinfo] = useState(null);

	const [channelvideos, setchannelvideos] = useState(null);

	const backendurl = import.meta.env.VITE_URL;
	async function getChannelUser() {
		try {
			const res = await axios.get(
				`${backendurl}/users/c/${username}`,
				{
					withCredentials: true,

					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			console.log(
				"current userother channel",
				res.data.data
			);
			setchannelinfo(res.data);
			setLoggedIn(true);
			// console.log(user);
		} catch (error) {
			toast.error(error);
		}
	}

	const getChannelVideos = async () => {
		try {
			console.log("user id", channelinfo?.data?._id);
			const res = await axios.get(
				`${backendurl}/videos/allchannelvideos/${channelinfo?.data?._id}`,
				{
					withCredentials: true,
					headers: {
						"Content-Type": "application/json",
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

	useEffect(() => {
		getChannelUser();
	}, []);
	useEffect(() => {
		if (loggedIn) {
			getChannelVideos();
		}
	}, [channelinfo]);

	return (
		<div>
			{loggedIn ? (
				<div className="h-screen w-screen  flex flex-wrap  justify-center  ">
					<div className="h-screen w-screen     shadow-lg    transform   duration-200 easy-in-out">
						<div className=" h-[300px] overflow-hidden">
							<img
								className="w-full object-cover h-full"
								src={channelinfo?.data.coverImage}
								alt=""
							/>
						</div>
						<div className="flex justify-center px-5  -mt-12">
							<img
								className="h-32 w-32 bg-white p-2 rounded-full   "
								src={channelinfo?.data.avatar}
								alt=""
							/>
						</div>
						<div className=" ">
							<div className="text-center px-14">
								<h2 className="text-gray-800 text-3xl font-bold">
									{channelinfo?.dataname}
								</h2>
								<a
									className="text-black mt-2 hover:text-blue-500"
									href="https://www.instagram.com/immohitdhiman/"
									target="BLANK()"
								>
									{channelinfo?.data.fullName}
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
											{channelinfo?.data?.subscribersCount}{" "}
										</span>{" "}
										Subscribers
									</p>
								</div>
								<div className="text-center w-1/2 p-4 hover:bg-gray-100 cursor-pointer text-black">
									<p>
										SubscribedTo{" "}
										<span className="font-semibold ">
											{channelinfo?.data?.channelsSubscribedToCount}{" "}
										</span>{" "}

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

export default OtherChannel;
