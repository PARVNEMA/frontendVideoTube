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
import { Bounce, ToastContainer, toast } from "react-toastify";
const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { path: "/", element: <Videos /> },
            { path: "/login", element: <Login /> },
            { path: "/signup", element: <Signup /> },
            { path: "/userprofile", element: <UserProfile /> },
            { path: "/*", element: <Errorpage /> },
            { path: "/publishvideo", element: <PostVideo /> },
            { path: "/video/:videoid", element: <DetailedVideo /> },
            { path: "/logout", element: <Logout /> },
        ],
    },
]);
createRoot(document.getElementById("root")).render(
    <StrictMode>
        <CookiesProvider defaultSetOptions={{ path: "/" }}>
            <Provider store={store}>
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
            </Provider>
        </CookiesProvider>
    </StrictMode>
);
