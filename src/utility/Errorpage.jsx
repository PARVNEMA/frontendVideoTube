import React from "react";

function Errorpage() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-gray-800">404</h1>
                <p className="text-2xl text-gray-600">Oops! Page not found.</p>
                <a
                    href="/"
                    className="mt-4 inline-block px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                >
                    Go Home
                </a>
            </div>
        </div>
    );
}

export default Errorpage;
