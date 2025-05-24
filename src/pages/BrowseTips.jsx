import React, { useState, useEffect } from "react";
import { Link } from "react-router";

export const BrowseTips = () => {
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
        const response = await fetch("http://localhost:3000/tips");
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
    <div className="p-6 md:p-12 bg-gray-50 dark:bg-gray-800">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
          Browse Garden Tips
        </h2>
        <div className="flex justify-center">
          <div className="w-24 h-1 bg-primary rounded-full" />
        </div>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Explore gardening tips shared by our community members.
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
                  placeholder="Search by title or category..." 
                  className="input input-bordered w-full text-base"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            {/* Category Filter */}
            <div className="form-control md:w-1/4">
              <select 
                className="select select-bordered w-full text-base"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            
            {/* Difficulty Filter */}
            <div className="form-control md:w-1/4">
              <select 
                className="select select-bordered w-full text-base"
                value={difficultyFilter}
                onChange={(e) => setDifficultyFilter(e.target.value)}
              >
                <option value="">All Difficulty Levels</option>
                {difficultyLevels.map((level) => (
                  <option key={level} value={level}>{level}</option>
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
            <p className="mt-4 text-gray-600 dark:text-gray-300">Loading garden tips...</p>
          </div>
        ) : filteredTips.length === 0 ? (
          <div className="text-center py-12">
            
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-1">No garden tips found</h3>
            <p className="text-gray-500 dark:text-gray-400">Try adjusting your search or filters</p>
          </div>
        ) : (
          <>
            {/* Desktop View (Table) */}
            <div className="hidden md:block">
              <table className="table table-zebra bg-white dark:bg-gray-700 rounded-lg shadow-md">
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-200">
                    <th className="px-4 py-3">Image</th>
                    <th className="px-4 py-3">Title</th>
                    <th className="px-4 py-3">Category</th>
                    <th className="px-4 py-3">Difficulty</th>
                    <th className="px-4 py-3">Author</th>
                    <th className="px-4 py-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentTips.map((tip) => (
                    <tr key={tip._id} className="hover:bg-gray-100 dark:hover:bg-gray-600">
                      <td className="px-4 py-3">
                        <div className="avatar">
                          <div className="w-14 h-14 rounded">
                            <img 
                              src={tip.imageUrl || "https://i.ibb.co/7NgZn1V0/no-image-available.webp"} 
                              alt={tip.title} 
                              onError={(e) => {
                                e.target.onerror = null;
                              }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 font-medium">{tip.title}</td>
                      <td className="px-4 py-3">
                        <span className="badge badge-outline text-green-600 border-green-600 dark:text-green-400 dark:border-green-400">
                          {tip.category}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`badge ${getDifficultyBadgeColor(tip.difficultyLevel)}`}>
                          {tip.difficultyLevel}
                        </span>
                      </td>
                      <td className="px-4 py-3">{tip.userName}</td>
                      <td className="px-4 py-3 text-center">
                        <Link 
                          to={`/tip-details/${tip._id}`} 
                          className="btn btn-sm btn-ghost"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          <span className="ml-1">See More</span>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Mobile View (Cards) */}
            <div className="md:hidden grid grid-cols-1 gap-4">
              {currentTips.map((tip) => (
                <div key={tip._id} className="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden border border-gray-100 dark:border-gray-600">
                  <div className="relative h-48 overflow-hidden bg-gray-100 dark:bg-gray-600">
                    <img 
                      src={tip.imageUrl || "https://i.ibb.co/7NgZn1V0/no-image-available.webp"} 
                      alt={tip.title} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                      }}
                    />
                    <div className="absolute top-2 right-2">
                      <span className={`badge ${getDifficultyBadgeColor(tip.difficultyLevel)}`}>
                        {tip.difficultyLevel}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{tip.title}</h3>
                    <div className="flex items-center justify-between mb-3">
                      <span className="badge badge-outline text-green-600 border-green-600 dark:text-green-400 dark:border-green-400">
                        {tip.category}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">By {tip.userName}</span>
                    </div>
                    <Link 
                      to={`/tip-details/${tip._id}`}
                      className="btn btn-primary btn-sm w-full"
                    >
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
      {!loading && filteredTips.length > 0 && totalPages > 1 && (
        <div className="max-w-7xl mx-auto mt-6 flex justify-center">
          <div className="btn-group flex gap-2">
            <button 
              className={`btn ${currentPage === 1 ? 'btn-disabled' : ''}`}
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            >
              «
            </button>
            
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                className={`btn ${currentPage === index + 1 ? 'btn-active' : ''}`}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}
            
            <button 
              className={`btn ${currentPage === totalPages ? 'btn-disabled' : ''}`}
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            >
              »
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BrowseTips;