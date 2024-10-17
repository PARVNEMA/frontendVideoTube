import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCookies } from "react-cookie";

function DetailedVideo() {
	const [video, setvideo] = useState(null);
	const [comments, setcomments] = useState([]);
	const [postedcomment, setpostedcomment] = useState(false);
	const [subscribed, setSubscribed] = useState(false);
	const [liked, setLiked] = useState(false);
	const [commentliked, setcommentliked] = useState(null);

	const { register, handleSubmit } = useForm();
	const backendurl = import.meta.env.VITE_URL;
	const { videoid } = useParams();
	const [cookies] = useCookies([
		"accessToken,refreshToken",
	]);
	async function fetchvideoDetails() {
		try {
			const response = await axios.get(
				`${backendurl}/videos/${videoid}`,
				{
					withCredentials: true,
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${cookies.accessToken}`,
					},
				}
			);
			console.log("fetched data=", response.data.data);
			// console.log("fetched video=", response.data.data);
			setvideo(response.data.data);
			if (response.data.data.owner._id) {
				const res = await axios.post(
					`${backendurl}/subscriptions/issubscribedalready/${response.data.data.owner._id}`,
					null,
					{
						withCredentials: true,
						headers: {

							Authorization: `Bearer ${cookies.accessToken}`,
						},
					}
				);
				const like = await axios.post(
					`${backendurl}/likes/isalreadyliked/v/${videoid}`,
					null,

					{
						withCredentials: true,
						headers: {

							Authorization: `Bearer ${cookies.accessToken}`,
						},
					}
				);
				// console.log("like=", like.data.data.liked);
				setLiked(like.data.data.liked);
				setSubscribed(res.data.message.alreadysubscribed);
			}
		} catch (error) {
			console.error("Error fetching video details:", error);
		}
	}
	async function fetchVideoComments() {
		const allcomments = await axios.get(
			`${backendurl}/comments/${videoid}`,
			{
				withCredentials: true,
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${cookies.accessToken}`,
				},
			}
		);
		console.log(allcomments.data.data);
		setcomments(allcomments.data.data);
	}
	async function toggleLiked() {
		try {
			console.log("video id", videoid);

			const like = await axios.post(
				`${backendurl}/likes/toggle/v/${videoid}`,
				null,

				{
					withCredentials: true,
					headers: {

						Authorization: `Bearer ${cookies.accessToken}`, // Ensure cookies are included in the request
					},
				}
			);
			if (like) {
				setLiked(!liked);
				toast.info(
					` ${
						liked
							? "unliked successfully"
							: "liked successfully"
					}`
				);
			}
		} catch (error) {
			console.error("error in liking the video", error);
		}
	}
	const submitForm = async (data) => {
		try {
			console.log(data);

			const postmycomment = await axios.post(
				`${backendurl}/comments/${videoid}`,
				data,
				{
					withCredentials: true, // Ensure cookies are included in the request
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${cookies.accessToken}`, // Set the content type to JSON
					},
				}
			);
			setpostedcomment(true);
			console.log(postmycomment);
			if (postmycomment) {
				toast.success("comment posted successfully");
			}
		} catch (error) {
			toast.error("error in posting comments");
		}
	};
	async function toggleSubscription() {
		try {
			const ownerId = video.owner._id;
			console.log("owner id=", ownerId);

			const res = await axios.post(
				`${backendurl}/subscriptions/c/${ownerId}`,
				null,
				{
					withCredentials: true,
					headers: {

						Authorization: `Bearer ${cookies.accessToken}`, // Set the content type to JSON
					}, // Ensure cookies are included in the request
				}
			);
			if (res) {
				setSubscribed(!subscribed);
				console.log("subscription toggled", subscribed);
				toast.info(
					`${
						subscribed
							? "unsubscribed successfully"
							: "subscribed successfully"
					}`
				);
			}
		} catch (error) {
			console.error(
				"error in subscribing the channnel",
				error
			);
			toast.error(error.message);
		}
	}

	async function toggleCommentLike(id) {
		try {
			// console.log(id);
			const res = await axios.post(
				`${backendurl}/likes/toggle/c/${id}`,
				null,
				{
					withCredentials: true,
					headers: {
			
						Authorization: `Bearer ${cookies.accessToken}`, // Set the content type to JSON
					}, // Ensure cookies are included in the request
				}
			);
			if (res) {
				setcommentliked(id);
				toast.info(
					` ${
						liked
							? "unliked successfully"
							: "liked successfully"
					}`
				);
			}
		} catch (error) {
			toast.error(error.message);
		}
	}

	async function getCurrentUser() {
		try {
			const res = await axios.get(
				`${backendurl}/users/current-user`,
				{
					withCredentials: true, // This ensures cookies are included in requests
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${cookies.accessToken}`,
					},
				}
			);
			console.log(
				"current user in detailed video",
				res.data
			);
			setuserdata(res.data);
			// console.log(user);
		} catch (error) {
			toast.error(error);
		}
	}
	useEffect(() => {
		fetchvideoDetails();
		fetchVideoComments();
		getCurrentUser();
	}, [videoid, postedcomment]);

	if (!video) {
		return (
			<div className="w-full h-[90vh] flex justify-center items-center">
				<div className="indicator">
					<div className="indicator-item indicator-bottom">
						<Link to={`/login`}>
							<button className="btn btn-primary">
								Signin/Login
							</button>
						</Link>
					</div>
					<div className="card border">
						<div className="card-body">
							<h2 className="card-title">Signup/SignIn</h2>
							<p>
								Signup or Signin to see the complete video
							</p>
						</div>
					</div>
				</div>
			</div>
		);
	}

	// Return a fallback if video data is somehow undefined or doesn't have a videoFile
	if (!video.videoFile) {
		return <div>Video data undefined</div>;
	}
	// console.log(video.videoFile);
	return (
		<div className="max-w-5xl mx-auto my-8">
			<div className="relative">
				<video
					className="w-full rounded-lg h-[32rem]
                     object-cover"
					controls
					src={video?.videoFile}
					type="video/mp4"
				>
					<source />
					<h1 className="text-4xl font-bold text-white">
						Your browser does not support the video tag.
					</h1>
				</video>
				{/* <iframe src=frameborder="0" ></iframe> */}
				{/* <img
                    src="https://res.cloudinary.com/dfw2v6xqo/image/upload/v1727343698/jhq3irgkkzkexixoycba.png"
                    alt="Video Thumbnail"
                    className="absolute inset-0 w-full h-full object-cover opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-lg"
                /> */}
			</div>

			<div className="mt-4">
				<div className="flex justify-between items-start">
					<h1 className="text-2xl font-bold text-white">
						{video?.title}
					</h1>
					<div className="flex space-x-4">
						<button
							className={`px-4 py-2  text-gray-800 rounded-lg  ${
								liked ? "bg-blue-500" : "bg-gray-200"
							}`}
							onClick={toggleLiked}
						>
							<i className="fas fa-thumbs-up"></i> Like{" "}
							{video?.likes}
						</button>
					</div>
				</div>

				<div className="text-gray-500 mt-1">
					<span>{video?.views} views</span> •{" "}
					<span>{video?.createdAt}</span>
				</div>

				<div className="mt-4 text-gray-200">
					<p>
						<strong>Description:</strong>{" "}
						{video?.description}
					</p>
				</div>

				<hr className="my-6 border-gray-300" />

				<div className="flex items-center">
					<div className="w-12 h-12 bg-gray-300 rounded-full mr-4">
						<img
							src={video.owner.avatar}
							alt=""
							className="w-12 h-12 bg-gray-300 rounded-full mr-4"
						/>
					</div>
					<div className="flex-1">
						<h2 className="text-lg font-semibold text-cyan-600">
							<Link to={`/user/c/${video.owner.username}`}>
								{video.owner.username}
							</Link>
						</h2>
					</div>
					<button
						className={`px-4 py-2  text-white rounded-lg hover:bg-blue-600 ${
							subscribed ? "bg-blue-500" : "bg-red-600"
						} `}
						onClick={toggleSubscription}
					>
						{subscribed ? "Subscribed" : "Subscribe"}
					</button>
				</div>

				<div className="mt-6">
					<h3 className="text-lg font-semibold mb-4 text-white">
						Comments
					</h3>

					<form
						className="flex space-x-4 mb-6"
						onSubmit={handleSubmit(submitForm)}
					>
						<div className="w-10 h-10 bg-gray-300 rounded-full"></div>
						<input
							type="text"
							placeholder="Add a comment..."
							className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
							name="content"
							{...register("content")}
						/>
						<button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
							Comment
						</button>
					</form>

					{comments.map((comment) => (
						<div
							className="space-y-4 py-4"
							key={comment._id}
						>
							<div className="flex space-x-4 bg-gray-700 justify-center items-center rounded-lg px-2">
								<div className="w-10 h-10 bg-gray-100 rounded-full">
									<img
										src={comment.owner.avatar}
										alt=""
										className="w-10 h-10 bg-gray-100 rounded-full"
									/>
								</div>
								<div className="flex-1">
									<p className="font-semibold text-blue-700">
										{comment.owner.username}
										<span className="text-gray-400 text-sm p-4">
											{comment.createdAt}
										</span>
									</p>
									<p className="text-white">
										{comment.content}
									</p>
								</div>
							</div>
							<button
								onClick={() =>
									toggleCommentLike(comment._id)
								}
								className={`px-4 py-2  text-gray-800 rounded-lg  ${
									commentliked === comment._id
										? "bg-blue-500"
										: "bg-gray-200"
								}`}
							>
								like
							</button>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default DetailedVideo;
