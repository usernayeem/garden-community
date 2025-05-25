import React, { useState, useEffect, useContext } from "react";
import { Typewriter } from "react-simple-typewriter";
import { ThemeContext } from "../context/ThemeContext";
import { Link } from "react-router";

export const FeaturedGardeners = () => {
  const { theme } = useContext(ThemeContext);
  const [gardeners, setGardeners] = useState([]);
  const [filteredGardeners, setFilteredGardeners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [experienceFilter, setExperienceFilter] = useState("");
  const itemsPerPage = 6;

  // Status options
  const statusOptions = ["Active", "Inactive"];

  // Experience level options
  const experienceLevels = [
    { value: "beginner", label: "Beginner (0-2 years)" },
    { value: "intermediate", label: "Intermediate (3-5 years)" },
    { value: "advanced", label: "Advanced (6-10 years)" },
    { value: "expert", label: "Expert (10+ years)" }
  ];

  // Fetch gardeners data
  useEffect(() => {
    const fetchGardeners = async () => {
      try {
        const response = await fetch(
          "https://garden-community-brown.vercel.app/featured-gardeners"
        );

        if (!response.ok) {
          throw new Error(
            `Error ${response.status}: ${
              response.statusText || "Failed to fetch gardeners"
            }`
          );
        }

        const data = await response.json();
        setGardeners(data);
        setFilteredGardeners(data);
      } catch (error) {
        setError(error.message || "Error fetching gardeners");
      } finally {
        setLoading(false);
      }
    };

    fetchGardeners();
  }, []);

  // Get experience level from years
  const getExperienceLevel = (years) => {
    if (years <= 2) return "beginner";
    if (years <= 5) return "intermediate";
    if (years <= 10) return "advanced";
    return "expert";
  };

  // Get text for experience level from years
  const getExperienceLevelText = (years) => {
    if (years <= 2) return "Beginner";
    if (years <= 5) return "Intermediate";
    if (years <= 10) return "Advanced";
    return "Expert";
  };

  // Helper function for status badge color
  const getStatusBadgeColor = (status) => {
    return status === "Active"
      ? `badge px-2 py-1 rounded-full ${
          theme === "dark"
            ? "bg-green-900 text-green-100"
            : "bg-green-100 text-green-800"
        }`
      : `badge px-2 py-1 rounded-full ${
          theme === "dark"
            ? "bg-gray-900 text-gray-100"
            : "bg-gray-100 text-gray-800"
        }`;
  };

  // Helper function for experience badge color
  const getExperienceBadgeColor = (years) => {
    if (years <= 2)
      return `badge px-2 py-1 rounded-full ${
        theme === "dark"
          ? "bg-blue-900 text-blue-100"
          : "bg-blue-100 text-blue-800"
      }`;
    if (years <= 5)
      return `badge px-2 py-1 rounded-full ${
        theme === "dark"
          ? "bg-purple-900 text-purple-100"
          : "bg-purple-100 text-purple-800"
      }`;
    if (years <= 10)
      return `badge px-2 py-1 rounded-full ${
        theme === "dark"
          ? "bg-yellow-900 text-yellow-100"
          : "bg-yellow-100 text-yellow-800"
      }`;
    return `badge px-2 py-1 rounded-full ${
      theme === "dark" ? "bg-red-900 text-red-100" : "bg-red-100 text-red-800"
    }`;
  };

  // Handle page changes
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div
      className={`p-6 md:p-12 min-h-screen transition-colors duration-200 ${
        theme === "dark" ? "bg-[#192837]" : "bg-gray-100"
      }`}
    >
      <div className="text-center mb-12">
        <h2
          className={`text-3xl md:text-4xl font-bold mb-3 transition-colors duration-200 ${
            theme === "dark" ? "text-white" : "text-gray-900"
          }`}
        >
          Featured Gardeners
        </h2>
        <div className="flex justify-center">
          <div className="w-24 h-1 bg-primary rounded-full" />
        </div>
        <p
          className={`mt-4 text-lg max-w-2xl mx-auto transition-colors duration-200 ${
            theme === "dark" ? "text-gray-300" : "text-gray-600"
          }`}
        >
          <Typewriter
            words={[
              "Connect with gardening enthusiasts and experts from our community.",
              "Find local gardeners to share tips and knowledge.",
              "Discover experienced mentors for your gardening journey.",
              "Learn from gardeners with various levels of expertise."
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

      {/* Gardeners Grid Section */}
      <div className="max-w-7xl mx-auto">
        {loading ? (
          <div className="text-center py-12">
            <div
              className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
              role="status"
            >
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                Loading...
              </span>
            </div>
            <p
              className={`mt-4 transition-colors duration-200 ${
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Loading gardeners...
            </p>
          </div>
        ) : error ? (
          <div
            className={`text-center py-12 rounded-lg shadow-md transition-colors duration-200 ${
              theme === "dark" ? "bg-gray-700" : "bg-white"
            }`}
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
              className={`text-xl font-semibold mt-4 mb-1 transition-colors duration-200 ${
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Error loading gardeners
            </h3>
            <p
              className={`mb-4 transition-colors duration-200 ${
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              }`}
            >
              {error}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="btn btn-primary text-white"
            >
              Try Again
            </button>
          </div>
        ) : filteredGardeners.length === 0 ? (
          <div
            className={`text-center py-12 rounded-lg shadow-md transition-colors duration-200 ${
              theme === "dark" ? "bg-gray-700" : "bg-white"
            }`}
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
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            <h3
              className={`text-xl font-semibold mt-4 mb-1 transition-colors duration-200 ${
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              }`}
            >
              No gardeners found
            </h3>
            <p
              className={`transition-colors duration-200 ${
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              }`}
            >
              No gardeners match your search criteria. Try adjusting your
              filters.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {gardeners.map((gardener, index) => (
                <div
                  key={gardener._id}
                  className={`rounded-lg shadow-md overflow-hidden border transition-all duration-200 hover:shadow-lg hover:-translate-y-1 ${
                    theme === "dark"
                      ? "bg-gray-700 border-gray-600"
                      : "bg-white border-gray-100"
                  }`}
                >
                  <div
                    className={`relative h-64 overflow-hidden ${
                      theme === "dark" ? "bg-gray-600" : "bg-gray-100"
                    }`}
                  >
                    <img
                      src={
                        gardener.image ||
                        "https://i.ibb.co/4wsPz9SL/profile-removebg-preview.webp"
                      }
                      alt={gardener.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          "https://i.ibb.co/4wsPz9SL/profile-removebg-preview.webp";
                      }}
                    />
                    <div className="absolute top-2 right-2 flex flex-col gap-2">
                      <span className={getStatusBadgeColor(gardener.status)}>
                        {gardener.status}
                      </span>
                      <span
                        className={getExperienceBadgeColor(
                          gardener.experiences
                        )}
                      >
                        {getExperienceLevelText(gardener.experiences)}
                      </span>
                    </div>
                  </div>

                  <div className="p-5">
                    <h3
                      className={`text-xl font-semibold mb-2 transition-colors duration-200 ${
                        theme === "dark" ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {gardener.name}
                    </h3>

                    <div
                      className={`flex items-center mb-3 transition-colors duration-200 ${
                        theme === "dark" ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
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
                          strokeWidth="2"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      <span>
                        {gardener.age} years old • {gardener.gender}
                      </span>
                    </div>

                    <div
                      className={`flex items-center mb-4 transition-colors duration-200 ${
                        theme === "dark" ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
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
                          strokeWidth="2"
                          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                        />
                      </svg>
                      <span>
                        {gardener.experiences}{" "}
                        {gardener.experiences === 1 ? "year" : "years"} of
                        experience
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div
                        className={`flex items-center transition-colors duration-200 ${
                          theme === "dark" ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
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
                            strokeWidth="2"
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                        <span>
                          {gardener.total_shared_tips}{" "}
                          {gardener.total_shared_tips === 1 ? "tip" : "tips"}{" "}
                          shared
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      {/* View All Button (when there are tips) */}
      {!loading && !error && gardeners.length > 0 && (
        <div className="text-center mt-10">
          <Link
            to="/explore-gardeners"
            className={`btn btn-outline transition-colors duration-200 ${
              theme === "dark"
                ? "border-cyan-300 text-cyan-300 hover:bg-primary hover:text-white"
                : "btn-primary"
            }`}
          >
            View All Gardeners
          </Link>
        </div>
      )}
    </div>
  );
};
