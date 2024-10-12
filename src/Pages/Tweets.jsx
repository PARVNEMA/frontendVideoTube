import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";

function Tweets() {
	const [tweet, settweet] = useState("");
	const [alltweet, setalltweet] = useState([]);
	const [userdata, setuserdata] = useState();
	const [isTodoEditable, setIsTodoEditable] =
		useState(false);
	const [todoMsg, setTodoMsg] =
		useState("");
	const backendUrl = import.meta.env.VITE_URL;
	const [cookies] = useCookies([
		"accessToken,refreshToken",
	]);
	async function getCurrentUser() {
		try {
			const res = await axios.get(
				`${backendUrl}/users/current-user`,
				{
					withCredentials: true, // This ensures cookies are included in requests
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${cookies.accessToken}`,
					},
				}
			);
			console.log("current user in tweets", res.data);
			setuserdata(res.data);
			// console.log(user);
		} catch (error) {
			toast.error(error);
		}
	}
	async function sendTweet() {
		try {
			const res = await axios.post(
				`${backendUrl}/tweets`,
				{ content: tweet },
				{
					withCredentials: true,
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${cookies.accessToken}`,
					},
				}
			);
			console.log("tweet content sended", res.data);
			if (res.data) {
				settweet("");
			}
			// console.log(user);
		} catch (error) {
			toast.error(error);
		}
	}
	async function deleteTweet(id) {
		try {
			const res = await axios.delete(
				`${backendUrl}/tweets/${id}`,
				{
					withCredentials: true,
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${cookies.accessToken}`,
					},
				}
			);
			toast.success("deleted tweet succesfully");
			// console.log(user);
		} catch (error) {
			toast.error(error);
		}
	}
	async function fetchAllTweets() {
		try {
			const res = await axios.get(`${backendUrl}/tweets`, {
				withCredentials: true, // This ensures cookies are included in requests
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${cookies.accessToken}`,
				},
			});
			console.log("all received tweets", res.data.data);
			setalltweet(res.data.data);

			// console.log(user);
		} catch (error) {
			toast.error(error);
		}
	}

	async function editTodo(id){
		try {
			const res = await axios.patch(`${backendUrl}/tweets/${id}`, {
				content: todoMsg,
			},{
				withCredentials: true, // This ensures cookies are included in requests
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${cookies.accessToken}`,
				},
			});
			setIsTodoEditable(false)
			setTodoMsg(" ")
			toast.success("Edited tweet succesfully");

			// console.log(user);
		} catch (error) {
			toast.error(error);
		}
	}
	useEffect(() => {
		getCurrentUser();
		fetchAllTweets();
	}, [settweet]);
	return (
		<div>
			<label className="input input-bordered flex items-center gap-2 ">
				<input
					type="text"
					className="grow"
					placeholder="Search"
					value={tweet}
					onChange={(e) => settweet(e.target.value)}
				/>

				<button onClick={sendTweet}>Send</button>
			</label>

			<div>
				{alltweet.map((item) => (
					<div
						className={`chat ${
							item?.tweets?._id === userdata?.data?._id
								? "chat-end"
								: "chat-start"
						}
						} `}
					>
						<div className="chat-image avatar">
							<div className="w-10 rounded-full">
								<img
									alt="Tailwind CSS chat bubble component"
									src={item.tweets.avatar}
								/>
							</div>
						</div>
						<div className="chat-header">
							{item.tweets.username}
							<time className="text-xs opacity-50">
								{item.tweets.createdAt}
							</time>
						</div>
					<div>
						{item.content}
					</div>
						<div
							className={`${
								item?.tweets?._id === userdata?.data?._id
									? "text-red-500"
									: "hidden"
							}`}
						>
							{" "}
							<button
								onClick={() => {
									deleteTweet(item._id);
								}}
							>
								Delete
							</button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default Tweets;
