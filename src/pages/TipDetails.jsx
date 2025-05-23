import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router";
import { AuthContext } from "../context/AuthContext";

export const TipDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  
  const [tip, setTip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasLiked, setHasLiked] = useState(false);
  const [likeInProgress, setLikeInProgress] = useState(false);

  // Fetch tip data
  useEffect(() => {
    const fetchTipData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch(`http://localhost:3000/tips/${id}`);
        
        if (!response.ok) {
          throw new Error("Failed to fetch tip details");
        }
        
        const data = await response.json();
        setTip(data);
        
        // Check if user has liked this tip before
        if (user && data.likedBy) {
          setHasLiked(data.likedBy.includes(user.uid));
        }
        
      } catch (error) {
        setError(error.message || "Failed to load tip details");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchTipData();
    }
  }, [id, user]);
    
 const handleLike = async () => {
  // Prevent rapid clicking
  if (likeInProgress) return;

  setLikeInProgress(true);
  
  try {
    // Optimistic UI update
    setHasLiked(prevState => !prevState);
    setTip(prevTip => ({
      ...prevTip,
      totalLiked: hasLiked 
        ? Math.max(0, prevTip.totalLiked - 1) 
        : (prevTip.totalLiked || 0) + 1
    }));
    
    // Send update to server
    const response = await fetch(`http://localhost:3000/tips/${id}/like`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ 
        liked: !hasLiked,
        userId: user.uid
      })
    });
    
    if (!response.ok) {
      throw new Error("Failed to update like status");
    }
    
    // Update with server data
    const updatedTip = await response.json();
    setTip(updatedTip);
    
  } catch (error) {
    setError("Error updating like: " + error.message);
    
    // Revert UI changes on error
    setHasLiked(prevState => !prevState);
    setTip(prevTip => ({
      ...prevTip,
      totalLiked: !hasLiked 
        ? Math.max(0, prevTip.totalLiked - 1) 
        : (prevTip.totalLiked || 0) + 1
    }));
  } finally {
    setLikeInProgress(false);
  }
};
  
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
    <div className="p-4 md:p-12 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <div className="mb-6">
          <Link to="/browse-tips" className="inline-flex items-center text-primary hover:text-primary-focus transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Garden Tips
          </Link>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-20">
            <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
            </div>
            <p className="mt-4 text-gray-600 dark:text-gray-300">Loading garden tip details...</p>
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="text-center py-20">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mt-4 mb-2">
              Error Loading Tip
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
        )}

        {/* Tip Details Content */}
        {!loading && !error && tip && (
          <>
            {/* Header Section with Title and Badges */}
            <div className="bg-white dark:bg-gray-700 rounded-t-lg shadow-md p-6 md:p-8 border border-gray-100 dark:border-gray-600">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                  {tip.title}
                </h1>
                
                <div className="flex flex-wrap gap-2">
                  <span className="badge badge-outline text-green-600 border-green-600 dark:text-green-400 dark:border-green-400">
                    {tip.category}
                  </span>
                  <span className={`badge ${getDifficultyBadgeColor(tip.difficultyLevel)}`}>
                    {tip.difficultyLevel}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center mt-4 text-sm text-gray-600 dark:text-gray-300">
                <span className="inline-flex items-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  By <span className="font-medium ml-1">{tip.userName}</span>
                </span>
                <span className="inline-flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  Plant Type: <span className="font-medium ml-1">{tip.plantType}</span>
                </span>
              </div>
            </div>
            
            {/* Image Section */}
            {tip.imageUrl && (
              <div className="relative bg-gray-100 dark:bg-gray-600 border-x border-gray-100 dark:border-gray-600 overflow-hidden">
                <img 
                  src={tip.imageUrl} 
                  alt={tip.title} 
                  className="w-full h-64 md:h-96 object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/1200x600?text=Error+Loading+Image";
                  }} 
                />
              </div>
            )}
            
            {/* Content Section */}
            <div className="bg-white dark:bg-gray-700 p-6 md:p-8 border border-t-0 border-gray-100 dark:border-gray-600 rounded-b-lg shadow-md">
              <div className="prose dark:prose-invert max-w-none">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Description</h3>
                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                  {tip.description}
                </p>
              </div>
              
              {/* Like and Share Section */}
              <div className="mt-8 flex items-center justify-between">
                <div className="flex items-center">
                  <button 
                    onClick={handleLike}
                    className={`flex items-center space-x-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-600 rounded-lg px-4 py-2 transition-colors ${likeInProgress ? 'opacity-75 cursor-not-allowed' : ''}`}
                    disabled={!user || likeInProgress}
                  >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className={`h-5 w-5 transition-all ${hasLiked ? 'text-red-500 fill-red-500' : 'text-gray-500 dark:text-gray-400'} ${likeInProgress ? 'animate-pulse' : ''}`} 
                      viewBox="0 0 20 20" 
                      fill={hasLiked ? "currentColor" : "none"}
                      stroke="currentColor" 
                      strokeWidth="1"
                    >
                      <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                    </svg>
                    <span>{hasLiked ? "Liked" : "Like"}</span>
                  </button>
                  <span className="ml-3 text-gray-600 dark:text-gray-300 font-medium">
                    {tip.totalLiked || 0} {tip.totalLiked === 1 ? 'like' : 'likes'}
                  </span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};