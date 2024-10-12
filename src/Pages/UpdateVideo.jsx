import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

function UpdateVideo() {
	const { videoid } = useParams();
	const [videodata, setvideodata] = useState(null);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const backendUrl = import.meta.env.VITE_URL;
	const [cookies] = useCookies([
		"accessToken,refreshToken",
	]);
	const getvideobyid = async () => {
		try {
			const res = await axios.get(
				`${backendUrl}/videos/${videoid}`,
				{
					withCredentials: true,
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${cookies.accessToken}`,
					},
				}
			);
			setvideodata(res.data.data);
			console.log(
				"video data coming in updatevideo=",
				videodata
			);
		} catch (error) {
			toast.error(error.message);
		}
	};

	const onSubmit = async (data) => {
		// Create a FormData object to send files
		console.log(data);

		try {
			const formData = new FormData();
			formData.append(
				"title",
				data.title ? data.title : videodata.title
			);
			formData.append(
				"description",
				data.description
					? data.description
					: videodata.description
			);
			formData.append(
				"thumbnail",
				data.thumbnail[0]
					? data.thumbnail[0]
					: videodata.thumbnail
			);

			const config = {
				withCredentials: true,
				headers: {
					"Content-Type": "multipart/form-data",
					Authorization: `Bearer ${cookies.accessToken}`,
				},
			};
			const videos = await axios.patch(
				`${backendUrl}/videos/${videoid}`,
				formData,
				config
			);
			if (videos) {
				console.log("Videos has been posted Successfully");
			}
			toast.success(videos.data.message);
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		getvideobyid();
	}, []);
	return (
		<div className="flex justify-center items-center h-screen   ">
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="max-w-lg w-full p-6 bg-gray-800 rounded-lg shadow-lg"
			>
				{/* Title Input */}
				<div>
					<label className="block text-sm font-medium text-white">
						Title
					</label>
					<input
						type="text"
						{...register("title", { required: true })}
						className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
						defaultValue={videodata?.description}
					/>
					{errors.title && (
						<p className="text-red-500">
							Title is required
						</p>
					)}
				</div>

				{/* Description Input */}
				<div>
					<label className="block text-sm font-medium text-white">
						Description
					</label>
					<textarea
						{...register("description", { required: true })}
						className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
						defaultValue={videodata?.description}
					/>
					{errors.description && (
						<p className="text-red-500">
							Description is required
						</p>
					)}
				</div>

				{/* Thumbnail Input */}
				<h2>Default thumbnail</h2>
				<div className="w-full flex justify-center">
					<img
						src={videodata?.thumbnail}
						alt=""
						className="w-44 h-18 "
					/>
				</div>
				<div className="mb-4">
					<label className="block text-sm font-medium text-white">
						Thumbnail
					</label>
					<input
						type="file"
						{...register("thumbnail", { required: true })}
						accept="image/*"
						className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
						name="thumbnail"
					/>
					{errors?.thumbnail && (
						<p className="text-red-500">
							Thumbnail is required
						</p>
					)}
				</div>

				<button
					type="submit"
					className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
				>
					Update Video
				</button>
			</form>
		</div>
	);
}

export default UpdateVideo;
