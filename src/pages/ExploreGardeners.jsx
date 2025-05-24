import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export const ExploreGardeners = () => {
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

  // Filter gardeners based on search term and filters
  useEffect(
    () => {
      const filtered = gardeners.filter(gardener => {
        const matchesSearch =
          searchTerm === "" ||
          gardener.name.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus =
          statusFilter === "" || gardener.status === statusFilter;

        const matchesExperience =
          experienceFilter === "" ||
          getExperienceLevel(gardener.experiences) === experienceFilter;

        return matchesSearch && matchesStatus && matchesExperience;
      });

      setFilteredGardeners(filtered);
      setCurrentPage(1); // Reset to first page when filters change
    },
    [searchTerm, statusFilter, experienceFilter, gardeners]
  );

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
      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
      : "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100";
  };

  // Helper function for experience badge color
  const getExperienceBadgeColor = years => {
    if (years <= 2)
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100";
    if (years <= 5)
      return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100";
    if (years <= 10)
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100";
    return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100";
  };

  return (
    <div className="p-6 md:p-12 bg-gray-50 dark:bg-gray-800 min-h-screen">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
          Explore Gardeners
        </h2>
        <div className="flex justify-center">
          <div className="w-24 h-1 bg-primary rounded-full" />
        </div>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Connect with gardening enthusiasts and experts from our community.
        </p>
      </div>

      {/* Search and Filter Section */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-4 md:p-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="form-control flex-1">
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Search by name..."
                  className="input input-bordered w-full text-base"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Status Filter */}
            <div className="form-control md:w-1/4">
              <select
                className="select select-bordered w-full text-base"
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
              >
                <option value="">All Statuses</option>
                {statusOptions.map(status =>
                  <option key={status} value={status}>
                    {status}
                  </option>
                )}
              </select>
            </div>

            {/* Experience Filter */}
            <div className="form-control md:w-1/4">
              <select
                className="select select-bordered w-full text-base"
                value={experienceFilter}
                onChange={e => setExperienceFilter(e.target.value)}
              >
                <option value="">All Experience Levels</option>
                {experienceLevels.map(level =>
                  <option key={level.value} value={level.value}>
                    {level.label}
                  </option>
                )}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Gardeners Grid Section */}
      <div className="max-w-7xl mx-auto">
        {loading
          ? <div className="text-center py-12">
              <div
                className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status"
              >
                <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                  Loading...
                </span>
              </div>
              <p className="mt-4 text-gray-600 dark:text-gray-300">
                Loading gardeners...
              </p>
            </div>
          : error
            ? <div className="text-center py-12 bg-white dark:bg-gray-700 rounded-lg shadow-md">
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
                  Error loading gardeners
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
              </div>
            : filteredGardeners.length === 0
              ? <div className="text-center py-12 bg-white dark:bg-gray-700 rounded-lg shadow-md">
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
                  <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mt-4 mb-1">
                    No gardeners found
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    No gardeners match your search criteria. Try adjusting your
                    filters.
                  </p>
                </div>
              : <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentGardeners.map((gardener, index) =>
                    <div
                      key={index}
                      className="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden border border-gray-100 dark:border-gray-600 transition-transform hover:shadow-lg hover:-translate-y-1"
                    >
                      <div className="relative h-64 overflow-hidden bg-gray-100 dark:bg-gray-600">
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
                          <span
                            className={`badge ${getStatusBadgeColor(
                              gardener.status
                            )}`}
                          >
                            {gardener.status}
                          </span>
                          <span
                            className={`badge ${getExperienceBadgeColor(
                              gardener.experiences
                            )}`}
                          >
                            {getExperienceLevelText(gardener.experiences)}
                          </span>
                        </div>
                      </div>

                      <div className="p-5">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                          {gardener.name}
                        </h3>

                        <div className="flex items-center text-gray-500 dark:text-gray-400 mb-3">
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

                        <div className="flex items-center text-gray-500 dark:text-gray-400 mb-4">
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
                          <div className="flex items-center text-gray-500 dark:text-gray-400">
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
                  )}
                </div>}
      </div>

      {/* Pagination */}
      {!loading &&
        !error &&
        filteredGardeners.length > 0 &&
        totalPages > 1 &&
        <div className="max-w-7xl mx-auto mt-8 flex justify-center">
          <div className="btn-group flex gap-2">
            <button
              className={`btn ${currentPage === 1 ? "btn-disabled" : ""}`}
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            >
              «
            </button>

            {[...Array(totalPages)].map((_, index) =>
              <button
                key={index}
                className={`btn ${currentPage === index + 1
                  ? "btn-active"
                  : ""}`}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            )}

            <button
              className={`btn ${currentPage === totalPages
                ? "btn-disabled"
                : ""}`}
              onClick={() =>
                setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            >
              »
            </button>
          </div>
        </div>}
    </div>
  );
};
