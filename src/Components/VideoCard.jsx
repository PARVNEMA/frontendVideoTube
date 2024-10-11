import React from "react";
import { Link } from "react-router-dom";

function VideoCard({ video }) {
    return (
        <Link
        to={`/video/${video._id}`}
        target="_blank"
        rel="noopener noreferrer"

    >
        <div className="w-68 bg-white rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer">
            <div className="relative">
                <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-48 object-cover"
                />
            </div>
            <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {video.title}
                </h3>
                <p className="text-gray-700 text-sm mb-4">
                    {video.description}
                </p>
                <div className="text-gray-500 text-sm mb-2">
                    <span>{video.views} views</span> •{" "}
                    <span>Duration: {video.duration.toFixed(2)} sec</span>
                </div>


            </div>
        </div>
                </Link>
    );
}

export default VideoCard;
