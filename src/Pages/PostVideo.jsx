import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";

function VideoUploadForm() {
	// Initialize React Hook Form
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const [cookies] = useCookies([
		"accessToken,refreshToken",
	]);

	// Function to handle form submission
	const onSubmit = async (data) => {
		// Create a FormData object to send files
		console.log(data);
		const backendUrl = import.meta.env.VITE_URL;

		try {
			const formData = new FormData();
			formData.append("title", data.title);
			formData.append("description", data.description);
			formData.append("videoFile", data.videoFile[0]); // Access the file object correctly
			formData.append("thumbnail", data.thumbnail[0]);

			const config = {
				withCredentials: true,
				headers: {
					"Content-Type": "multipart/form-data",
					Authorization: `Bearer ${cookies.accessToken}`,
				},
			};
			const videos = await axios.post(
				`${backendUrl}/videos`,
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
					/>
					{errors.description && (
						<p className="text-red-500">
							Description is required
						</p>
					)}
				</div>

				{/* Video File Input */}
				<div>
					<label className="block text-sm font-medium text-white">
						Video File
					</label>
					<input
						type="file"
						{...register("videoFile", { required: true })}
						accept="video/*"
						className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
						name="videoFile"
					/>
					{errors.videoFile && (
						<p className="text-red-500">
							Video file is required
						</p>
					)}
				</div>

				{/* Thumbnail Input */}
				<div>
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
					{errors.thumbnail && (
						<p className="text-red-500">
							Thumbnail is required
						</p>
					)}
				</div>

				<button
					type="submit"
					className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
				>
					Upload Video
				</button>
			</form>
		</div>
	);
}

export default VideoUploadForm;
