import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";
import Swal from 'sweetalert2';

export const MyTips = () => {
  const { user } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  
  const [tips, setTips] = useState([]);
  const [filteredTips, setFilteredTips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [availabilityFilter, setAvailabilityFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteInProgress, setDeleteInProgress] = useState(false);
  const itemsPerPage = 5;

  // Fetch user's tips
  useEffect(() => {
    // Only fetch tips if user is available
    if (!user || !user.email) {
      setLoading(false);
      return;
    }
    
    const fetchUserTips = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Fetch all tips first as a workaround since the filter API might not be working correctly
        const response = await fetch("https://garden-community-brown.vercel.app/tips");
        
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText || "Failed to fetch tips"}`);
        }
        
        const allTips = await response.json();
        
        // Filter on client side for the current user
        const userTips = allTips.filter(tip => tip.userEmail === user.email);
        
        setTips(userTips);
        setFilteredTips(userTips);
      } catch (error) {
        setError(error.message || "Failed to load your tips");
      } finally {
        setLoading(false);
      }
    };

    fetchUserTips();
  }, [user]);

  // Filter tips based on search term and availability filter
  useEffect(() => {
    const filtered = tips.filter(tip => {
      const matchesSearch = searchTerm === "" || 
        tip.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        tip.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tip.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesAvailability = availabilityFilter === "" || 
        tip.availability === availabilityFilter;
      
      return matchesSearch && matchesAvailability;
    });
    
    setFilteredTips(filtered);
  }, [searchTerm, availabilityFilter, tips]);
  
  // Reset to first page only when filters change, not when tips array changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, availabilityFilter]);
  
  // Check if we need to adjust current page when data changes
  useEffect(() => {
    const totalPages = Math.ceil(filteredTips.length / itemsPerPage);
    
    // If current page is higher than total pages, reset to first page
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
    }
    
    // If the current page has no items but there are items on other pages, go to first page
    const indexOfLastTip = currentPage * itemsPerPage;
    const indexOfFirstTip = indexOfLastTip - itemsPerPage;
    const currentPageTips = filteredTips.slice(indexOfFirstTip, indexOfLastTip);
    
    if (currentPageTips.length === 0 && filteredTips.length > 0) {
      setCurrentPage(1);
    }
  }, [filteredTips, currentPage, itemsPerPage]);

  // Handle tip deletion with SweetAlert2
  const handleDeleteTip = async (tip) => {
    // Use theme context for SweetAlert styling
    const isDarkMode = theme === "dark";
    
    // Show SweetAlert2 confirmation dialog
    const result = await Swal.fire({
      title: 'Delete Garden Tip',
      html: `Are you sure you want to delete <b>"${tip.title}"</b>?<br>This action cannot be undone.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#5D5CDE',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      reverseButtons: true,
      background: isDarkMode ? '#262626' : '#fff',
      color: isDarkMode ? '#fff' : '#000'
    });
    
    if (result.isConfirmed) {
      setDeleteInProgress(true);
      
      try {
        const response = await fetch(`https://garden-community-brown.vercel.app/tips/${tip._id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json"
          }
        });
        
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText || "Failed to delete tip"}`);
        }
        
        // Remove deleted tip from state
        setTips(prevTips => prevTips.filter(t => t._id !== tip._id));
        
        // Show success message with SweetAlert2
        Swal.fire({
          title: 'Deleted!',
          text: 'Garden tip deleted successfully!',
          icon: 'success',
          confirmButtonColor: '#5D5CDE',
          background: isDarkMode ? '#262626' : '#fff',
          color: isDarkMode ? '#fff' : '#000'
        });
      } catch (error) {
        // Show error message with SweetAlert2
        Swal.fire({
          title: 'Error!',
          text: error.message || "Error deleting garden tip",
          icon: 'error',
          confirmButtonColor: '#5D5CDE',
          background: isDarkMode ? '#262626' : '#fff',
          color: isDarkMode ? '#fff' : '#000'
        });
      } finally {
        setDeleteInProgress(false);
      }
    }
  };

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

  // Helper function for availability badge color
  const getAvailabilityBadgeColor = (availability) => {
    if (theme === "dark") {
      return availability === "Public" 
        ? "bg-blue-900 text-blue-100"
        : "bg-purple-900 text-purple-100";
    } else {
      return availability === "Public" 
        ? "bg-blue-100 text-blue-800"
        : "bg-purple-100 text-purple-800";
    }
  };

  return (
    <div className={`p-6 md:p-12 ${theme === "dark" ? "bg-gray-800" : "bg-gray-50"} transition-colors duration-200`}>
      <div className="text-center mb-12">
        <h2 className={`text-3xl md:text-4xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"} mb-3 transition-colors duration-200`}>
          My Garden Tips
        </h2>
        <div className="flex justify-center">
          <div className="w-24 h-1 bg-primary rounded-full" />
        </div>
        <p className={`mt-4 text-lg ${theme === "dark" ? "text-gray-300" : "text-gray-600"} max-w-2xl mx-auto transition-colors duration-200`}>
          Manage your shared gardening tips and private notes.
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
                  placeholder="Search by title or description..." 
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
            
            {/* Availability Filter */}
            <div className="form-control md:w-1/4">
              <select 
                className={`select select-bordered w-full text-base ${
                  theme === "dark" 
                    ? "bg-gray-600 border-gray-500 text-white" 
                    : "bg-white text-gray-900"
                } transition-colors duration-200`}
                value={availabilityFilter}
                onChange={(e) => setAvailabilityFilter(e.target.value)}
              >
                <option value="" className={theme === "dark" ? "bg-gray-700" : "bg-white"}>All Visibility</option>
                <option value="Public" className={theme === "dark" ? "bg-gray-700" : "bg-white"}>Public</option>
                <option value="Hidden" className={theme === "dark" ? "bg-gray-700" : "bg-white"}>Private</option>
              </select>
            </div>
            
            {/* Add New Tip Button */}
            <div className="form-control md:w-1/4">
              <Link to="/share-tip" className="btn btn-primary w-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
                Add New Tip
              </Link>
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
            <p className={`mt-4 ${theme === "dark" ? "text-gray-300" : "text-gray-600"} transition-colors duration-200`}>Loading your garden tips...</p>
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
            <p className={`${theme === "dark" ? "text-gray-400" : "text-gray-500"} transition-colors duration-200`}>You haven't created any garden tips yet or no tips match your search.</p>
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
                    <th className="px-4 py-3">Visibility</th>
                    <th className="px-4 py-3">Likes</th>
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
                      <td className="px-4 py-3">
                        <span className={`badge ${getAvailabilityBadgeColor(tip.availability)} transition-colors duration-200`}>
                          {tip.availability}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <div className="flex items-center">
                          <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            className="h-5 w-5 text-red-500 mr-1" 
                            viewBox="0 0 20 20" 
                            fill="currentColor"
                          >
                            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                          </svg>
                          <span className={theme === "dark" ? "text-gray-300" : "text-gray-700"}>{tip.totalLiked || 0}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex justify-center space-x-2">
                          <Link 
                            to={`/tip-details/${tip._id}`} 
                            className={`btn btn-sm btn-ghost ${theme === "dark" ? "text-cyan-300 hover:bg-gray-600" : "text-primary hover:bg-gray-100"}`}
                            title="View Tip"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </Link>
                          <Link 
                            to={`/update-tip/${tip._id}`} 
                            className={`btn btn-sm btn-ghost ${theme === "dark" ? "text-blue-300 hover:bg-gray-600" : "text-blue-600 hover:bg-gray-100"}`}
                            title="Edit Tip"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 0L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </Link>
                          <button 
                            onClick={() => handleDeleteTip(tip)} 
                            className={`btn btn-sm btn-ghost ${theme === "dark" ? "text-red-300 hover:bg-gray-600" : "text-red-600 hover:bg-gray-100"}`}
                            title="Delete Tip"
                            disabled={deleteInProgress}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
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
                    <div className="absolute top-2 right-2 flex flex-col gap-2">
                      <span className={`badge ${getDifficultyBadgeColor(tip.difficultyLevel)} transition-colors duration-200`}>
                        {tip.difficultyLevel}
                      </span>
                      <span className={`badge ${getAvailabilityBadgeColor(tip.availability)} transition-colors duration-200`}>
                        {tip.availability}
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
                      <div className={`flex items-center ${theme === "dark" ? "text-gray-400" : "text-gray-500"} transition-colors duration-200`}>
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          className="h-5 w-5 text-red-500 mr-1" 
                          viewBox="0 0 20 20" 
                          fill="currentColor"
                        >
                          <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                        </svg>
                        <span>{tip.totalLiked || 0} likes</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 mt-4">
                      <Link 
                        to={`/tip-details/${tip._id}`} 
                        className={`btn btn-sm flex-1 ${theme === "dark" ? "bg-gray-600 hover:bg-gray-500 text-white" : ""} transition-colors duration-200`}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        View
                      </Link>
                      <Link 
                        to={`/update-tip/${tip._id}`} 
                        className={`btn btn-sm btn-outline flex-1 ${theme === "dark" ? "border-blue-400 text-blue-400 hover:bg-blue-900 hover:border-blue-400" : "btn-primary"} transition-colors duration-200`}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 0L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Edit
                      </Link>
                      <button 
                        onClick={() => handleDeleteTip(tip)} 
                        className={`btn btn-sm btn-outline flex-1 ${theme === "dark" ? "border-red-400 text-red-400 hover:bg-red-900 hover:border-red-400" : "border-red-500 text-red-500 hover:bg-red-100 hover:text-red-700"} transition-colors duration-200`}
                        disabled={deleteInProgress}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Delete
                      </button>
                    </div>
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