import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVideos } from "../store/videoAction";
import VideoCard from "../Components/VideoCard"; // Importing the VideoCard component
import Sidebar from "../Components/Sidebar";

function Videos() {
	const [loading, setLoading] = useState(false);
	const [vdata, setData] = useState([]);

	const { videoInfo } = useSelector((state) => state.video);

	const dispatch = useDispatch();

	useEffect(() => {
		setLoading(true);
		dispatch(fetchVideos()).then(() => {
			setLoading(false);
		});
	}, [dispatch]);

	useEffect(() => {
		if (videoInfo && Array.isArray(videoInfo.data)) {
			setData(videoInfo.data);
		}
	}, [videoInfo]);

	const Skeletonloader = () => {
		const skeletonArray = Array(20).fill(0);

		return (
			<div className="flex gap-4 flex-wrap h-full ">
<div className="text-center w-full flex justify-center">Please Wait a little if  not loading Try Refreshing Page<span className="loading loading-spinner loading-lg"></span></div>
				{skeletonArray.map((_, index) => (
					<div
						key={index}
						className="flex w-52 flex-col gap-4"
					>
						<div className="skeleton h-32 w-full"></div>
						<div className="skeleton h-4 w-28"></div>

						<div className="skeleton h-4 w-full"></div>
						<div className="skeleton h-4 w-full"></div>
					</div>

				))}

			</div>
		);
	};
	return (
		<div className=" p-0 min-h-screen ">
			{loading ? (
				<Skeletonloader />
			) : (
				<div className=" flex ">

					<div className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
						{vdata.map((video, index) => (
							<VideoCard key={index} video={video} />
						))}
					</div>
				</div>
			)}
		</div>
	);
}

export default Videos;
