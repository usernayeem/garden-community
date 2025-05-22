import React, { useContext } from "react";
import { DataContext } from "../context/DataContext";

export const Tips = () => {
  const { tips } = useContext(DataContext);
  return (
    <div className="bg-white dark:bg-gray-800 p-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
          Top Trending Tips
        </h2>
        <div className="flex justify-center">
          <div className="w-24 h-1 bg-primary rounded-full" />
        </div>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Discover the most popular gardening advice from our community members.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tips.map(tip =>
          <div
            key={tip.id}
            className="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1 border border-gray-100 dark:border-gray-600"
          >
            <div className="p-5">
              <div className="flex items-center mb-4">
                <div className="relative mr-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center text-gray-700 dark:text-gray-300 font-medium">
                    <img src="" className="rounded-full w-10 h-10" alt="" />
                  </div>
                  <div
                    className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white dark:border-gray-700 ${tip.authorStatus ===
                    "active"
                      ? "bg-green-500"
                      : "bg-gray-500"}`}
                  />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {tip.author}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {tip.date}
                  </p>
                </div>
                <div className="ml-auto">
                  <span className="px-2 py-1 bg-primary-content bg-opacity-10 text-primary text-xs rounded-full">
                    {tip.category}
                  </span>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                {tip.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                {tip.description}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
