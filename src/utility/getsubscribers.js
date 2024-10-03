import axios from "axios";
import { toast } from "react-toastify";

export const getSubscribers = async (id) => {
	const backendUrl = "/api";
	try {
		const res = await axios.get(
			`${backendUrl}/subscriptions/u/${id}`
		);
		console.log(res.data);

		return res.data;
	} catch (error) {
		console.log(
			"error in getting channel subscribers",
			error
		);

		toast.error(error.message);
	}
};
