// src/(pages)/private-page/Events/ManageEvents.jsx
import React, { useEffect, useState} from "react";
import axios from "axios";
import { toast } from "sonner";
import { useAuthContext } from "../../../contexts/AuthContext";
import { Navigate } from "react-router-dom";
import EditEventModal  from "./editEventModal";
import Spinner from "../../../components/spinner";
import { motion, AnimatePresence } from "framer-motion"

const ManageEvents = () => {
    const { user } = useAuthContext();
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null); // for editing
    const [editModalOpen, setEditModalOpen] = useState(false);
  
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:3000/api/v1/events/organizer",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setEvents(response.data.events);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch events");
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      fetchEvents();
    }, []);
  
    const handleDelete = async (id) => {
      if (
        !confirm("Are you sure you want to delete this event?")) return;
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`http://localhost:3000/api/v1/events/event/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Event deleted successfully!");
        fetchEvents();
      } catch (error) {
        console.error(error);
        toast.error("Failed to delete event");
      }
    };
  
    const openEditModal = (event) => {
      setSelectedEvent(event);
      setEditModalOpen(true);
    };
  
    const closeEditModal = () => {
      setEditModalOpen(false);
      setSelectedEvent(null);
    };
  
    if (loading) {
      return (
        <div className="flex justify-center items-center min-h-screen">
          <Spinner />
        </div>
      );
    }

    if (!user) {
        return <Navigate to="/" />;
      }
    
  
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Manage Your Events</h1>
  
        {events.length === 0 ? (
          <p className="text-gray-600">No events created yet.</p>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {events.map((event) => (
              <motion.div
                key={event._id}
                className="border p-4 rounded-lg shadow hover:shadow-lg transition"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.02 }}
              >
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
                <h2 className="text-lg font-semibold">{event.title}</h2>
                <p className="text-gray-600">{event.description}</p>
                <p className="text-gray-500 text-sm">{event.location}</p>
                <p className="text-gray-500 text-sm">{new Date(event.date).toLocaleDateString()} || {event.time}</p>

                <p className="text-gray-800 font-bold mt-2">${event.price}</p>
  
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => openEditModal(event)}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(event._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                  >
                    Delete
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
  
        {/* Edit Modal */}
        <AnimatePresence>
          {editModalOpen && selectedEvent && (
            <EditEventModal
              event={selectedEvent}
              onClose={closeEditModal}
              fetchEventsAgain={fetchEvents}
            />
          )}
        </AnimatePresence>
      </div>
    );
  };
  
  export default ManageEvents;