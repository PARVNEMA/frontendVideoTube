import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import store from "./store/Store.js";
import { Provider } from "react-redux";

import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from "react-router-dom";
import Errorpage from "./utility/Errorpage.jsx";
import Login from "./Pages/Login.jsx";
import Signup from "./Pages/Signup.jsx";
import UserProfile from "./Pages/userProfile.jsx";
import Videos from "./Pages/Videos.jsx";
import { CookiesProvider } from "react-cookie";
import PostVideo from "./Pages/PostVideo.jsx";
import DetailedVideo from "./Pages/DetailedVideo.jsx";
import Logout from "./Pages/Logout.jsx";
import { Bounce, ToastContainer } from "react-toastify";
import Subscriptions from "./Pages/Subscriptions.jsx";
import OtherChannel from "./Pages/OtherChannel.jsx";
import WatchHistory from "./Pages/WatchHistory.jsx";
import UpdateVideo from "./Pages/UpdateVideo.jsx";
import Tweets from "./Pages/Tweets.jsx";
import UserVideos from "./Pages/UserVideos.jsx";
import { AuthProvider } from "./Components/Logincontext.jsx";


const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{ path: "/", element: <Videos /> },
			{ path: "/login", element: <Login /> },
			{ path: "/signup", element: <Signup /> },
			{
				path: "/userprofile",
				element: <UserProfile />,
			},
			{ path: "/*", element: <Errorpage /> },
			{
				path: "/publishvideo",
				element: <PostVideo />,
			},
			{
				path: "/video/:videoid",
				element: <DetailedVideo />,
			},
			{ path: "/logout", element: <Logout /> },
			{
				path: "/subscribedchannels",
				element: <Subscriptions />,
			},
			{
				path: "/user/c/:username",
				element: <OtherChannel />,
			},
			{
				path: "/watchhistory",
				element: <WatchHistory />,
			},
			{
				path: "/updatevideo/:videoid",
				element: <UpdateVideo />,
			},
			{
				path: "/tweets",
				element: <Tweets />,
			},
			{
				path: "/uservideos",
				element: <UserVideos />,
			},
		],
	},
]);
createRoot(document.getElementById("root")).render(
	<StrictMode>
		<CookiesProvider defaultSetOptions={{ path: "/" }}>
			<Provider store={store}>
				<AuthProvider>
					<RouterProvider router={router} />
					<ToastContainer
						position="bottom-right"
						autoClose={5000}
						hideProgressBar={false}
						newestOnTop={false}
						closeOnClick
						rtl={false}
						pauseOnFocusLoss
						draggable
						pauseOnHover
						theme="dark"
						transition={Bounce}
					/>
				</AuthProvider>
			</Provider>
		</CookiesProvider>
	</StrictMode>
);
