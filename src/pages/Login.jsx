import React, { useContext, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";
import { useToast } from "../context/ToastContext";

export const Login = () => {
  const { Login, googleAuth, auth } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const emailRef = useRef();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.target);
    const email = formData.get("email") || "";
    const password = formData.get("password") || "";

    try {
      await Login(email, password);
      toast.success("Login successful! Welcome back.");
      navigate(location.state || "/");
    } catch (error) {
      toast.error("Incorrect email or password");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleAuth = async () => {
    setIsSubmitting(true);
    
    try {
      await googleAuth();
      toast.success("Google login successful!");
      navigate(location.state || "/");
    } catch (error) {
      toast.error(error.message || "Failed to login with Google");
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
              Login
            </h2>
            <div className="flex justify-center">
              <div className="w-16 h-1 bg-primary rounded-full" />
            </div>
            <p className={`mt-4 ${theme === "dark" ? "text-gray-300" : "text-gray-600"} transition-colors duration-200`}>
              Sign in to access your GardenCommunity account
            </p>
          </div>

          <div className={`${theme === "dark" ? "bg-gray-700 border-gray-600" : "bg-white border-gray-100"} rounded-lg shadow-md overflow-hidden border p-6 transition-colors duration-200`}>
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className={`block text-sm font-medium ${theme === "dark" ? "text-gray-200" : "text-gray-700"} mb-1 transition-colors duration-200`}
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className={`w-full px-4 py-3 rounded-md border text-base ${
                    theme === "dark" 
                      ? "border-gray-600 bg-gray-600 text-white placeholder-gray-400" 
                      : "border-gray-300 bg-white text-gray-800 placeholder-gray-500"
                  } focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors duration-200`}
                  placeholder="Enter your email"
                  ref={emailRef}
                  required
                />
              </div>

              <div className="mb-6">
                <div className="flex justify-between items-center mb-1">
                  <label
                    htmlFor="password"
                    className={`block text-sm font-medium ${theme === "dark" ? "text-gray-200" : "text-gray-700"} transition-colors duration-200`}
                  >
                    Password
                  </label>
                  <Link
                    to="/forget-password"
                    className={`${theme === "dark" ? "text-white" : "text-primary"} text-xs text-primary hover:underline`}
                  >
                    Forget Password?
                  </Link>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    className={`w-full px-4 py-3 rounded-md border text-base ${
                      theme === "dark" 
                        ? "border-gray-600 bg-gray-600 text-white placeholder-gray-400" 
                        : "border-gray-300 bg-white text-gray-800 placeholder-gray-500"
                    } focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors duration-200`}
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${theme === "dark" ? "text-gray-400" : "text-gray-500"} transition-colors duration-200`}
                  >
                    {showPassword
                      ? <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                          />
                        </svg>
                      : <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`btn ${theme === "dark" ? "bg-primary hover:bg-primary-focus text-white" : "bg-primary hover:bg-primary-focus text-white"} btn-lg w-full transition-colors duration-200 mb-4 ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""}`}
              >
                {isSubmitting ? (
                  <>
                    <span className="loading loading-spinner loading-sm mr-2"></span>
                    Logging in...
                  </>
                ) : (
                  "Login"
                )}
              </button>
            </form>

            <div className="relative flex items-center justify-center my-6">
              <div className={`absolute w-full border-t ${theme === "dark" ? "border-gray-600" : "border-gray-300"} transition-colors duration-200`} />
              <span className={`relative ${theme === "dark" ? "bg-gray-700 text-gray-400" : "bg-white text-gray-500"} px-4 text-sm transition-colors duration-200`}>
                Or continue with
              </span>
            </div>

            <button
              onClick={handleGoogleAuth}
              type="button"
              disabled={isSubmitting}
              className={`btn btn-outline btn-lg w-full ${
                theme === "dark" 
                  ? "border-gray-400 text-gray-300 hover:bg-gray-600" 
                  : "border-gray-300 text-gray-700 hover:bg-gray-100"
              } transition-colors duration-200 mb-6 ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""}`}
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M12.545, 10.239v3.821h5.445c-0.712, 2.315-2.647, 3.972-5.445, 3.972-3.332, 0-6.033-2.701-6.033-6.032s2.701-6.032, 6.033-6.032c1.498, 0, 2.866, 0.549, 3.921, 1.453l2.814-2.814C17.503, 2.988, 15.139, 2, 12.545, 2 7.021, 2, 2.543, 6.477, 2.543, 12s4.478, 10, 10.002, 10c8.396, 0, 10.249-7.85, 9.426-11.748l-9.426, -0.013z"
                />
              </svg>
              Continue with Google
            </button>

            <div className="text-center">
              <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"} transition-colors duration-200`}>
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className={`${theme === "dark" ? "text-white" : "text-primary"} hover:underline font-medium`}
                >
                  Register Now
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};