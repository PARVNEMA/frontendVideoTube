import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVideos } from "../store/videoAction";
import VideoCard from "../Components/VideoCard"; // Importing the VideoCard component

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

    return (
        <div className="container mx-auto py-8">
            {loading ? (
                <div className="text-center">Loading...</div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {vdata.map((video, index) => (
                        <VideoCard key={index} video={video} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Videos;
