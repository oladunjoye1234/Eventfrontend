import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const Events = () => {
  const [user] = useState(JSON.parse(localStorage.getItem("user")));  
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 6;

  // Fetch events
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/v1/events/event");
        const data = await res.json();

        if (data.status === "success") {
          setEvents(data.events);
          setFilteredEvents(data.events);
        } else {
          toast.error(data.message || "Failed to fetch events.");
        }
      } catch (error) {
        console.error("Error fetching events:", error);
        toast.error("Something went wrong while loading events.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Search filter
  useEffect(() => {
    const term = searchTerm.toLowerCase();
    const filtered = events.filter(
      (event) =>
        event.title.toLowerCase().includes(term) ||
        event.location.toLowerCase().includes(term)
    );
    setFilteredEvents(filtered);
    setCurrentPage(1); // reset to first page on search
  }, [searchTerm, events]);

  // Pagination logic
  const indexOfLast = currentPage * eventsPerPage;
  const indexOfFirst = indexOfLast - eventsPerPage;
  const currentEvents = filteredEvents.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);

  if (!user) {
      return <Navigate to="/"/>;
    }
  if (user.role !== "attendee") {
    return (
      <div className="text-center text-red-500 font-semibold text-xl mt-10">
        You are not authorized to view this page.
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 md:px-10">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Explore Events
        </h2>

        {/* Search Bar */}
        <div className="flex justify-center mb-8">
          <input
            type="text"
            placeholder="Search by title or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        {/* Event List */}
        {loading ? (
          <p className="text-center text-gray-600">Loading events...</p>
        ) : currentEvents.length === 0 ? (
          <p className="text-center text-gray-500">No events found.</p>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {currentEvents.map((event) => (
            <Link to={`/events/${event._id}`} key={event._id}>
              <motion.div
                key={event._id}
                className="bg-white rounded-lg shadow-md p-5 hover:shadow-lg transition"
              >
                {event.image && (
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-48 object-cover rounded mb-4"
                  />
                )}
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {event.title}
                </h3>
                <p className="text-gray-600 mb-1">{event.description}</p>
                <p className="text-sm text-gray-500">
                  📍 {event.location} | 📅{" "}
                  {new Date(event.date).toLocaleDateString()}
                </p>
              </motion.div>
              </Link>
            ))}
          </motion.div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-10 space-x-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className="px-3 py-1 bg-gray-300 hover:bg-gray-400 rounded disabled:opacity-50"
              disabled={currentPage === 1}
            >
              Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded ${
                  currentPage === i + 1
                    ? "bg-indigo-500 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              className="px-3 py-1 bg-gray-300 hover:bg-gray-400 rounded disabled:opacity-50"
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;
