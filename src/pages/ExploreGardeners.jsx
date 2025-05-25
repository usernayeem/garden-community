import React, { useState, useEffect, useContext } from "react";
import { Typewriter } from "react-simple-typewriter";
import { ThemeContext } from "../context/ThemeContext";

export const ExploreGardeners = () => {
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
        const response = await fetch("https://garden-community-brown.vercel.app/gardeners");

        if (!response.ok) {
          throw new Error(
            `Error ${response.status}: ${response.statusText ||
              "Failed to fetch gardeners"}`
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

  // Apply filters based on search term, status, and experience
  useEffect(() => {
    let results = gardeners;

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = results.filter(gardener => 
        gardener.name.toLowerCase().includes(term)
      );
    }

    // Apply status filter
    if (statusFilter) {
      results = results.filter(gardener => 
        gardener.status === statusFilter
      );
    }

    // Apply experience filter
    if (experienceFilter) {
      results = results.filter(gardener => {
        const level = getExperienceLevel(gardener.experiences);
        return level === experienceFilter;
      });
    }

    setFilteredGardeners(results);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchTerm, statusFilter, experienceFilter, gardeners]);

  // Get experience level from years
  const getExperienceLevel = years => {
    if (years <= 2) return "beginner";
    if (years <= 5) return "intermediate";
    if (years <= 10) return "advanced";
    return "expert";
  };

  // Get text for experience level from years
  const getExperienceLevelText = years => {
    if (years <= 2) return "Beginner";
    if (years <= 5) return "Intermediate";
    if (years <= 10) return "Advanced";
    return "Expert";
  };

  // Get current gardeners for pagination
  const indexOfLastGardener = currentPage * itemsPerPage;
  const indexOfFirstGardener = indexOfLastGardener - itemsPerPage;
  const currentGardeners = filteredGardeners.slice(
    indexOfFirstGardener,
    indexOfLastGardener
  );
  const totalPages = Math.ceil(filteredGardeners.length / itemsPerPage);

  // Helper function for status badge color
  const getStatusBadgeColor = status => {
    return status === "Active"
      ? `badge px-2 py-1 rounded-full ${theme === "dark" 
          ? "bg-green-900 text-green-100" 
          : "bg-green-100 text-green-800"}`
      : `badge px-2 py-1 rounded-full ${theme === "dark" 
          ? "bg-gray-900 text-gray-100" 
          : "bg-gray-100 text-gray-800"}`;
  };

  // Helper function for experience badge color
  const getExperienceBadgeColor = years => {
    if (years <= 2)
      return `badge px-2 py-1 rounded-full ${theme === "dark" 
        ? "bg-blue-900 text-blue-100" 
        : "bg-blue-100 text-blue-800"}`;
    if (years <= 5)
      return `badge px-2 py-1 rounded-full ${theme === "dark" 
        ? "bg-purple-900 text-purple-100" 
        : "bg-purple-100 text-purple-800"}`;
    if (years <= 10)
      return `badge px-2 py-1 rounded-full ${theme === "dark" 
        ? "bg-yellow-900 text-yellow-100" 
        : "bg-yellow-100 text-yellow-800"}`;
    return `badge px-2 py-1 rounded-full ${theme === "dark" 
      ? "bg-red-900 text-red-100" 
      : "bg-red-100 text-red-800"}`;
  };

  // Handle page changes
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className={`p-6 md:p-12 min-h-screen transition-colors duration-200 ${
      theme === "dark" ? "bg-gray-800" : "bg-gray-50"
    }`}>
      <div className="text-center mb-12">
        <h2 className={`text-3xl md:text-4xl font-bold mb-3 transition-colors duration-200 ${
          theme === "dark" ? "text-white" : "text-gray-900"
        }`}>
          Explore Gardeners
        </h2>
        <div className="flex justify-center">
          <div className="w-24 h-1 bg-primary rounded-full" />
        </div>
        <p className={`mt-4 text-lg max-w-2xl mx-auto transition-colors duration-200 ${
          theme === "dark" ? "text-gray-300" : "text-gray-600"
        }`}>
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

      {/* Filters Section */}
      <div className={`max-w-7xl mx-auto mb-8 p-4 rounded-lg shadow-md transition-colors duration-200 ${
        theme === "dark" ? "bg-gray-700" : "bg-white"
      }`}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search input */}
          <div className="relative">
            <label htmlFor="search" className={`block mb-2 text-sm font-medium transition-colors duration-200 ${
              theme === "dark" ? "text-gray-200" : "text-gray-700"
            }`}>
              Search by Name
            </label>
            <div className="relative">
              <input
                type="text"
                id="search"
                placeholder="Search gardeners..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full p-2.5 pl-10 text-sm rounded-lg border transition-colors duration-200 ${
                  theme === "dark" 
                    ? "bg-gray-600 border-gray-500 text-white placeholder-gray-400" 
                    : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500"
                }`}
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg 
                  className={`w-4 h-4 transition-colors duration-200 ${
                    theme === "dark" ? "text-gray-400" : "text-gray-500"
                  }`} 
                  aria-hidden="true" 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 20 20"
                >
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Status filter */}
          <div>
            <label htmlFor="status" className={`block mb-2 text-sm font-medium transition-colors duration-200 ${
              theme === "dark" ? "text-gray-200" : "text-gray-700"
            }`}>
              Status
            </label>
            <select
              id="status"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className={`w-full p-2.5 text-sm rounded-lg border transition-colors duration-200 ${
                theme === "dark" 
                  ? "bg-gray-600 border-gray-500 text-white" 
                  : "bg-gray-50 border-gray-300 text-gray-900"
              }`}
            >
              <option value="">All Statuses</option>
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          {/* Experience filter */}
          <div>
            <label htmlFor="experience" className={`block mb-2 text-sm font-medium transition-colors duration-200 ${
              theme === "dark" ? "text-gray-200" : "text-gray-700"
            }`}>
              Experience Level
            </label>
            <select
              id="experience"
              value={experienceFilter}
              onChange={(e) => setExperienceFilter(e.target.value)}
              className={`w-full p-2.5 text-sm rounded-lg border transition-colors duration-200 ${
                theme === "dark" 
                  ? "bg-gray-600 border-gray-500 text-white" 
                  : "bg-gray-50 border-gray-300 text-gray-900"
              }`}
            >
              <option value="">All Experience Levels</option>
              {experienceLevels.map((level) => (
                <option key={level.value} value={level.value}>
                  {level.label}
                </option>
              ))}
            </select>
          </div>
        </div>
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
            <p className={`mt-4 transition-colors duration-200 ${
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            }`}>
              Loading gardeners...
            </p>
          </div>
        ) : error ? (
          <div className={`text-center py-12 rounded-lg shadow-md transition-colors duration-200 ${
            theme === "dark" ? "bg-gray-700" : "bg-white"
          }`}>
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
            <h3 className={`text-xl font-semibold mt-4 mb-1 transition-colors duration-200 ${
              theme === "dark" ? "text-gray-300" : "text-gray-700"
            }`}>
              Error loading gardeners
            </h3>
            <p className={`mb-4 transition-colors duration-200 ${
              theme === "dark" ? "text-gray-400" : "text-gray-500"
            }`}>
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
          <div className={`text-center py-12 rounded-lg shadow-md transition-colors duration-200 ${
            theme === "dark" ? "bg-gray-700" : "bg-white"
          }`}>
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
            <h3 className={`text-xl font-semibold mt-4 mb-1 transition-colors duration-200 ${
              theme === "dark" ? "text-gray-300" : "text-gray-700"
            }`}>
              No gardeners found
            </h3>
            <p className={`transition-colors duration-200 ${
              theme === "dark" ? "text-gray-400" : "text-gray-500"
            }`}>
              No gardeners match your search criteria. Try adjusting your filters.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentGardeners.map((gardener, index) => (
                <div
                  key={gardener._id}
                  className={`rounded-lg shadow-md overflow-hidden border transition-all duration-200 hover:shadow-lg hover:-translate-y-1 ${
                    theme === "dark" 
                      ? "bg-gray-700 border-gray-600" 
                      : "bg-white border-gray-100"
                  }`}
                >
                  <div className={`relative h-64 overflow-hidden ${
                    theme === "dark" ? "bg-gray-600" : "bg-gray-100"
                  }`}>
                    <img
                      src={
                        gardener.image ||
                        "https://i.ibb.co/4wsPz9SL/profile-removebg-preview.webp"
                      }
                      alt={gardener.name}
                      className="w-full h-full object-cover"
                      onError={e => {
                        e.target.onerror = null;
                        e.target.src =
                          "https://i.ibb.co/4wsPz9SL/profile-removebg-preview.webp";
                      }}
                    />
                    <div className="absolute top-2 right-2 flex flex-col gap-2">
                      <span className={getStatusBadgeColor(gardener.status)}>
                        {gardener.status}
                      </span>
                      <span className={getExperienceBadgeColor(gardener.experiences)}>
                        {getExperienceLevelText(gardener.experiences)}
                      </span>
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className={`text-xl font-semibold mb-2 transition-colors duration-200 ${
                      theme === "dark" ? "text-white" : "text-gray-900"
                    }`}>
                      {gardener.name}
                    </h3>

                    <div className={`flex items-center mb-3 transition-colors duration-200 ${
                      theme === "dark" ? "text-gray-400" : "text-gray-500"
                    }`}>
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

                    <div className={`flex items-center mb-4 transition-colors duration-200 ${
                      theme === "dark" ? "text-gray-400" : "text-gray-500"
                    }`}>
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
                      <div className={`flex items-center transition-colors duration-200 ${
                        theme === "dark" ? "text-gray-400" : "text-gray-500"
                      }`}>
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
                          {gardener.total_shared_tips === 1
                            ? "tip"
                            : "tips"}{" "}
                          shared
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-8">
                <nav aria-label="Page navigation">
                  <ul className="flex space-x-2">
                    <li>
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`px-3 py-2 rounded-md transition-colors duration-200 ${
                          currentPage === 1
                            ? `cursor-not-allowed ${
                                theme === "dark" 
                                  ? "bg-gray-700 text-gray-500" 
                                  : "bg-gray-200 text-gray-400"
                              }`
                            : `${
                                theme === "dark"
                                  ? "bg-gray-700 text-white hover:bg-gray-600"
                                  : "bg-white text-gray-700 hover:bg-gray-100"
                              }`
                        }`}
                      >
                        Previous
                      </button>
                    </li>
                    
                    {[...Array(totalPages)].map((_, i) => (
                      <li key={i}>
                        <button
                          onClick={() => handlePageChange(i + 1)}
                          className={`px-3 py-2 rounded-md transition-colors duration-200 ${
                            currentPage === i + 1
                              ? "bg-primary text-white"
                              : `${
                                  theme === "dark"
                                    ? "bg-gray-700 text-white hover:bg-gray-600"
                                    : "bg-white text-gray-700 hover:bg-gray-100"
                                }`
                          }`}
                        >
                          {i + 1}
                        </button>
                      </li>
                    ))}
                    
                    <li>
                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`px-3 py-2 rounded-md transition-colors duration-200 ${
                          currentPage === totalPages
                            ? `cursor-not-allowed ${
                                theme === "dark" 
                                  ? "bg-gray-700 text-gray-500" 
                                  : "bg-gray-200 text-gray-400"
                              }`
                            : `${
                                theme === "dark"
                                  ? "bg-gray-700 text-white hover:bg-gray-600"
                                  : "bg-white text-gray-700 hover:bg-gray-100"
                              }`
                        }`}
                      >
                        Next
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};