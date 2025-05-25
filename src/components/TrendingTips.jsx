import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom"; // Fixed import from react-router to react-router-dom
import { Typewriter } from "react-simple-typewriter";
import { ThemeContext } from "../context/ThemeContext";

export const TrendingTips = () => {
  const { theme } = useContext(ThemeContext);
  const [trendingTips, setTrendingTips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch trending tips
  useEffect(() => {
    const fetchTrendingTips = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://garden-community-brown.vercel.app/trending-tips"
        );

        if (!response.ok) {
          throw new Error(
            `Error ${response.status}: ${response.statusText ||
              "Failed to fetch trending tips"}`
          );
        }

        const data = await response.json();
        setTrendingTips(data);
      } catch (error) {
        setError(error.message || "Error fetching trending tips");
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingTips();
  }, []);

  // Helper function for difficulty badge color
  const getDifficultyBadgeColor = difficulty => {
    switch (difficulty) {
      case "Easy":
        return `badge px-2 py-1 rounded-full ${theme === "dark"
          ? "bg-green-900 text-green-100"
          : "bg-green-100 text-green-800"}`;
      case "Medium":
        return `badge px-2 py-1 rounded-full ${theme === "dark"
          ? "bg-yellow-900 text-yellow-100"
          : "bg-yellow-100 text-yellow-800"}`;
      case "Hard":
        return `badge px-2 py-1 rounded-full ${theme === "dark"
          ? "bg-red-900 text-red-100"
          : "bg-red-100 text-red-800"}`;
      default:
        return `badge px-2 py-1 rounded-full ${theme === "dark"
          ? "bg-gray-900 text-gray-100"
          : "bg-gray-100 text-gray-800"}`;
    }
  };

  return (
    <div
      className={`py-12 transition-colors duration-200 ${theme === "dark"
        ? "bg-gray-800"
        : "bg-gray-50"}`}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2
            className={`text-3xl md:text-4xl font-bold mb-3 transition-colors duration-200 ${theme ===
            "dark"
              ? "text-white"
              : "text-gray-900"}`}
          >
            Top Trending Tips
          </h2>
          <div className="flex justify-center">
            <div className="w-24 h-1 bg-primary rounded-full" />
          </div>
          <p
            className={`mt-4 text-lg max-w-2xl mx-auto transition-colors duration-200 ${theme ===
            "dark"
              ? "text-gray-300"
              : "text-gray-600"}`}
          >
            <Typewriter
              words={[
                "Discover the most popular gardening tips from our community",
                "Learn from experienced gardeners around the world",
                "Find solutions to common gardening challenges",
                "Get inspired with creative gardening ideas"
              ]}
              loop={true}
              cursor
              cursorStyle="|"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1500}
            />
          </p>
        </div>

        {/* Loading State */}
        {loading &&
          <div className="text-center py-10">
            <div
              className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
              role="status"
            >
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                Loading...
              </span>
            </div>
            <p
              className={`mt-4 transition-colors duration-200 ${theme === "dark"
                ? "text-gray-300"
                : "text-gray-600"}`}
            >
              Loading trending tips...
            </p>
          </div>}

        {/* Error State */}
        {!loading &&
          error &&
          <div
            className={`text-center py-12 rounded-lg shadow-md transition-colors duration-200 ${theme ===
            "dark"
              ? "bg-gray-700"
              : "bg-white"}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 mx-auto text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3
              className={`text-xl font-semibold mt-4 mb-1 transition-colors duration-200 ${theme ===
              "dark"
                ? "text-gray-300"
                : "text-gray-700"}`}
            >
              Error Loading Tips
            </h3>
            <p
              className={`mb-4 transition-colors duration-200 ${theme === "dark"
                ? "text-gray-400"
                : "text-gray-500"}`}
            >
              {error}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="btn btn-primary text-white"
            >
              Try Again
            </button>
          </div>}

        {/* Tips Grid */}
        {!loading &&
          !error &&
          trendingTips.length > 0 &&
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {trendingTips.map(tip =>
              <div
                key={tip._id}
                className={`rounded-lg shadow-md overflow-hidden border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${theme ===
                "dark"
                  ? "bg-gray-700 border-gray-600"
                  : "bg-white border-gray-100"}`}
              >
                <div
                  className={`relative h-48 overflow-hidden ${theme === "dark"
                    ? "bg-gray-600"
                    : "bg-gray-100"}`}
                >
                  {tip.imageUrl
                    ? <img
                        src={tip.imageUrl}
                        alt={tip.title}
                        className="w-full h-full object-cover"
                        onError={e => {
                          e.target.onerror = null;
                          e.target.src =
                            "https://i.ibb.co/7NgZn1V/no-image-available.webp";
                        }}
                      />
                    : <div className="w-full h-full flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className={`h-16 w-16 transition-colors duration-200 ${theme ===
                          "dark"
                            ? "text-gray-500"
                            : "text-gray-300"}`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>}
                  <div className="absolute top-2 right-2 flex flex-col gap-2">
                    <span
                      className={getDifficultyBadgeColor(tip.difficultyLevel)}
                    >
                      {tip.difficultyLevel}
                    </span>
                  </div>
                  <div className="absolute bottom-2 right-2">
                    <span
                      className={`badge flex items-center gap-1 px-2 py-1 rounded-full ${theme ===
                      "dark"
                        ? "bg-red-900 text-red-100"
                        : "bg-red-100 text-red-800"}`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {tip.totalLiked || 0}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`badge badge-outline px-2 py-1 rounded-full border transition-colors duration-200 ${theme ===
                      "dark"
                        ? "text-green-400 border-green-400"
                        : "text-green-600 border-green-600"}`}
                    >
                      {tip.category}
                    </span>
                    <span
                      className={`text-sm transition-colors duration-200 ${theme ===
                      "dark"
                        ? "text-gray-400"
                        : "text-gray-500"}`}
                    >
                      By {tip.userName}
                    </span>
                  </div>
                  <h3
                    className={`text-lg font-semibold mb-3 line-clamp-2 transition-colors duration-200 ${theme ===
                    "dark"
                      ? "text-white"
                      : "text-gray-900"}`}
                  >
                    {tip.title}
                  </h3>
                  <p
                    className={`mb-4 line-clamp-2 transition-colors duration-200 ${theme ===
                    "dark"
                      ? "text-gray-300"
                      : "text-gray-600"}`}
                  >
                    {tip.description}
                  </p>
                  <Link
                    to={`/tip-details/${tip._id}`}
                    className="btn btn-primary btn-sm w-full text-white"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            )}
          </div>}

        {/* Empty State */}
        {!loading &&
          !error &&
          trendingTips.length === 0 &&
          <div
            className={`text-center py-10 max-w-md mx-auto rounded-lg shadow-md p-6 transition-colors duration-200 ${theme ===
            "dark"
              ? "bg-gray-700"
              : "bg-white"}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 mx-auto text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
            <h3
              className={`text-xl font-semibold mt-4 mb-1 transition-colors duration-200 ${theme ===
              "dark"
                ? "text-gray-300"
                : "text-gray-700"}`}
            >
              No Trending Tips Yet
            </h3>
            <p
              className={`mb-4 transition-colors duration-200 ${theme === "dark"
                ? "text-gray-400"
                : "text-gray-500"}`}
            >
              Be the first to share your gardening knowledge!
            </p>
            <Link to="/share-tip" className="btn btn-primary text-white">
              Share a Tip
            </Link>
          </div>}

        {/* View All Button (when there are tips) */}
        {!loading &&
          !error &&
          trendingTips.length > 0 &&
          <div className="text-center mt-10">
            <Link
              to="/browse-tips"
              className={`btn btn-outline transition-colors duration-200 ${theme ===
              "dark"
                ? "border-cyan-300 text-cyan-300 hover:bg-primary hover:text-white"
                : "btn-primary"}`}
            >
              View All Tips
            </Link>
          </div>}
      </div>
    </div>
  );
};
