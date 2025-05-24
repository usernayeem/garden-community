import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

export const ShareTip = () => {
  const { user } = useContext(AuthContext);
  const toast = useToast();
  
  // Default form state
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
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("https://garden-community-brown.vercel.app/tips", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const result = await res.json();

      if (result.insertedId) {
        toast.success("Garden tip submitted successfully!");
        // Reset form
        setFormData({
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
      }
    } catch (error) {
      toast.error("Failed to submit garden tip. Please try again.");
    }
  };
  
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
  
  return (
    <div className="p-12 bg-gray-50 dark:bg-gray-800">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
          Share a Garden Tip
        </h2>
        <div className="flex justify-center">
          <div className="w-24 h-1 bg-primary rounded-full" />
        </div>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Share your gardening knowledge and help our community grow together.
        </p>
      </div>
      
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden border border-gray-100 dark:border-gray-600 p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text text-gray-700 dark:text-gray-200">Title</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., How I Grow Tomatoes Indoors"
              className="input input-bordered w-full text-base"
              required
            />
          </div>
          
          {/* Plant Type/Topic */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text text-gray-700 dark:text-gray-200">Plant Type/Topic</span>
            </label>
            <input
              type="text"
              name="plantType"
              value={formData.plantType}
              onChange={handleChange}
              placeholder="e.g., Tomatoes, Succulents, Fertilizers"
              className="input input-bordered w-full text-base"
              required
            />
          </div>
          
          {/* Two columns for Difficulty and Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Difficulty Level */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text text-gray-700 dark:text-gray-200">Difficulty Level</span>
              </label>
              <select
                name="difficultyLevel"
                value={formData.difficultyLevel}
                onChange={handleChange}
                className="select select-bordered w-full text-base"
                required
              >
                {difficultyLevels.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Category */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text text-gray-700 dark:text-gray-200">Category</span>
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="select select-bordered w-full text-base"
                required
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          {/* Description */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text text-gray-700 dark:text-gray-200">Description</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Share your gardening knowledge, tips, and tricks..."
              className="textarea textarea-bordered w-full h-40 text-base"
              required
            />
          </div>
          
          {/* Image URL */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text text-gray-700 dark:text-gray-200">Image URL</span>
            </label>
            <input
              type="url"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              placeholder="https://example.com/my-garden-image.jpg"
              className="input input-bordered w-full text-base"
            />
            <label className="label">
              <span className="label-text-alt text-gray-500 dark:text-gray-400">Optional: Add an image URL to showcase your garden tip</span>
            </label>
          </div>
          
          {/* Two columns for Availability and User Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Availability */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text text-gray-700 dark:text-gray-200">Availability</span>
              </label>
              <select
                name="availability"
                value={formData.availability}
                onChange={handleChange}
                className="select select-bordered w-full text-base"
                required
              >
                {availabilityOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            
            {/* User Email */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text text-gray-700 dark:text-gray-200">Email</span>
              </label>
              <input
                type="email"
                name="userEmail"
                value={formData.userEmail}
                onChange={handleChange}
                placeholder="your.email@example.com"
                className="input input-bordered w-full text-base text-gray-500"
                required
                readOnly
              />
            </div>
          </div>
          
          {/* User Name */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text text-gray-700 dark:text-gray-200">Your Name</span>
            </label>
            <input
              type="text"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              placeholder="Your Name"
              className="input input-bordered w-full text-base text-gray-500"
              required
              readOnly
            />
          </div>
          
          {/* Submit Button */}
          <div className="form-control w-full mt-8">
            <button
              type="submit"
              className="btn btn-primary btn-lg w-full"
            >
              Share Your Garden Tip
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};