import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { LoginUser } from "../store/authActions";
import { useCookies } from "react-cookie";
function Login() {
    const { register, handleSubmit } = useForm();
    const [cookies, setCookie, removeCookie] = useCookies([
        "accessToken,refreshToken",
    ]);
    const { loading, userInfo, error, success } = useSelector(
        (state) => state.auth
    );
    const userObject = { id: 1 };
    const dispatch = useDispatch();

    const submitForm = (data) => {
        data.email = data.email.toLowerCase();
        dispatch(LoginUser(data));
    };

    console.log("loginwala", userInfo);
  

    const navigate = useNavigate();

    useEffect(() => {
        if (userInfo) {
            // Set cookies if userInfo is available and contains tokens
            setCookie("accessToken", userInfo.data.accessToken, {
                path: "/",
            });
            setCookie("refreshToken", userInfo.data.refreshToken, {
                path: "/",
            });
            console.log(userInfo.data.accessToken);

            navigate("/userprofile"); // Redirect to user profile after successful login
        }
    }, [navigate, userInfo, success]);
    return (
        <>
            <section className="bg-white dark:bg-gray-900">
                <div className=" lg:min-h-screen flex items-center justify-center ">
                    <main className="flex items-center justify-center  sm:px-12 ">
                        <div className="max-w-xl lg:max-w-4xl">
                            <a className="block text-blue-600" href="#">
                                <span className="sr-only">Home</span>
                            </a>

                            <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl dark:text-white text-center">
                                Welcome to Squid
                            </h1>

                            <p className="mt-4 leading-relaxed text-gray-500 dark:text-gray-400">
                                Lorem, ipsum dolor sit amet consectetur
                                adipisicing elit. Eligendi nam dolorum aliquam,
                                quibusdam aperiam voluptatum.
                            </p>

                            <form
                                action="#"
                                className="mt-8 grid grid-cols-6 gap-6"
                                onSubmit={handleSubmit(submitForm)}
                            >
                                <div className="col-span-4">
                                    <label
                                        htmlFor="Email"
                                        className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                                    >
                                        Email
                                    </label>

                                    <input
                                        type="email"
                                        id="Email"
                                        name="email"
                                        className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 py-2 px-2"
                                        {...register("email")}
                                    />
                                </div>

                                <div className="col-span-6 sm:col-span-4">
                                    <label
                                        htmlFor="Password"
                                        className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                                    >
                                        Password
                                    </label>

                                    <input
                                        type="password"
                                        id="Password"
                                        name="password"
                                        className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 py-2 px-2"
                                        {...register("password")}
                                    />
                                </div>

                                <div className="col-span-6">
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        By creating an account, you agree to our
                                        <a
                                            href="#"
                                            className="text-gray-700 underline dark:text-gray-200"
                                        >
                                            terms and conditions
                                        </a>
                                        and
                                        <a
                                            href="#"
                                            className="text-gray-700 underline dark:text-gray-200"
                                        >
                                            {" "}
                                            privacy policy{" "}
                                        </a>
                                        .
                                    </p>
                                </div>

                                <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                                    <button
                                        className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 dark:hover:bg-blue-700 dark:hover:text-white"
                                        type="submit"
                                    >
                                        Login
                                    </button>

                                    <p className="mt-4 text-sm text-gray-500 sm:mt-0 dark:text-gray-400">
                                        Don't have an account?
                                        <Link
                                            to={"/signup"}
                                            className="text-gray-700 underline dark:text-gray-200"
                                        >
                                            SignUp
                                        </Link>
                                        .
                                    </p>
                                </div>
                            </form>
                        </div>
                    </main>
                </div>
            </section>
        </>
    );
}

export default Login;
