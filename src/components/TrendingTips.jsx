import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import { Typewriter } from "react-simple-typewriter";

export const TrendingTips = () => {
  const [trendingTips, setTrendingTips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch trending tips
  useEffect(() => {
    const fetchTrendingTips = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:3000/trending-tips");

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
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100";
      case "Medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100";
      case "Hard":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100";
    }
  };

  return (
    <section className="py-12 bg-[#f3f4f6] dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Top Trending Tips
          </h2>
          <div className="flex justify-center">
            <div className="w-24 h-1 bg-primary rounded-full" />
          </div>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
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
            <p className="mt-4 text-gray-600 dark:text-gray-300">
              Loading trending tips...
            </p>
          </div>}

        {/* Error State */}
        {!loading &&
          error &&
          <div className="text-center py-10 max-w-md mx-auto bg-white dark:bg-gray-700 rounded-lg shadow-md p-6">
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
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mt-4 mb-1">
              Error Loading Tips
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              {error}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="btn btn-primary"
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
                className="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden border border-gray-100 dark:border-gray-600 transition-transform duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <div className="relative h-48 overflow-hidden bg-gray-100 dark:bg-gray-600">
                  <img
                    src={
                      tip.imageUrl ||
                      "https://i.ibb.co/7NgZn1V0/no-image-available.webp"
                    }
                    alt={tip.title}
                    className="w-full h-full object-cover"
                    onError={e => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://i.ibb.co/7NgZn1V0/no-image-available.webp";
                    }}
                  />
                  <div className="absolute top-2 right-2 flex flex-col gap-2">
                    <span
                      className={`badge ${getDifficultyBadgeColor(
                        tip.difficultyLevel
                      )}`}
                    >
                      {tip.difficultyLevel}
                    </span>
                  </div>
                  <div className="absolute bottom-2 right-2">
                    <span className="badge bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100 flex items-center gap-1">
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
                    <span className="badge badge-outline text-green-600 border-green-600 dark:text-green-400 dark:border-green-400">
                      {tip.category}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      By {tip.userName}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 line-clamp-2">
                    {tip.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                    {tip.description}
                  </p>
                  <Link
                    to={`/tip-details/${tip._id}`}
                    className="btn btn-primary btn-sm w-full"
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
          <div className="text-center py-10 max-w-md mx-auto bg-white dark:bg-gray-700 rounded-lg shadow-md p-6">
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
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mt-4 mb-1">
              No Trending Tips Yet
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              Be the first to share your gardening knowledge!
            </p>
            <Link to="/share-tip" className="btn btn-primary">
              Share a Tip
            </Link>
          </div>}

        {/* View All Button (when there are tips) */}
        {!loading &&
          !error &&
          trendingTips.length > 0 &&
          <div className="text-center mt-10">
            <Link to="/browse-tips" className="btn btn-outline btn-primary">
              View All Tips
            </Link>
          </div>}
      </div>
    </section>
  );
};

export default TrendingTips;
