import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function WatchHistory() {
	const [loggedIn, setLoggedIn] = useState(false);
	const [userInfo, setUserInfo] = useState(null);
	const [watchHistory, setwatchHistory] = useState(null);
	const backendurl = import.meta.env.VITE_URL;
	async function getCurrentUser() {
		try {
			const res = await axios.get(
				`${backendurl}/users/current-user`,
				{
					withCredentials: true,

					headers: {
						"Content-Type": "application/json",
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
	async function getWatchHistory() {
		try {
			const res = await axios.get(
				`${backendurl}/users/history`,
				{
					withCredentials: true,

					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			console.log("watch history", res.data.data);
			setwatchHistory(res.data.data);
			// console.log(user);
		} catch (error) {
			toast.error(error);
		}
	}
	useEffect(() => {
		getCurrentUser();
	}, []);
	useEffect(() => {
		if (loggedIn) {
			getWatchHistory();
		}
	}, [userInfo]);
	return (
		<div>
			{loggedIn ? (
				<>
					{watchHistory &&
						watchHistory.map((video) => (
							<div className="card card-side bg-base-100 shadow-xl my-4">
								<figure>
									<img
										src={video.thumbnail}
										alt="watched video"
										className="h-[250px] w-[350px]"
									/>
								</figure>

								<div className="card-body">
									<h2 className="card-title">
										{video.title}
									</h2>
									<div className="flex gap-4">
                  <img
										src={video.owner.avatar}
										alt=""
										className="w-8 h-8 rounded-lg"
									/>
                  <h4>{video.owner.username}</h4>
                  </div>
									<p>{video.description}</p>
									<div className="card-actions justify-end">
										<button className="btn btn-primary">
											<Link to={`/video/${video._id}`}>
												Watch now
											</Link>
										</button>
									</div>
								</div>
							</div>
						))}
				</>
			) : (
				<>
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

export default WatchHistory;
