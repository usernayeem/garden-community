import React, { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom"; // Ensure you're using the correct import for React Router
import { AuthContext } from "../context/AuthContext";
import { sendPasswordResetEmail } from "firebase/auth";

export const ForgetPass = () => {
  const { auth } = useContext(AuthContext);
  const emailRef = useRef();
  const [error, setError] = useState();
  const [success, setSuccess] = useState();
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    await passReset();
  };

  const passReset = async () => {
    const email = emailRef.current.value.trim();

    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setSuccess("A password reset email has been sent. Please check your email.");
    } catch {
      setError("Password reset failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row w-full min-h-[calc(100vh-64px)]">
      <div className="w-full lg:w-1/2 flex items-center justify-center m-auto p-6 md:p-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
              Password Reset
            </h2>
            <div className="flex justify-center">
              <div className="w-16 h-1 bg-primary rounded-full" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden border border-gray-100 dark:border-gray-600 p-6">
            <form onSubmit={handleReset}>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  ref={emailRef}
                  className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white text-base focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 px-4 ${loading ? 'bg-gray-400' : 'bg-primary hover:bg-opacity-90'} text-white font-medium rounded-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary mb-4`}
              >
                {loading ? 'Sending...' : 'Reset Password'}
              </button>
            </form>

            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Go back to{" "}
                <Link
                  to="/login"
                  className="text-primary hover:underline font-medium"
                >
                  Login
                </Link>
              </p>
            </div>
            {error && <p className="text-red-500 text-center">{error}</p>}
            {success && <p className="text-green-500 text-center">{success}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};