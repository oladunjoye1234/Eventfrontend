import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../../contexts/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import ConfirmModal from "../../../components/confirmModal";
import { Navigate, useNavigate } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";

const Dashboard = () => {
  const { user } = useAuthContext();
  const [deleteType, setDeleteType] = useState("");
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [bookedEvents, setBookedEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProfile, setEditingProfile] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);
  const [cancelingId, setCancelingId] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [eventImage, setEventImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [creating, setCreating] = useState(false);
  const [newEventData, setNewEventData] = useState({
    image: null,
    title: "",
    description: "",
    date: "",
    location: "",
    time: "",
    price: "",
  });
  const [formData, setFormData] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
  });

  const handleDeleteClick = (id, type) => {
    setDeleteType(type);
    setEventToDelete(id);
    setConfirmOpen(true);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/api/v1/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.status === "success") {
        toast.success("Profile updated successfully!");
        setEditingProfile(false);
      } else {
        toast.error(data.message || "Failed to update profile.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while updating the profile.");
    }
  };

  const handleDeleteEvent = async (id) => {
    if (!id) return;
    try {
      const res = await fetch(`http://localhost:3000/api/v1/events/event/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      if (data.status === "success") {
        setEvents((prev) => prev.filter((e) => e._id !== id));
        toast.success("Event deleted successfully");
      } else {
        toast.error(data.message || "Failed to delete event");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error deleting event");
    } finally {
      setConfirmOpen(false);
      setEventToDelete(null);
    }
  };

  const handleDeleteBooking = async (id) => {
    if (!id) return;
    setCancelingId(id);
    try {
      const res = await fetch(`http://localhost:3000/api/v1/booking/event/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      if (data.status === "success") {
        setBookedEvents((prev) => prev.filter((b) => b.bookingId !== id));
        toast.success("Booking canceled");
      } else {
        toast.error(data.message || "Failed to cancel booking");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error canceling booking");
    } finally {
      setCancelingId(null);
      setConfirmOpen(false);
      setEventToDelete(null);
    }
  };

  const handleCreateEvent = async (event) => {
    event.preventDefault();
    setCreating(true);
    if (
      !newEventData.title ||
      !newEventData.description ||
      !newEventData.date ||
      !newEventData.location ||
      !newEventData.time ||
      !newEventData.price ||
      !eventImage
    ) {
      toast.error("Please fill in all fields and upload an image.");
      setCreating(false);
      return;
    }

    const formData = new FormData();
    formData.append("title", newEventData.title);
    formData.append("description", newEventData.description);
    formData.append("date", newEventData.date);
    formData.append("location", newEventData.location);
    formData.append("price", newEventData.price);
    formData.append("image", eventImage);
    formData.append("time", newEventData.time);

    try {
      const response = await fetch("http://localhost:3000/api/v1/events/AllEvents", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });
      const data = await response.json();
      if (data.status === "success") {
        toast.success("Event created successfully!");
        setEvents((prev) => [...prev, data.event]);
        setNewEventData({
          image: null,
          title: "",
          description: "",
          date: "",
          location: "",
          time: "",
          price: "",
        });
        setEventImage(null);
        setImagePreview(null);
        setShowCreateForm(false);
      } else {
        toast.error(data?.message || "Failed to create event.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while creating the event.");
    } finally {
      setCreating(false);
    }
  };

  useEffect(() => {
    if (!user) return;
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const url =
          user.role === "organizer"
            ? "http://localhost:3000/api/v1/events/organizer"
            : "http://localhost:3000/api/v1/booking/booked";
        const res = await fetch(url, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await res.json();
        if (data?.status === "success") {
          if (user.role === "organizer") {
            setEvents(data.events || []);
          } else {
            setBookedEvents(data.bookings || []);
          }
        } else {
          toast.error(data.message || "Failed to fetch events");
        }
      } catch (error) {
        console.error("Error fetching events:", error);
        toast.error("Error fetching events");
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, [user]);

  if (!user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 md:px-8">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl p-8">
        {/* Profile Header */}
        <div className="mb-8 border-b pb-4 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">Dashboard</h2>
            <p className="text-gray-500">
              Welcome back, {user?.fullName || user?.name}!
            </p>
          </div>
          <button
            onClick={() => setEditingProfile(!editingProfile)}
            className="text-sm px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {editingProfile ? "Cancel" : "Edit Profile"}
          </button>
        </div>

        {/* Profile Info */}
        <AnimatePresence mode="wait">
          {!editingProfile ? (
            <motion.div
              key="view"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10"
            >
              <div className="bg-blue-50 p-4 rounded-lg shadow-sm">
                <h3 className="text-lg font-medium text-blue-700 mb-1">Full Name</h3>
                <p className="text-gray-700">{user?.fullName || user?.name}</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg shadow-sm">
                <h3 className="text-lg font-medium text-blue-700 mb-1">Email</h3>
                <p className="text-gray-700">{user?.email}</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg shadow-sm">
                <h3 className="text-lg font-medium text-blue-700 mb-1">Role</h3>
                <p className="capitalize text-gray-700">{user?.role}</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg shadow-sm">
                <h3 className="text-lg font-medium text-blue-700 mb-1">Number</h3>
                <p className="capitalize text-gray-700">{user?.phoneNumber}</p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="edit"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10"
            >
              <div>
                <label className="block mb-1 text-sm">Full Name</label>
                <input
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 text-sm">Email</label>
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded-md"
                  type="email"
                  required
                />
              </div>
              <div className="sm:col-span-2 flex gap-4">
                <button
                  onClick={handleProfileUpdate}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setEditingProfile(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md transition"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Create Event Form (Organizers Only) */}
        {user.role === "organizer" && (
          <div className="mb-8">
            <button
              onClick={() => setShowCreateForm(!showCreateForm)}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
            >
              {showCreateForm ? "Close Form" : "Create New Event"}
            </button>
            <AnimatePresence>
              {showCreateForm && (
                <motion.form
                  onSubmit={handleCreateEvent}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-6 bg-gray-100 p-6 rounded-lg grid grid-cols-1 sm:grid-cols-2 gap-4"
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      setEventImage(file);
                      if (file) {
                        setImagePreview(URL.createObjectURL(file));
                      }
                    }}
                    className="col-span-1 sm:col-span-2"
                  />
                  {imagePreview && (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="max-w-sm rounded shadow col-span-1 sm:col-span-2"
                    />
                  )}
                  <input
                    type="text"
                    name="title"
                    value={newEventData.title}
                    onChange={(e) =>
                      setNewEventData((prev) => ({ ...prev, title: e.target.value }))
                    }
                    placeholder="Event Title"
                    className="p-2 border rounded"
                    required
                  />
                  <input
                    type="text"
                    name="location"
                    value={newEventData.location}
                    onChange={(e) =>
                      setNewEventData((prev) => ({ ...prev, location: e.target.value }))
                    }
                    placeholder="Location"
                    className="p-2 border rounded"
                    required
                  />
                  <textarea
                    name="description"
                    value={newEventData.description}
                    onChange={(e) =>
                      setNewEventData((prev) => ({ ...prev, description: e.target.value }))
                    }
                    placeholder="Description"
                    className="p-2 border rounded col-span-1 sm:col-span-2"
                    required
                  />
                  <input
                    type="date"
                    name="date"
                    value={newEventData.date}
                    onChange={(e) =>
                      setNewEventData((prev) => ({ ...prev, date: e.target.value }))
                    }
                    className="p-2 border rounded"
                    required
                  />
                  <input
                    type="time"
                    name="time"
                    value={newEventData.time}
                    onChange={(e) =>
                      setNewEventData((prev) => ({ ...prev, time: e.target.value }))
                    }
                    className="border px-3 py-2 rounded-md"
                    required
                  />
                  <input
                    type="number"
                    name="price"
                    value={newEventData.price}
                    onChange={(e) =>
                      setNewEventData((prev) => ({ ...prev, price: e.target.value }))
                    }
                    placeholder="Price"
                    className="p-2 border rounded"
                    required
                  />
                  <button
                    type="submit"
                    disabled={creating}
                    className={`col-span-1 sm:col-span-2
                      ${creating ? "opacity-50 cursor-not-allowed" : ""}
                      bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md flex justify-center items-center`}
                  >
                    {creating ? (
                      <>
                        <FaSpinner className="animate-spin h-5 w-5 text-white mr-2" />
                        Submitting...
                      </>
                    ) : (
                      "Submit Event"
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Events Section */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            {user.role === "organizer" ? "Posted Events" : "Booked Events"}
          </h3>
          {loading ? (
            <div className="flex justify-center">
              <FaSpinner className="animate-spin text-4xl text-blue-500" />
            </div>
          ) : user.role === "organizer" ? (
            events.length === 0 ? (
              <p className="text-gray-500">No events posted.</p>
            ) : (
              <motion.div
                layout
                className="grid gap-6 grid-cols-1 sm:grid-cols-2"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.1 },
                  },
                }}
              >
                {events.map((event) => (
                  <motion.div
                    key={event._id}
                    className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition"
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 },
                    }}
                  >
                    {event.image && (
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-48 object-cover rounded mb-4"
                      />
                    )}
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">{event.title}</h4>
                    <p className="text-sm text-gray-600 mb-1">{event.description}</p>
                    <p className="text-sm text-gray-500">
                      Date: {new Date(event.date).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-500">Location: {event.location}</p>
                    <p className="text-sm text-gray-500">
                      Price: ${event.price} | Time: {event.time}
                    </p>
                    <button
                      onClick={() => handleDeleteClick(event._id, "event")}
                      className="mt-4 px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
                      disabled={loading}
                    >
                      {loading ? (
                        <span className="flex items-center">
                          <FaSpinner className="animate-spin h-4 w-4 mr-2 text-white" />
                          Processing...
                        </span>
                      ) : (
                        "Delete Event"
                      )}
                    </button>
                  </motion.div>
                ))}
              </motion.div>
            )
          ) : (
            bookedEvents.length === 0 ? (
              <p className="text-center text-gray-500 text-lg">You have no booked events.</p>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                <AnimatePresence>
                  {bookedEvents
                    .filter(({ event }) => event !== null && event !== undefined)
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
                            src={event.image || "https://via.placeholder.com/300x150"}
                            alt={event.title || "Event"}
                            className="w-full h-40 object-cover rounded-md mb-4"
                          />
                          <h2 className="text-xl font-bold text-gray-800 mb-2">
                            Title: {event.title || "Unknown Event"}
                          </h2>
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
                            <strong>Date:</strong>{" "}
                            {event.date ? new Date(event.date).toLocaleDateString() : "N/A"} ||{" "}
                            <strong>Time:</strong> {event.time || "N/A"}
                          </p>
                          <p className="text-gray-400 text-xs mt-2">Booking ID: {bookingId}</p>
                        </div>
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleDeleteClick(bookingId, "booking")}
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
            )
          )}
        </div>

        <ConfirmModal
          isOpen={confirmOpen}
          onCancel={() => {
            setConfirmOpen(false);
            setEventToDelete(null);
            setCancelingId(null);
          }}
          onConfirm={() => {
            if (deleteType === "event") {
              handleDeleteEvent(eventToDelete);
            } else {
              handleDeleteBooking(eventToDelete);
            }
          }}
          message={
            deleteType === "event"
              ? "This will permanently delete the event. Are you sure?"
              : "This will cancel your booking. Continue?"
          }
        />
      </div>
    </div>
  );
};

export default Dashboard;
