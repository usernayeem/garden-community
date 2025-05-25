import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, NavLink } from "react-router-dom";
import { useToast } from "../context/ToastContext";
import { ThemeContext } from "../context/ThemeContext";

export const Navbar = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileDropdownRef = useRef(null);
  const toast = useToast();
  const { handleToggleTheme, theme } = useContext(ThemeContext);

  const { user, dbUser, Logout } = useContext(AuthContext);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = event => {
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target)
      ) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileDropdownRef]);

  const toggleProfileDropdown = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const handleLogout = () => {
    Logout()
      .then(() => {
        setIsProfileOpen(false);
        toast.info("Logout successful!.");
      })
      .catch(error => {
        toast.error("An error happened.");
      });
  };

  // Get user's display name and photo URL
  const getUserPhoto = () => {
    if (user && user.photoURL) {
      return user.photoURL;
    } else if (dbUser && dbUser.photoURL) {
      return dbUser.photoURL;
    }
    return "https://i.ibb.co/4wsPz9SL/profile-removebg-preview.webp";
  };

  const getUserName = () => {
    if (user && user.displayName) {
      return user.displayName;
    } else if (dbUser && dbUser.name) {
      return dbUser.name;
    }
    return "Name not available";
  };

  return (
    <div
      className={`navbar shadow-md sticky top-0 z-50 transition-colors duration-200 ${
        theme === "dark" ? "bg-gray-800 text-gray-200" : "bg-white text-gray-800"
      }`}
    >
      <div className="navbar-start">
        <Link
          to="/"
          className="btn btn-ghost normal-case text-lg lg:text-xl flex items-center gap-0"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mr-2 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            />
          </svg>
          GardenCommunity
        </Link>
      </div>

      {/* Desktop Navigation Links */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 flex gap-2">
          <li>
            <NavLink 
              to="/"
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/explore-gardeners"
            >
              Explore Gardeners
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/browse-tips"
            >
              Browse Tips
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/share-tip"
            >
              Share a Garden Tip
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/my-tips"
            >
              My Tips
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="navbar-end flex items-center">
        {/* Theme Toggle Button */}
        <button 
          className="btn btn-ghost btn-sm flex items-center justify-center px-2 mx-2" 
          onClick={handleToggleTheme}
          aria-label="Toggle theme"
        >
          {theme === "dark" ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          )}
        </button>

        {/* User profile with dropdown and tooltip */}
        {user ? (
          <div className="relative mr-4" ref={profileDropdownRef}>
            <div className="group tooltip-trigger relative">
              <div
                className="avatar cursor-pointer"
                onClick={toggleProfileDropdown}
              >
                <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img
                    className="rounded-full"
                    src={getUserPhoto()}
                    alt="Profile"
                  />
                </div>
              </div>

              {/* Tooltip */}
              {!isProfileOpen && (
                <span className="w-30 tooltip absolute z-10 -bottom-8 left-1/5 transform -translate-x-1/2 px-3 py-1 text-sm font-medium text-white bg-primary rounded-md break-normal text-center">
                  {getUserName()}
                </span>
              )}
            </div>

            {/* Dropdown menu */}
            {isProfileOpen && (
              <div className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 transition-colors duration-200 ${
                theme === "dark" ? "bg-gray-700" : "bg-white"
              }`}>
                <div className={`px-4 py-2 text-sm border-b ${
                  theme === "dark" 
                    ? "text-gray-200 border-gray-600" 
                    : "text-gray-700 border-gray-200"
                }`}>
                  <p className="font-semibold">
                    {getUserName()}
                  </p>
                  <p className="text-xs">
                    {user && user.email ? user.email : "Email not available"}
                  </p>
                </div>

                <button
                  onClick={handleLogout}
                  className={`block w-full text-left px-4 py-2 text-sm text-red-600 ${
                    theme === "dark" 
                      ? "hover:bg-gray-600" 
                      : "hover:bg-gray-100"
                  }`}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <ul className="hidden lg:flex gap-4 mr-4">
            <li>
              <Link to="/login" className="btn btn-primary text-white">
                Login
              </Link>
            </li>
            <li>
              <Link to="/register" className="btn btn-primary text-white">
                Register
              </Link>
            </li>
          </ul>
        )}

        {/* Mobile menu */}
        <div className="dropdown dropdown-end lg:hidden">
          <label tabIndex={0} className="btn btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>

          {/* dropdown menu */}
          <ul
            tabIndex={0}
            className={`menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow rounded-box w-52 transition-colors duration-200 ${
              theme === "dark" ? "bg-gray-700 text-gray-200" : "bg-base-100 text-gray-800"
            }`}
          >
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/explore-gardeners">Explore Gardeners</NavLink>
            </li>
            <li>
              <NavLink to="/browse-tips">Browse Tips</NavLink>
            </li>
            <li>
              <NavLink to="/share-tip">Share a Garden Tip</NavLink>
            </li>
            <li>
              <NavLink to="/my-tips">My Tips</NavLink>
            </li>
            {!user && (
              <>
                <li className={`border-t mt-2 pt-2 ${
                  theme === "dark" ? "border-gray-600" : "border-gray-200"
                }`}>
                  <NavLink to="/login">Login</NavLink>
                </li>
                <li>
                  <NavLink to="/register">Register</NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};