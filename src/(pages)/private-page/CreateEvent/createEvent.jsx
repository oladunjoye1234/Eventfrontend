import React, { useState } from "react";
import { useAuthContext } from "../../../contexts/AuthContext";
import { toast } from "sonner";
import { Navigate } from "react-router-dom";
import { motion } from "framer-motion";

const CreateEvent = () => {
  const { user } = useAuthContext();
  const { token } = useAuthContext();
  const [formData, setFormData] = useState({ 
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    price: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [creating, setCreating] = useState(false);

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setImagePreview(file ? URL.createObjectURL(file) : null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCreating(true);

    // Basic validation
    const { title, description, date, time, location, price } = formData;
    if (
      !title ||
      !description ||
      !date ||
      !time ||
      !location ||
      !price ||
      !imageFile
    ) {
      toast.error("Please fill in all fields and upload an image.");
      setCreating(false);
      return;
    }

    // Build FormData
    const payload = new FormData();
    Object.entries(formData).forEach(([key, val]) => payload.append(key, val));
    payload.append("image", imageFile);

    try {
      const res = await fetch("http://localhost:3000/api/v1/events/AllEvents", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          // DO NOT set Content-Type — browser will set to multipart/form-data
        },
        body: payload,
      });
      const data = await res.json();

      if (data.status === "success") {
        toast.success("Event created successfully!");
        // Optionally reset form:
        setFormData({
          title: "",
          description: "",
          date: "",
          time: "",
          location: "",
          price: "",
        });
        setImageFile(null);
        setImagePreview(null);
      } else {
        toast.error(data.message || "Failed to create event.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error creating event.");
    } finally {
      setCreating(false);
    }
  };

  if (!user) {
      return <Navigate to="/"/>;
    }
  

  return (
    <motion.div
      className="min-h-screen bg-gray-100 flex items-center justify-center p-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 w-full max-w-xl grid grid-cols-1 gap-4"
      >
        <h2 className="text-2xl font-semibold text-gray-800 text-center">
          Create New Event
        </h2>

        <div>
          <label className="block mb-1 font-medium">Event Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full"
            required
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="mt-2 w-full h-48 object-cover rounded"
            />
          )}
        </div>

        <input
          type="text"
          name="title"
          placeholder="Event Title"
          value={formData.title}
          onChange={handleChange}
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          required
        />

        <textarea
          name="description"
          rows="4"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price (number only)"
          value={formData.price}
          onChange={handleChange}
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          required
        />

        <div className="grid grid-cols-2 gap-4">
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
        </div>

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          required
        />

        <button
          type="submit"
          disabled={creating}
          className={`mt-4 bg-blue-600 text-white py-2 rounded-md flex justify-center items-center transition ${
            creating ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
          }`}
        >
          {creating ? (
            <>
              <svg
                className="animate-spin h-5 w-5 mr-2 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                />
              </svg>
              Submitting...
            </>
          ) : (
            "Submit Event"
          )}
        </button>
      </form>
    </motion.div>
  );
};

export default CreateEvent;
