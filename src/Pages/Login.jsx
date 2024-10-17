import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
// import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
// import { LoginUser } from "../store/authActions";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuth } from "../Components/Logincontext.jsx";

function Login() {
	const { dispatch } = useAuth();
	const { register, handleSubmit } = useForm();
	const [cookies, setCookie, removeCookie] = useCookies([
		"accessToken,refreshToken",
	]);
	const [userInfo, setuserInfo] = useState();

	const submitForm = (data) => {
		data.email = data.email.toLowerCase();
		login(data);
	};
	const navigate = useNavigate();
	const backendUrl = import.meta.env.VITE_URL;
	async function login({ email, password }) {
		try {
			const config = {
				withCredentials: true, // Ensure cookies are included in the request
				headers: {
					"Content-Type": "application/json",
				},
			};

			const res = await axios.post(
				`${backendUrl}/users/login`,
				{ email, password },
				config
			);
			setuserInfo(res.data);
			dispatch({ type: "LOGIN" });
			console.log(res.data);
		} catch (error) {
			console.log(error);

			toast.error(error);
		}
	}

	useEffect(() => {
		if (userInfo) {
			// Set cookies if userInfo is available and contains tokens
			setCookie("accessToken", userInfo.data.accessToken, {
				path: "/",
				// Prevent JavaScript from accessing the cookie
				sameSite: "none", // Allow cookies to be sent in cross-origin requests
				secure: true,
			});
			setCookie(
				"refreshToken",
				userInfo.data.refreshToken,
				{
					path: "/",
					// Prevent JavaScript from accessing the cookie
					sameSite: "none", // Allow cookies to be sent in cross-origin
					secure: true,
				}
			);
			// console.log(userInfo.data.accessToken);

			navigate("/"); // Redirect to user profile after successful login
		}
	}, [navigate, userInfo]);
	return (
		<>
			<section className="">
				<div className=" lg:min-h-screen flex items-center justify-center ">
					<main className="flex items-center justify-center  sm:px-12 ">
						<div className="max-w-xl lg:max-w-4xl">
							<a className="block text-blue-600" href="#">
								<span className="sr-only">Home</span>
							</a>

							<h1 className="mt-6 text-2xl font-bold ghost-white sm:text-3xl md:text-4xl :text-white text-center">
								Welcome to NatureTube
							</h1>

							<p className="mt-4 leading-relaxed text-gray-500 :text-gray-400">
								Welcome to NatureTube where you can explore
								about nature and can share beautiful nature
								videos around you
							</p>

							<form
								action="#"
								className="mt-8 grid grid-cols-6 gap-6"
								onSubmit={handleSubmit(submitForm)}
							>
								<div className="col-span-4">
									<label
										htmlFor="Email"
										className="block text-sm font-medium  ghost-white :text-gray-200"
									>
										Email
									</label>

									<input
										type="email"
										id="Email"
										name="email"
										className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-black shadow-sm :border-gray-700  py-2 px-2"
										{...register("email")}
									/>
								</div>

								<div className="col-span-6 sm:col-span-4">
									<label
										htmlFor="Password"
										className="block text-sm font-medium  ghost-white :text-gray-200"
									>
										Password
									</label>

									<input
										type="password"
										id="Password"
										name="password"
										className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm  text-black shadow-sm :border-gray-700 :bg-gray-800 :text-gray-200 py-2 px-2"
										{...register("password")}
									/>
								</div>

								<div className="col-span-6">
									<p className="text-sm text-gray-500 ghost-white">
										By creating an account, you agree to our
										<a
											href="#"
											className=" ghost-white underline :text-gray-200"
										>
											terms and conditions
										</a>
										and
										<a
											href="#"
											className=" ghost-white underline :text-gray-200"
										>
											{" "}
											privacy policy{" "}
										</a>
										.
									</p>
								</div>

								<div className="col-span-6 sm:flex sm:items-center sm:gap-4">
									<button
										className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 :hover:bg-blue-700 :hover:text-white"
										type="submit"
									>
										Login
									</button>

									<p className="mt-4 text-sm text-gray-500 sm:mt-0 :text-gray-400">
										Don't have an account?
										<Link
											to={"/signup"}
											className=" ghost-white underline :text-gray-200"
										>
											SignUp
										</Link>
										.
									</p>
								</div>
							</form>
						</div>
					</main>
				</div>
			</section>
		</>
	);
}

export default Login;
