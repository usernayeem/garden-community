import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

export const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { registerUser, setUser, googleAuth, updateUserProfile } = useContext(
    AuthContext
  );
  const toast = useToast();
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validatePassword = password => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(
      password
    );
    const isValidLength = password.length >= 8;

    return hasUpperCase && hasLowerCase && hasSpecialChar && isValidLength;
  };

  const saveUserToMongoDB = userData => {
    return fetch("https://garden-community-brown.vercel.app/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userData)
    });
  };

  const handleRegistration = async e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("name") || "";
    const email = formData.get("email") || "";
    const photoUrl = formData.get("photo") || "";
    const password = formData.get("password") || "";

    if (!validatePassword(password)) {
      toast.warning(
        "Password must have at least 8 characters, including an uppercase letter, a lowercase letter, and a special character."
      );
      return;
    }

    try {
      // Step 1: Register with Firebase
      const result = await registerUser(email, password);
      const user = result.user;

      // Step 2: Update Firebase profile if name or photo provided
      if (name || photoUrl) {
        await updateUserProfile(name, photoUrl);
      }

      // Step 3: Save user data to MongoDB
      const userData = {
        uid: user.uid,
        name: name || user.displayName || "",
        email: user.email,
        photoURL: photoUrl || user.photoURL || "",
        createdAt: new Date().toISOString()
      };

      await saveUserToMongoDB(userData);

      // Step 4: Update local user state and redirect
      setUser({ ...user, displayName: name || user.displayName });
      toast.success("Registration successful! Welcome to GardenCommunity!");
      navigate(`${location.state ? location.state : "/"}`);
    } catch (error) {
      toast.error(error.message || "Registration failed. Please try again.");
    }
  };

  const handleGoogleAuth = async () => {
    try {
      // Step 1: Authenticate with Google
      const result = await googleAuth();
      const user = result.user;

      // Step 2: Save user data to MongoDB
      const userData = {
        uid: user.uid,
        name: user.displayName || "",
        email: user.email,
        photoURL: user.photoURL || "",
        createdAt: new Date().toISOString()
      };

      await saveUserToMongoDB(userData);

      // Step 3: Update local user state and redirect
      setUser(user);
      toast.success("Google signup successful! Welcome to GardenCommunity!");
      navigate(`${location.state ? location.state : "/"}`);
    } catch (error) {
      toast.error(error.message || "Google signup failed. Please try again.");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row w-full min-h-[calc(100vh-64px)]">
      <div className="w-full lg:w-1/2 flex items-center justify-center m-auto p-6 md:p-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
              Signup
            </h2>
            <div className="flex justify-center">
              <div className="w-16 h-1 bg-primary rounded-full" />
            </div>
            <p className="mt-4 text-gray-600 dark:text-gray-300">
              Join the GardenCommunity and connect with fellow plant enthusiasts
            </p>
          </div>

          <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden border border-gray-100 dark:border-gray-600 p-6">
            <form onSubmit={handleRegistration}>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white text-base focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter your name"
                />
              </div>

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
                  name="email"
                  className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white text-base focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="mb-6">
                <div className="flex justify-between items-center mb-1">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Password
                  </label>
                  <Link
                    to="/forgot-password"
                    className="text-xs text-primary hover:underline"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white text-base focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400"
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
                <p className="text-xs text-gray-500 mt-1">
                  Must be at least 8 characters with 1 uppercase, 1 lowercase,
                  and 1 special character.
                </p>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="photo"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  PhotoURL
                </label>
                <input
                  type="text"
                  id="photo"
                  name="photo"
                  className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white text-base focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter your photo url"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 bg-primary hover:bg-opacity-90 text-white font-medium rounded-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary mb-4"
              >
                Register
              </button>
            </form>

            <div className="relative flex items-center justify-center my-6">
              <div className="absolute w-full border-t border-gray-300 dark:border-gray-600" />
              <span className="relative bg-white dark:bg-gray-700 px-4 text-sm text-gray-500 dark:text-gray-400">
                Or continue with
              </span>
            </div>

            <button
              onClick={handleGoogleAuth}
              type="button"
              className="w-full py-3 px-4 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 text-gray-800 dark:text-white font-medium rounded-md transition duration-300 ease-in-out border border-gray-300 dark:border-gray-600 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 mb-6"
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
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-primary hover:underline font-medium"
                >
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
