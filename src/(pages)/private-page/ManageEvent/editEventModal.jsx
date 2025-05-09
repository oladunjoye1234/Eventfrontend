import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { motion } from "framer-motion";

const EditEventModal = ({ event, onClose, fetchEventsAgain }) => {
    const [formData, setFormData] = useState({
        title: event.title,
        location: event.location,
        price: event.price,
        date: event.date ? event.date.split('T')[0] : '', // ✅ FIX: only take YYYY-MM-DD
        time: event.time,
        description: event.description,
      });
      
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `http://localhost:3000/api/v1/events/event/${event._id}`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success("Event updated successfully!");

      setTimeout(() => {
        onClose(); // Close modal
        fetchEventsAgain(); // Refresh event list
      }, 800);

    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Update failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white p-8 rounded-lg w-[90%] max-w-md"
      >
        <h2 className="text-xl font-bold mb-6">Edit Event</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Event Title"
            className="w-full p-2 border rounded"
          />
          <input
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Location"
            className="w-full p-2 border rounded"
          />
          <input
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price"
            className="w-full p-2 border rounded"
            type="number"
          />
          <input
            name="date"
            value={formData.date}
            onChange={handleChange}
            placeholder="Date"
            className="w-full p-2 border rounded"
            type="date"
          />
          <input
            name="time"
            value={formData.time}
            onChange={handleChange}
            placeholder="Time"
            className="w-full p-2 border rounded"
            type="time"
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full p-2 border rounded"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded mt-4"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Event"}
          </button>
        </form>

        <button
          onClick={onClose}
          className="mt-4 text-red-500 hover:underline block mx-auto"
        >
          Cancel
        </button>
      </motion.div>
    </div>
  );
};

export default EditEventModal;
