import React, { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";
import { sendPasswordResetEmail } from "firebase/auth";

export const ForgetPass = () => {
  const { auth } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  const emailRef = useRef();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    
    const email = emailRef.current.value.trim();
    if (!email) return;

    setIsSubmitting(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setSuccess("A password reset email has been sent. Please check your inbox.");
    } catch (error) {
      setError(error.message || "Password reset failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`flex flex-col lg:flex-row w-full min-h-[calc(100vh-64px)] ${theme === "dark" ? "bg-gray-800" : "bg-gray-50"} transition-colors duration-200`}>
      <div className="w-full lg:w-1/2 flex items-center justify-center m-auto p-6 md:p-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className={`text-3xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"} mb-3 transition-colors duration-200`}>
              Password Reset
            </h2>
            <div className="flex justify-center">
              <div className="w-16 h-1 bg-primary rounded-full" />
            </div>
            <p className={`mt-4 ${theme === "dark" ? "text-gray-300" : "text-gray-600"} transition-colors duration-200`}>
              Enter your email address to receive a password reset link
            </p>
          </div>

          <div className={`${theme === "dark" ? "bg-gray-700 border-gray-600" : "bg-white border-gray-100"} rounded-lg shadow-md overflow-hidden border p-6 transition-colors duration-200`}>
            <form onSubmit={handleReset}>
              <div className="mb-6">
                <label
                  htmlFor="email"
                  className={`block text-sm font-medium ${theme === "dark" ? "text-gray-200" : "text-gray-700"} mb-1 transition-colors duration-200`}
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  ref={emailRef}
                  className={`w-full px-4 py-3 rounded-md border text-base ${
                    theme === "dark" 
                      ? "border-gray-600 bg-gray-600 text-white placeholder-gray-400" 
                      : "border-gray-300 bg-white text-gray-800 placeholder-gray-500"
                  } focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors duration-200`}
                  placeholder="Enter your email"
                  required
                />
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-md">
                  <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                </div>
              )}

              {success && (
                <div className="mb-4 p-3 bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-md">
                  <p className="text-sm text-green-600 dark:text-green-400">{success}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className={`btn ${theme === "dark" ? "bg-primary hover:bg-primary-focus text-white" : "bg-primary hover:bg-primary-focus text-white"} btn-lg w-full transition-colors duration-200 mb-4 ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""}`}
              >
                {isSubmitting ? (
                  <>
                    <span className="loading loading-spinner loading-sm mr-2"></span>
                    Sending...
                  </>
                ) : (
                  "Reset Password"
                )}
              </button>
            </form>

            <div className="text-center mt-4">
              <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"} transition-colors duration-200`}>
                Remember your password?{" "}
                <Link
                  to="/login"
                  className={`${theme === "dark" ? "text-white" : "text-primary"} hover:underline font-medium`}
                >
                  Back to Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};