import React, { useContext } from "react";
import { DataContext } from "../context/DataContext";

export const Gardeners = () => {
  const { gardeners } = useContext(DataContext);

  return (
    <div id="gardeners" className="bg-gray-50 dark:bg-gray-800 p-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
          Featured Gardeners
        </h2>
        <div className="flex justify-center">
          <div className="w-24 h-1 bg-primary rounded-full" />
        </div>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Connect with our top community members who share their knowledge and
          passion for gardening.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {gardeners.map(gardener =>
          <div
            key={gardener.id}
            className="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1 border border-gray-100 dark:border-gray-600"
          >
            <div className="relative h-60 overflow-hidden bg-gray-100 dark:bg-gray-600">
              <img
                src=""
                alt={gardener.name}
                className="w-full h-full object-cover"
                onError={e => {
                  e.target.style.display = "none";
                  e.target.parentNode.appendChild(
                    document.createTextNode(
                      gardener.name.split(" ").map(n => n[0]).join("")
                    )
                  );
                  e.target.parentNode.className +=
                    " flex items-center justify-center text-2xl font-bold";
                }}
              />
              <div
                className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-medium text-white
                  ${gardener.status === "active"
                    ? "bg-green-500"
                    : "bg-gray-500"}`}
              >
                {gardener.status === "active" ? "Active" : "Inactive"}
              </div>
            </div>

            <div className="p-5">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {gardener.name}
              </h3>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-gray-600 dark:text-gray-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span>
                    {gardener.location}
                  </span>
                </div>

                <div className="flex items-center text-gray-600 dark:text-gray-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span>
                    {gardener.experience}{" "}
                    {gardener.experience === 1 ? "year" : "years"} experience
                  </span>
                </div>

                <div className="flex items-center text-gray-600 dark:text-gray-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                    />
                  </svg>
                  <span>
                    {gardener.specialty}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
