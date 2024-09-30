import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
    Link,
    Navigate,
    useNavigate,
} from "react-router-dom";
import { registerUser } from "../store/authActions";
function Signup() {
    const { register, handleSubmit } = useForm();

    const { loading, userInfo, error, success } =
        useSelector((state) => state.auth);

    const dispatch = useDispatch();

    const submitForm = (data) => {
        data.email = data.email.toLowerCase();
        dispatch(registerUser(data));
        console.log(
            "====================================",
            typeof data
        );
        console.log(data);
        navigate("/login");
    };
    const navigate = useNavigate();

    return (
        <>
            <section className="">
                <div className=" lg:min-h-screen flex items-center justify-center ghost-white ">
                    <main className="flex items-center justify-center  sm:px-12 ">
                        <div className="max-w-xl lg:max-w-4xl">
                            <a
                                className="block text-blue-600"
                                href="#"
                            >
                                <span className="sr-only">
                                    Home
                                </span>
                            </a>

                            <h1 className="mt-6 text-2xl font-bold  sm:text-3xl md:text-4xl ghost-white text-center">
                                Welcome to Squid
                            </h1>

                            <p className="mt-4 leading-relaxed text-gray-500 dark:text-gray-400">
                                Lorem, ipsum dolor sit amet
                                consectetur adipisicing
                                elit. Eligendi nam dolorum
                                aliquam, quibusdam aperiam
                                voluptatum.
                            </p>

                            <form
                                action="#"
                                className="mt-8 grid grid-cols-6 gap-6"
                                onSubmit={handleSubmit(
                                    submitForm
                                )}
                            >
                                <div className="col-span-2 sm:col-span-4">
                                    <label
                                        htmlFor="FirstName"
                                        className="block text-sm font-medium ghost-white "
                                    >
                                        fullName
                                    </label>

                                    <input
                                        type="text"
                                        id="FirstName"
                                        name="fullName"
                                        className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm ghost-whiteshadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 py-2 px-2"
                                        {...register(
                                            "fullName"
                                        )}
                                    />
                                </div>

                                <div className="col-span-6 sm:col-span-4">
                                    <label
                                        htmlFor="LastName"
                                        className="block text-sm font-medium ghost-whitedark:text-gray-200"
                                    >
                                        username
                                    </label>

                                    <input
                                        type="text"
                                        id="LastName"
                                        name="username"
                                        className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm ghost-whiteshadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 py-2 px-2"
                                        {...register(
                                            "username"
                                        )}
                                    />
                                </div>

                                <div className="col-span-4">
                                    <label
                                        htmlFor="Email"
                                        className="block text-sm font-medium ghost-whitedark:text-gray-200"
                                    >
                                        Email
                                    </label>

                                    <input
                                        type="email"
                                        id="Email"
                                        name="email"
                                        className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm ghost-whiteshadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 py-2 px-2"
                                        {...register(
                                            "email"
                                        )}
                                    />
                                </div>
                                <div className="col-span-6 sm:col-span-4">
                                    <label
                                        htmlFor="Password"
                                        className="block text-sm font-medium ghost-whitedark:text-gray-200"
                                    >
                                        Password
                                    </label>

                                    <input
                                        type="password"
                                        id="Password"
                                        name="password"
                                        className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm ghost-whiteshadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 py-2 px-2"
                                        {...register(
                                            "password"
                                        )}
                                    />
                                </div>
                                <div className="col-span-6 sm:col-span-4">
                                    <label
                                        htmlFor="avatar"
                                        className="block text-sm font-medium ghost-whitedark:text-gray-200"
                                    >
                                        Avatar
                                    </label>

                                    <input
                                        type="file"
                                        id="avatar"
                                        name="avatar"
                                        className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm ghost-whiteshadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 py-2 px-2"
                                        {...register(
                                            "avatar"
                                        )}
                                    />
                                </div>
                                <div className="col-span-6 sm:col-span-4">
                                    <label
                                        htmlFor="coverImage"
                                        className="block text-sm font-medium ghost-whitedark:text-gray-200"
                                    >
                                        coverImage
                                    </label>

                                    <input
                                        type="file"
                                        id="coverImage"
                                        name="coverImage"
                                        className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm ghost-whiteshadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 py-2 px-2"
                                        {...register(
                                            "coverImage"
                                        )}
                                    />
                                </div>

                                <div className="col-span-6">
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        By creating an
                                        account, you agree
                                        to our
                                        <a
                                            href="#"
                                            className="ghost-whiteunderline dark:text-gray-200"
                                        >
                                            terms and
                                            conditions
                                        </a>
                                        and
                                        <a
                                            href="#"
                                            className="ghost-whiteunderline dark:text-gray-200"
                                        >
                                            {" "}
                                            privacy policy{" "}
                                        </a>
                                        .
                                    </p>
                                </div>

                                <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                                    <button className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 dark:hover:bg-blue-700 dark:hover:text-white">
                                        Create an account
                                    </button>

                                    <p className="mt-4 text-sm text-gray-500 sm:mt-0 dark:text-gray-400">
                                        Already have an
                                        account?
                                        <Link
                                            to={"/login"}
                                            className="ghost-whiteunderline dark:text-gray-200"
                                        >
                                            Log in
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

export default Signup;
