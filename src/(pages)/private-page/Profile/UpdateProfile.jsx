import React from 'react'
import { useState } from 'react'
import { toast } from 'sonner'
import { useAuthContext } from '../../../contexts/AuthContext';

const UpdateProfile = ({user, onClose, onUpdate}) => {
    if (!user) return null; // Ensure user is defined
    const [formData, setFormData] = useState({
        fullName: user?.fullName || "",
        email: user?.email || "",
      });
    
      const [loading, setLoading] = useState(false);
    
      const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
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
          console.log("update response:", data);
         
          
    
          if (data.status === "success") {

            onUpdate(formData);
            onClose();
          } else {
            toast.error(data?.message || data?.error || "Failed to update profile.");
          }
        } catch (error) {
          console.error(error);
            alert("An error occurred while updating the profile.");
        } finally {
          setLoading(false);
        }
      }





  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg space-y-4"
      >
        <h2 className="text-xl font-semibold mb-2">Update Profile</h2>

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
            required
            type="email"
          />
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded-md"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            {loading ? "Updating..." : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProfile
