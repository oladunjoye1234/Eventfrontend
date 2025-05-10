import React, { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import axios from "axios";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { useAuthContext } from "../../../contexts/AuthContext";

const ManageBookings = () => {
  const { user } = useAuthContext();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cancelingId, setCancelingId] = useState(null);
  const [confirmModal, setConfirmModal] = useState({ open: false, bookingId: null });

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:3000/api/v1/booking/booked", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(res.data.bookings || []);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const confirmCancel = (bookingId) => {
    setConfirmModal({ open: true, bookingId });
  };

  const handleCancelBooking = async () => {
    const bookingId = confirmModal.bookingId;
    setCancelingId(bookingId);
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:3000/api/v1/booking/event/${bookingId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings((prev) => prev.filter((b) => b.bookingId !== bookingId));
      toast.success("Booking canceled successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to cancel booking");
    } finally {
      setCancelingId(null);
      setConfirmModal({ open: false, bookingId: null });
    }
  };

  if (!user || user.role !== "attendee") {
    return (
      <div className="text-center text-red-500 font-semibold text-xl mt-10">
        Access denied. Only attendees can view bookings.
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8 text-center text-blue-400">My Booked Events</h1>

      {loading ? (
        <div className="flex justify-center">
          <FaSpinner className="animate-spin text-4xl text-blue-500" />
        </div>
      ) : bookings.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">You have no booked events.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          <AnimatePresence>
            {bookings .filter(({ event }) => event !== null && event !== undefined) 
            .map(({ bookingId, event }) => (
              <motion.div
                key={bookingId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="bg-white shadow-lg rounded-lg p-6 border relative overflow-hidden"
              >
                <div>
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-40 object-cover rounded-md mb-4"
                  />
                  <h2 className="text-xl font-bold text-gray-800 mb-2">Title: {event.title}</h2>
                  {event.description && (
                    <p className="text-gray-600 text-sm mb-1">
                      <strong>Description:</strong> {event.description}
                    </p>
                  )}
                  {event.location && (
                    <p className="text-gray-600 text-sm mb-1">
                      <strong>Location:</strong> {event.location}
                    </p>
                  )}
                  {event.price && (
                    <p className="text-gray-600 text-sm mb-1">
                      <strong>Price:</strong> ${event.price}
                    </p>
                  )}
                  <p className="text-gray-600 text-sm mb-1">
                    <strong>Date:</strong> {new Date(event.date).toLocaleDateString()} || <strong>Time:</strong> {event.time}
                  </p>
                  <p className="text-gray-400 text-xs mt-2">Booking ID: {bookingId}</p>
                </div>

                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => confirmCancel(bookingId)}
                  disabled={cancelingId === bookingId}
                  className="absolute bottom-7 right-4 bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded shadow"
                >
                  {cancelingId === bookingId ? (
                    <div className="flex items-center">
                      <FaSpinner className="animate-spin mr-2" /> Canceling...
                    </div>
                  ) : (
                    "Cancel"
                  )}
                </motion.button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      <AnimatePresence>
        {confirmModal.open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="bg-white rounded-lg shadow-lg p-6 w-80 text-center"
            >
              <h2 className="text-lg font-bold mb-4">Cancel Booking?</h2>
              <p className="text-sm text-gray-600 mb-6">
                Are you sure you want to cancel this booking?
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setConfirmModal({ open: false, bookingId: null })}
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                  disabled={cancelingId === confirmModal.bookingId}
                >
                  No
                </button>
                <button
                  onClick={handleCancelBooking}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 flex items-center justify-center"
                  disabled={cancelingId === confirmModal.bookingId}
                >
                  {cancelingId === confirmModal.bookingId ? (
                    <>
                      <FaSpinner className="animate-spin mr-2" /> Canceling...
                    </>
                  ) : (
                    "Yes, Cancel"
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ManageBookings;
