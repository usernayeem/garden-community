import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";

export const BrowseTips = () => {
  const { theme } = useContext(ThemeContext);
  const [tips, setTips] = useState([]);
  const [filteredTips, setFilteredTips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("");
  const itemsPerPage = 5;

  // Categories array
  const categories = [
    "Plant Care",
    "Composting",
    "Vertical Gardening",
    "Indoor Plants",
    "Outdoor Gardens",
    "Hydroponics",
    "Soil Health",
    "Pest Control",
    "Seasonal Gardening",
    "Propagation",
    "Sustainable Gardening"
  ];
  
  const difficultyLevels = ["Easy", "Medium", "Hard"];

  // Fetch tips data
  useEffect(() => {
    const fetchTips = async () => {
      try {
        const response = await fetch("https://garden-community-brown.vercel.app/tips");
        const data = await response.json();
        // Filter to only include public tips
        const publicTips = data.filter(tip => tip.availability === "Public");
        setTips(publicTips);
        setFilteredTips(publicTips);
      } catch (error) {
        setError("Error fetching tips:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTips();
  }, []);

  // Filter tips based on search term and filters
  useEffect(() => {
    const filtered = tips.filter(tip => {
      const matchesSearch = searchTerm === "" || 
        tip.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        tip.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tip.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = categoryFilter === "" || 
        tip.category === categoryFilter;
      
      const matchesDifficulty = difficultyFilter === "" || 
        tip.difficultyLevel === difficultyFilter;
      
      return matchesSearch && matchesCategory && matchesDifficulty;
    });
    
    setFilteredTips(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchTerm, categoryFilter, difficultyFilter, tips]);

  // Get current tips for pagination
  const indexOfLastTip = currentPage * itemsPerPage;
  const indexOfFirstTip = indexOfLastTip - itemsPerPage;
  const currentTips = filteredTips.slice(indexOfFirstTip, indexOfLastTip);
  const totalPages = Math.ceil(filteredTips.length / itemsPerPage);

  // Helper function for difficulty badge color
  const getDifficultyBadgeColor = (difficulty) => {
    if (theme === "dark") {
      switch (difficulty) {
        case "Easy":
          return "bg-green-900 text-green-100";
        case "Medium":
          return "bg-yellow-900 text-yellow-100";
        case "Hard":
          return "bg-red-900 text-red-100";
        default:
          return "bg-gray-900 text-gray-100";
      }
    } else {
      switch (difficulty) {
        case "Easy":
          return "bg-green-100 text-green-800";
        case "Medium":
          return "bg-yellow-100 text-yellow-800";
        case "Hard":
          return "bg-red-100 text-red-800";
        default:
          return "bg-gray-100 text-gray-800";
      }
    }
  };

  return (
    <div className={`p-6 md:p-12 ${theme === "dark" ? "bg-gray-800" : "bg-gray-50"} transition-colors duration-200`}>
      <div className="text-center mb-12">
        <h2 className={`text-3xl md:text-4xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"} mb-3 transition-colors duration-200`}>
          Browse Garden Tips
        </h2>
        <div className="flex justify-center">
          <div className="w-24 h-1 bg-primary rounded-full" />
        </div>
        <p className={`mt-4 text-lg ${theme === "dark" ? "text-gray-300" : "text-gray-600"} max-w-2xl mx-auto transition-colors duration-200`}>
          Explore gardening tips shared by our community members.
        </p>
      </div>

      {/* Search and Filter Section */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className={`${theme === "dark" ? "bg-gray-700" : "bg-white"} rounded-lg shadow-md p-4 md:p-6 transition-colors duration-200`}>
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="form-control flex-1">
              <div className="input-group">
                <input 
                  type="text" 
                  placeholder="Search by title or category..." 
                  className={`input input-bordered w-full text-base ${
                    theme === "dark" 
                      ? "bg-gray-600 border-gray-500 text-white placeholder-gray-400" 
                      : "bg-white text-gray-900 placeholder-gray-500"
                  } transition-colors duration-200`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            {/* Category Filter */}
            <div className="form-control md:w-1/4">
              <select 
                className={`select select-bordered w-full text-base ${
                  theme === "dark" 
                    ? "bg-gray-600 border-gray-500 text-white" 
                    : "bg-white text-gray-900"
                } transition-colors duration-200`}
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="" className={theme === "dark" ? "bg-gray-700" : "bg-white"}>All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category} className={theme === "dark" ? "bg-gray-700" : "bg-white"}>{category}</option>
                ))}
              </select>
            </div>
            
            {/* Difficulty Filter */}
            <div className="form-control md:w-1/4">
              <select 
                className={`select select-bordered w-full text-base ${
                  theme === "dark" 
                    ? "bg-gray-600 border-gray-500 text-white" 
                    : "bg-white text-gray-900"
                } transition-colors duration-200`}
                value={difficultyFilter}
                onChange={(e) => setDifficultyFilter(e.target.value)}
              >
                <option value="" className={theme === "dark" ? "bg-gray-700" : "bg-white"}>All Difficulty Levels</option>
                {difficultyLevels.map((level) => (
                  <option key={level} value={level} className={theme === "dark" ? "bg-gray-700" : "bg-white"}>{level}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
      
      {/* Tips Table Section */}
      <div className="max-w-7xl mx-auto overflow-x-auto">
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
            </div>
            <p className={`mt-4 ${theme === "dark" ? "text-gray-300" : "text-gray-600"} transition-colors duration-200`}>Loading garden tips...</p>
          </div>
        ) : error ? (
          <div className={`text-center py-12 ${theme === "dark" ? "bg-gray-700" : "bg-white"} rounded-lg shadow-md transition-colors duration-200`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className={`text-xl font-semibold ${theme === "dark" ? "text-gray-300" : "text-gray-700"} mt-4 mb-1 transition-colors duration-200`}>Error loading tips</h3>
            <p className={`${theme === "dark" ? "text-gray-400" : "text-gray-500"} mb-4 transition-colors duration-200`}>{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="btn btn-primary"
            >
              Try Again
            </button>
          </div>
        ) : filteredTips.length === 0 ? (
          <div className={`text-center py-12 ${theme === "dark" ? "bg-gray-700" : "bg-white"} rounded-lg shadow-md transition-colors duration-200`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className={`text-xl font-semibold ${theme === "dark" ? "text-gray-300" : "text-gray-700"} mt-4 mb-1 transition-colors duration-200`}>No garden tips found</h3>
            <p className={`${theme === "dark" ? "text-gray-400" : "text-gray-500"} transition-colors duration-200`}>No tips match your search criteria.</p>
            <Link to="/share-tip" className="btn btn-primary mt-4">
              Share Your First Tip
            </Link>
          </div>
        ) : (
          <>
            {/* Desktop View (Table) */}
            <div className="hidden md:block">
              <table className={`table ${theme === "dark" ? "bg-gray-700 text-gray-200" : "bg-white"} rounded-lg shadow-md transition-colors duration-200`}>
                <thead>
                  <tr className={`${theme === "dark" ? "bg-gray-600 text-gray-200" : "bg-gray-100 text-gray-700"} transition-colors duration-200`}>
                    <th className="px-4 py-3">Image</th>
                    <th className="px-4 py-3">Title</th>
                    <th className="px-4 py-3">Category</th>
                    <th className="px-4 py-3">Difficulty</th>
                    <th className="px-4 py-3">Author</th>
                    <th className="px-4 py-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentTips.map((tip, index) => (
                    <tr 
                      key={tip._id} 
                      className={`${
                        theme === "dark" 
                          ? `border-gray-600 hover:bg-gray-600 ${index % 2 === 1 ? "bg-gray-800" : ""}` 
                          : `hover:bg-gray-100 ${index % 2 === 1 ? "bg-gray-50" : ""}`
                      } transition-colors duration-200`}
                    >
                      <td className="px-4 py-3">
                        <div className="avatar">
                          <div className="w-14 h-14 rounded">
                            <img
                              className={`border ${theme === "dark" ? "border-gray-500" : "border-accent"} rounded-md transition-colors duration-200`}
                              src={tip.imageUrl || "https://i.ibb.co/7NgZn1V0/no-image-available.webp"} 
                              alt={tip.title} 
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "https://i.ibb.co/7NgZn1V0/no-image-available.webp";
                              }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className={`px-4 py-3 font-medium ${theme === "dark" ? "text-white" : "text-gray-900"} transition-colors duration-200`}>{tip.title}</td>
                      <td className="px-4 py-3">
                        <span className={`badge badge-outline ${
                          theme === "dark" 
                            ? "text-green-400 border-green-400" 
                            : "text-green-600 border-green-600"
                        } transition-colors duration-200`}>
                          {tip.category}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`badge ${getDifficultyBadgeColor(tip.difficultyLevel)} transition-colors duration-200`}>
                          {tip.difficultyLevel}
                        </span>
                      </td>
                      <td className="px-4 py-3">{tip.userName}</td>
                      <td className="px-4 py-3">
                        <div className="flex justify-center">
                          <Link 
                            to={`/tip-details/${tip._id}`} 
                            className={`btn btn-sm btn-ghost ${theme === "dark" ? "text-cyan-300 hover:bg-gray-600" : "text-primary hover:bg-gray-100"}`}
                            title="View Tip"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            <span className="ml-1">See More</span>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Mobile View (Cards) */}
            <div className="md:hidden grid grid-cols-1 gap-4">
              {currentTips.map((tip) => (
                <div key={tip._id} className={`${theme === "dark" ? "bg-gray-700 border-gray-600" : "bg-white border-gray-100"} rounded-lg shadow-md overflow-hidden border transition-colors duration-200`}>
                  <div className={`relative h-48 overflow-hidden ${theme === "dark" ? "bg-gray-600" : "bg-gray-100"} transition-colors duration-200`}>
                    <img 
                      src={tip.imageUrl || "https://i.ibb.co/7NgZn1V0/no-image-available.webp"} 
                      alt={tip.title} 
                      className={`w-full h-full object-cover ${theme === "dark" ? "border-gray-500" : "border-accent"} border transition-colors duration-200`}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://i.ibb.co/7NgZn1V0/no-image-available.webp";
                      }}
                    />
                    <div className="absolute top-2 right-2">
                      <span className={`badge ${getDifficultyBadgeColor(tip.difficultyLevel)} transition-colors duration-200`}>
                        {tip.difficultyLevel}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className={`text-lg font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"} mb-2 transition-colors duration-200`}>{tip.title}</h3>
                    <div className="flex items-center justify-between mb-3">
                      <span className={`badge badge-outline ${
                        theme === "dark" 
                          ? "text-green-400 border-green-400" 
                          : "text-green-600 border-green-600"
                      } transition-colors duration-200`}>
                        {tip.category}
                      </span>
                      <span className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"} transition-colors duration-200`}>By {tip.userName}</span>
                    </div>
                    <Link 
                      to={`/tip-details/${tip._id}`}
                      className={`btn btn-sm w-full ${theme === "dark" ? "bg-gray-600 hover:bg-gray-500 text-white" : "btn-primary"} transition-colors duration-200`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      See More
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      
      {/* Pagination */}
      {!loading && !error && filteredTips.length > 0 && totalPages > 1 && (
        <div className="max-w-7xl mx-auto mt-8 flex justify-center">
          <nav aria-label="Page navigation">
            <ul className="flex space-x-2">
              <li>
                <button
                  onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
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
                    onClick={() => setCurrentPage(i + 1)}
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
                  onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
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
    </div>
  );
};