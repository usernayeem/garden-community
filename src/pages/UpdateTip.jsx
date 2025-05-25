import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";
import { useToast } from "../context/ToastContext";

export const UpdateTip = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  const toast = useToast();
  
  // Track submission state
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    plantType: "",
    difficultyLevel: "Easy",
    description: "",
    imageUrl: "",
    category: "Plant Care",
    availability: "Public",
    userEmail: user?.email || "",
    userName: user?.displayName || ""
  });

  // UI states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
  const availabilityOptions = ["Public", "Hidden"];

  // Fetch tip data
  useEffect(() => {
    const fetchTipData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch(`https://garden-community-brown.vercel.app/tips/${id}`);
        
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText || "Failed to fetch tip data"}`);
        }
        
        const tipData = await response.json();
        
        // Populate form with tip data
        setFormData({
          title: tipData.title || "",
          plantType: tipData.plantType || "",
          difficultyLevel: tipData.difficultyLevel || "Easy",
          description: tipData.description || "",
          imageUrl: tipData.imageUrl || "",
          category: tipData.category || "Plant Care",
          availability: tipData.availability || "Public",
          userEmail: tipData.userEmail || user?.email || "",
          userName: tipData.userName || user?.displayName || ""
        });
        
      } catch (error) {
        setError(error.message || "Failed to load tip data");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchTipData();
    }
  }, [id, user]);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch(`https://garden-community-brown.vercel.app/tips/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText || "Failed to update tip"}`);
      }
      
      await response.json();
      
      toast.success("Garden tip updated successfully!");
      
      // Redirect to My Tips page
      navigate("/my-tips");
      
    } catch (error) {
      toast.error(error.message || "Failed to update garden tip. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`p-6 md:p-12 ${theme === "dark" ? "bg-gray-800" : "bg-gray-50"} transition-colors duration-200`}>
      <div className="text-center mb-12">
        <h2 className={`text-3xl md:text-4xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"} mb-3 transition-colors duration-200`}>
          Update Garden Tip
        </h2>
        <div className="flex justify-center">
          <div className="w-24 h-1 bg-primary rounded-full" />
        </div>
        <p className={`mt-4 text-lg ${theme === "dark" ? "text-gray-300" : "text-gray-600"} max-w-2xl mx-auto transition-colors duration-200`}>
          Edit your gardening knowledge and improve your shared tips.
        </p>
      </div>
      
      {/* Loading State */}
      {loading && (
        <div className={`max-w-3xl mx-auto text-center py-16 ${theme === "dark" ? "bg-gray-700" : "bg-white"} rounded-lg shadow-md transition-colors duration-200`}>
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
          </div>
          <p className={`mt-4 ${theme === "dark" ? "text-gray-300" : "text-gray-600"} transition-colors duration-200`}>Loading tip data...</p>
        </div>
      )}
      
      {/* Error State */}
      {!loading && error && (
        <div className={`max-w-3xl mx-auto text-center py-16 ${theme === "dark" ? "bg-gray-700" : "bg-white"} rounded-lg shadow-md transition-colors duration-200`}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className={`text-xl font-semibold ${theme === "dark" ? "text-gray-300" : "text-gray-700"} mt-4 mb-1 transition-colors duration-200`}>Error Loading Tip</h3>
          <p className={`${theme === "dark" ? "text-gray-400" : "text-gray-500"} mb-4 transition-colors duration-200`}>{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="btn btn-primary"
          >
            Try Again
          </button>
        </div>
      )}
      
      {/* Update Form */}
      {!loading && !error && (
        <div className={`max-w-3xl mx-auto ${theme === "dark" ? "bg-gray-700" : "bg-white"} rounded-lg shadow-md overflow-hidden ${theme === "dark" ? "border-gray-600" : "border-gray-100"} border p-6 transition-colors duration-200`}>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div className="form-control w-full">
              <label className="label">
                <span className={`label-text ${theme === "dark" ? "text-gray-200" : "text-gray-700"} transition-colors duration-200`}>Title</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., How I Grow Tomatoes Indoors"
                className={`input input-bordered w-full text-base ${theme === "dark" ? "bg-gray-600 border-gray-500 text-white placeholder-gray-400" : "bg-white text-gray-900 placeholder-gray-500"} transition-colors duration-200`}
                required
              />
            </div>
            
            {/* Plant Type/Topic */}
            <div className="form-control w-full">
              <label className="label">
                <span className={`label-text ${theme === "dark" ? "text-gray-200" : "text-gray-700"} transition-colors duration-200`}>Plant Type/Topic</span>
              </label>
              <input
                type="text"
                name="plantType"
                value={formData.plantType}
                onChange={handleChange}
                placeholder="e.g., Tomatoes, Succulents, Fertilizers"
                className={`input input-bordered w-full text-base ${theme === "dark" ? "bg-gray-600 border-gray-500 text-white placeholder-gray-400" : "bg-white text-gray-900 placeholder-gray-500"} transition-colors duration-200`}
                required
              />
            </div>
            
            {/* Two columns for Difficulty and Category */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Difficulty Level */}
              <div className="form-control w-full">
                <label className="label">
                  <span className={`label-text ${theme === "dark" ? "text-gray-200" : "text-gray-700"} transition-colors duration-200`}>Difficulty Level</span>
                </label>
                <select
                  name="difficultyLevel"
                  value={formData.difficultyLevel}
                  onChange={handleChange}
                  className={`select select-bordered w-full text-base ${theme === "dark" ? "bg-gray-600 border-gray-500 text-white" : "bg-white text-gray-900"} transition-colors duration-200`}
                  required
                >
                  {difficultyLevels.map((level) => (
                    <option key={level} value={level} className={theme === "dark" ? "bg-gray-700" : "bg-white"}>
                      {level}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Category */}
              <div className="form-control w-full">
                <label className="label">
                  <span className={`label-text ${theme === "dark" ? "text-gray-200" : "text-gray-700"} transition-colors duration-200`}>Category</span>
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className={`select select-bordered w-full text-base ${theme === "dark" ? "bg-gray-600 border-gray-500 text-white" : "bg-white text-gray-900"} transition-colors duration-200`}
                  required
                >
                  {categories.map((category) => (
                    <option key={category} value={category} className={theme === "dark" ? "bg-gray-700" : "bg-white"}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            {/* Description */}
            <div className="form-control w-full">
              <label className="label">
                <span className={`label-text ${theme === "dark" ? "text-gray-200" : "text-gray-700"} transition-colors duration-200`}>Description</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Share your gardening knowledge, tips, and tricks..."
                className={`textarea textarea-bordered w-full h-40 text-base ${theme === "dark" ? "bg-gray-600 border-gray-500 text-white placeholder-gray-400" : "bg-white text-gray-900 placeholder-gray-500"} transition-colors duration-200`}
                required
              />
            </div>
            
            {/* Image URL */}
            <div className="form-control w-full">
              <label className="label">
                <span className={`label-text ${theme === "dark" ? "text-gray-200" : "text-gray-700"} transition-colors duration-200`}>Image URL</span>
              </label>
              <input
                type="url"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                placeholder="https://example.com/my-garden-image.jpg"
                className={`input input-bordered w-full text-base ${theme === "dark" ? "bg-gray-600 border-gray-500 text-white placeholder-gray-400" : "bg-white text-gray-900 placeholder-gray-500"} transition-colors duration-200`}
              />
              <label className="label">
                <span className={`label-text-alt ${theme === "dark" ? "text-gray-400" : "text-gray-500"} transition-colors duration-200`}>Optional: Add an image URL to showcase your garden tip</span>
              </label>
            </div>
            
            {/* Two columns for Availability and User Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Availability */}
              <div className="form-control w-full">
                <label className="label">
                  <span className={`label-text ${theme === "dark" ? "text-gray-200" : "text-gray-700"} transition-colors duration-200`}>Availability</span>
                </label>
                <select
                  name="availability"
                  value={formData.availability}
                  onChange={handleChange}
                  className={`select select-bordered w-full text-base ${theme === "dark" ? "bg-gray-600 border-gray-500 text-white" : "bg-white text-gray-900"} transition-colors duration-200`}
                  required
                >
                  {availabilityOptions.map((option) => (
                    <option key={option} value={option} className={theme === "dark" ? "bg-gray-700" : "bg-white"}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* User Email */}
              <div className="form-control w-full">
                <label className="label">
                  <span className={`label-text ${theme === "dark" ? "text-gray-200" : "text-gray-700"} transition-colors duration-200`}>Email</span>
                </label>
                <input
                  type="email"
                  name="userEmail"
                  value={formData.userEmail}
                  className={`input input-bordered w-full text-base ${theme === "dark" ? "bg-gray-600 border-gray-500 text-gray-300" : "bg-white text-gray-500"} opacity-75 transition-colors duration-200`}
                  required
                  readOnly
                />
              </div>
            </div>
            
            {/* User Name */}
            <div className="form-control w-full">
              <label className="label">
                <span className={`label-text ${theme === "dark" ? "text-gray-200" : "text-gray-700"} transition-colors duration-200`}>Your Name</span>
              </label>
              <input
                type="text"
                name="userName"
                value={formData.userName}
                className={`input input-bordered w-full text-base ${theme === "dark" ? "bg-gray-600 border-gray-500 text-gray-300" : "bg-white text-gray-500"} opacity-75 transition-colors duration-200`}
                required
                readOnly
              />
            </div>
            
            {/* Buttons */}
            <div className="form-control w-full mt-8 flex flex-col md:flex-row gap-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`btn ${theme === "dark" ? "bg-primary hover:bg-primary-focus text-white" : "bg-primary hover:bg-primary-focus text-white"} btn-lg flex-1 transition-colors duration-200 ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""}`}
              >
                {isSubmitting ? (
                  <>
                    <span className="loading loading-spinner loading-sm mr-2"></span>
                    Updating...
                  </>
                ) : (
                  "Update Garden Tip"
                )}
              </button>
              
              <Link
                to="/my-tips"
                className={`btn btn-outline btn-lg flex-1 ${theme === "dark" ? "border-gray-400 text-gray-300 hover:bg-gray-600" : ""} transition-colors duration-200`}
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};