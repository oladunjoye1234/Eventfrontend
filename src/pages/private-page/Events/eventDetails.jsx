import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { toast } from "sonner";
import { useAuthContext } from "../../../contexts/AuthContext";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import Spinner from "../../../components/spinner";

const EventDetails = () => {
    const { user } = useAuthContext();
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [token] = useState(localStorage.getItem("token"));
    

    useEffect(() => {
      const fetchEvent = async () => {
        try {
          const res = await fetch(`http://localhost:3000/api/v1/events/event/${id}`);
          const data = await res.json();
  
          if (data.status === "success") {
            setEvent(data.event);
          } else {
            toast.error(data.message || "Failed to fetch event.");
          }
        } catch (error) {
          console.error(error);
          toast.error("Something went wrong fetching the event.");
        } finally {
          setLoading(false);
        }
      };
  
      fetchEvent();
    }, [id]);
  
    if (loading) return <Spinner />;
  
    if (!event) {
      return <p className="text-center text-red-500 mt-10">Event not found.</p>;
    }
    const handleBookEvent = async () => {
        setLoading(true);
        try {
          const res = await axios.post(
            // `http://local/bookings/event/${event._id}`,
            `http://localhost:3000/api/v1/booking/event/${event._id}`,
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
    
          toast.success(res.data.message || "Event booked successfully!");
        } catch (err) {
          console.error(err);
          toast.error(err.response?.data?.message || "Something went wrong");
        } finally {
          setLoading(false);
        }
      };

      if (!user) {
          return <Navigate to="/" />;
        }
      
    
  
    return (
      <motion.div
        className="min-h-screen py-10 px-4 md:px-10 bg-gray-50"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.div
          className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Link to="/events" className="text-indigo-500 hover:underline mb-4 inline-block">← Back to Events</Link>
  
          {event.image && (
            <motion.img
              src={event.image}
              alt={event.title}
              className="w-full h-80 object-cover rounded mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            />
          )}
  
          <motion.h1
            className="text-3xl font-bold text-gray-800 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {event.title}
          </motion.h1>
  
          <motion.p
            className="text-gray-700 text-lg mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {event.description}
          </motion.p>
  
          <motion.div
            className="text-gray-600 space-y-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
            <p><strong>Location:</strong> {event.location}</p>
            <p><strong>Price:</strong> ${event.price}</p>
            <p><strong>Time:</strong> {event.time}</p>
            <motion.div
  className="mt-8 flex justify-center"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.6, duration: 0.5 }}
>
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={handleBookEvent}
    className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition duration-300 ease-in-out"
  >
    Book Now
  </motion.button>
</motion.div>

          </motion.div>
        </motion.div>
      </motion.div>
    );
  };
  
  export default EventDetails;
