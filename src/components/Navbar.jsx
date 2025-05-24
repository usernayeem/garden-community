import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { useToast } from "../context/ToastContext";

export const Navbar = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileDropdownRef = useRef(null);
  const toast = useToast();

  const { user, dbUser, Logout } = useContext(AuthContext);

  // Close dropdown when clicking outside
  useEffect(
    () => {
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
    },
    [profileDropdownRef]
  );

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
    <div className="navbar shadow-md sticky top-0 z-50 bg-white dark:bg-gray-800">
      <div className="navbar-start">
        <Link
          to="/"
          className="btn btn-ghost normal-case text-xl flex items-center"
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
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/" className="hover:text-primary">
              Home
            </Link>
          </li>
          <li>
            <a href="#gardeners" className="hover:text-primary">
              Explore Gardeners
            </a>
          </li>
          <li>
            <Link to="/browse-tips" className="hover:text-primary">
              Browse Tips
            </Link>
          </li>
          <li>
            <Link to="/share-tip" className="hover:text-primary">
              Share a Garden Tip
            </Link>
          </li>
          <li>
            <Link to="/my-tips" className="hover:text-primary">
              My Tips
            </Link>
          </li>
        </ul>
      </div>

      <div className="navbar-end">
        {/* User photo with dropdown and tooltip */}
        {user
          ? <div className="relative mr-4" ref={profileDropdownRef}>
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
                {!isProfileOpen &&
                  <span className="w-30 tooltip absolute z-10 -bottom-8 left-1/5 transform -translate-x-1/2 px-3 py-1 text-sm font-medium text-white bg-primary rounded-md break-normal text-center">
                    {getUserName()}
                  </span>}
              </div>

              {/* Dropdown menu */}
              {isProfileOpen &&
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5">
                  <div className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200 border-b border-gray-200 dark:border-gray-600">
                    <p className="font-semibold">
                      {getUserName()}
                    </p>
                    <p className="text-xs">
                      {user && user.email ? user.email : "Email not available"}
                    </p>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600"
                  >
                    Logout
                  </button>
                </div>}
            </div>
          : <ul className="hidden lg:flex gap-4 mr-4">
              <li className="btn btn-primary">
                <Link to="/login" className="hover:text-primary">
                  Login
                </Link>
              </li>
              <li className="btn btn-primary">
                <Link to="/register" className="hover:text-primary">
                  Register
                </Link>
              </li>
            </ul>}

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
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow 
                       bg-base-100 dark:bg-gray-700 rounded-box w-52"
          >
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <a>Explore Gardeners</a>
            </li>
            <li>
              <Link to="/browse-tips">Browse Tips</Link>
            </li>
            <li>
              <Link to="/share-tip">Share a Garden Tip</Link>
            </li>
            <li>
              <Link to="/my-tips">My Tips</Link>
            </li>
            {!user &&
              <ul>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/register">Register</Link>
                </li>
              </ul>}
          </ul>
        </div>
      </div>
    </div>
  );
};
