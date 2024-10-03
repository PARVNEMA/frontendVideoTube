import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function UserProfile() {
	const [loggedIn, setLoggedIn] = useState(false);
	const [userInfo, setUserInfo] = useState(null);
	const user = useSelector((state) => state.auth);
	useEffect(() => {
		console.log(user);

		if (user.userInfo) {
			setLoggedIn(true);
			setUserInfo(
				JSON.parse(localStorage.getItem("userInfo")) || " "
			);
		}
	}, []);

	return (
		<div>
			{loggedIn ? (
				<div className="h-screen bg-gray-200  dark:bg-gray-800   flex flex-wrap items-center  justify-center  ">
					<div className="container lg:w-2/6 xl:w-2/7 sm:w-full md:w-2/3    bg-white  shadow-lg    transform   duration-200 easy-in-out">
						<div className=" h-32 overflow-hidden">
							<img
								className="w-full"
								src={userInfo?.data.user.coverImage}
								alt=""
							/>
						</div>
						<div className="flex justify-center px-5  -mt-12">
							<img
								className="h-32 w-32 bg-white p-2 rounded-full   "
								src={userInfo?.data.user.avatar}
								alt=""
							/>
						</div>
						<div className=" ">
							<div className="text-center px-14">
								<h2 className="text-gray-800 text-3xl font-bold">
									{userInfo?.data.user.username}
								</h2>
								<a
									className="text-gray-400 mt-2 hover:text-blue-500"
									href="https://www.instagram.com/immohitdhiman/"
									target="BLANK()"
								>
									{userInfo?.data.user.fullName}
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
								<div className="text-center w-1/2 p-4 hover:bg-gray-100 cursor-pointer">
									<p>
										<span className="font-semibold">
											2.5 k{" "}
										</span>{" "}
										Followers
									</p>
								</div>
								<div className="border"></div>
								<div className="text-center w-1/2 p-4 hover:bg-gray-100 cursor-pointer">
									<p>
										{" "}
										<span className="font-semibold">
											2.0 k{" "}
										</span>{" "}
										Following
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			) : (
				<>
					{/* Open the modal using document.getElementById('ID').showModal() method */}

					<div
						id=""
						className={` `}
					>
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
