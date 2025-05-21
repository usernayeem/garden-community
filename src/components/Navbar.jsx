import React, { useEffect, useRef, useState } from "react";

export const Navbar = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileDropdownRef = useRef(null);

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
    setIsProfileOpen(false);
  };

  return (
    <div className="navbar shadow-md sticky top-0 z-50 bg-white dark:bg-gray-800">
      <div className="navbar-start">
        <a className="btn btn-ghost normal-case text-xl flex items-center">
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
        </a>
      </div>

      {/* Desktop Navigation Links */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a className="hover:text-primary">Home</a>
          </li>
          <li>
            <a className="hover:text-primary">Explore Gardeners</a>
          </li>
          <li>
            <a className="hover:text-primary">Browse Tips</a>
          </li>
          <li>
            <a className="hover:text-primary">Share a Garden Tip</a>
          </li>
          <li>
            <a className="hover:text-primary">My Tips</a>
          </li>
          <li>
            <a className="hover:text-primary">Login</a>
          </li>
          <li>
            <a className="hover:text-primary">SignUp</a>
          </li>
        </ul>
      </div>

      <div className="navbar-end">
        {/* User photo with dropdown and tooltip */}
        <div className="relative mr-4" ref={profileDropdownRef}>
          <div className="group tooltip-trigger relative">
            <div
              className="avatar cursor-pointer"
              onClick={toggleProfileDropdown}
            >
              <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img
                  src="https://lh3.googleusercontent.com/-tCA_KlGD-LE/AAAAAAAAAAI/AAAAAAAAAAA/ALKGfklwAxkotGJjmuTRVyfpRqdFD7rr7Q/photo.jpg?sz=46"
                  alt="User"
                />
              </div>
            </div>

            {/* Tooltip */}
            {!isProfileOpen &&
              <span className="tooltip absolute z-10 -bottom-10 left-1/2 transform -translate-x-1/2 w-auto px-3 py-1 text-sm font-medium text-white bg-primary rounded-md">
                Md Nayeem
              </span>}
          </div>

          {/* Dropdown menu */}
          {isProfileOpen &&
            <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5">
              <div className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200 border-b border-gray-200 dark:border-gray-600">
                <p className="font-semibold">Md Nayeem</p>
                <p className="text-xs">nayeem@gmail.com</p>
              </div>

              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                Logout
              </button>
            </div>}
        </div>

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
              <a>Home</a>
            </li>
            <li>
              <a>Explore Gardeners</a>
            </li>
            <li>
              <a>Browse Tips</a>
            </li>
            <li>
              <a>Share a Garden Tip</a>
            </li>
            <li>
              <a>My Tips</a>
            </li>
            <li>
              <a>Login</a>
            </li>
            <li>
              <a>SignUp</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
