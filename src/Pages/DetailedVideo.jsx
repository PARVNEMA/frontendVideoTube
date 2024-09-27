import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
function DetailedVideo() {
    const [video, setvideo] = useState([]);

    const backendurl = "/api";
    const { videoid } = useParams();
    async function fetchvideoDetails() {
        const videodetails = await axios.get(`${backendurl}/videos/${videoid}`);
        console.log(videodetails.data);
        setvideo(videodetails.data.data);
    }
    useEffect(() => {
        fetchvideoDetails();
    }, [videoid]);
    console.log(video.videoFile);
    return (
        <div className="max-w-5xl mx-auto my-8">
            <div className="relative">
                <video
                    className="w-full rounded-lg h-[32rem]
                     object-cover"
                    controls
                    src={`${video.videoFile}`}
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
                        {video.title}
                    </h1>
                    <div className="flex space-x-4">
                        <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300">
                            <i className="fas fa-thumbs-up"></i> Like{" "}
                            {video.likes}
                        </button>
                        <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300">
                            <i className="fas fa-share"></i> Share
                        </button>
                        <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300">
                            <i className="fas fa-save"></i> Save
                        </button>
                    </div>
                </div>

                <div className="text-gray-500 mt-1">
                    <span>{video.views} views</span> •{" "}
                    <span>{video.createdAt}</span>
                </div>

                <div className="mt-4 text-gray-200">
                    <p>
                        <strong>Description:</strong> {video.description}
                    </p>
                </div>

                <hr className="my-6 border-gray-300" />

                <div className="flex items-center">
                    <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                    <div className="flex-1">
                        <h2 className="text-lg font-semibold">{video.owner}</h2>
                    </div>
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                        Subscribe
                    </button>
                </div>

                <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-4 text-white">
                        Comments
                    </h3>

                    <div className="flex space-x-4 mb-6">
                        <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                        <input
                            type="text"
                            placeholder="Add a comment..."
                            className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        />
                        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                            Comment
                        </button>
                    </div>

                    <div className="space-y-4">
                        <div className="flex space-x-4">
                            <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                            <div className="flex-1">
                                <p className="font-semibold">
                                    User1{" "}
                                    <span className="text-gray-500 text-sm">
                                        2 days ago
                                    </span>
                                </p>
                                <p className="text-gray-700">Great video!</p>
                            </div>
                        </div>
                        <div className="flex space-x-4">
                            <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                            <div className="flex-1">
                                <p className="font-semibold">
                                    User2{" "}
                                    <span className="text-gray-500 text-sm">
                                        1 day ago
                                    </span>
                                </p>
                                <p className="text-gray-700">
                                    Thanks for sharing this.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailedVideo;
