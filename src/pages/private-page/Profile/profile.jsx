import React,  {useState} from 'react';
import { useAuthContext } from '../../../contexts/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';
import UpadateProfile from '../../../pages/private-page/Profile/UpdateProfile';
import { toast } from 'sonner';
import {motion, AnimatePresence} from 'framer-motion'
import { useEffect } from 'react';


const Profile = () => {
  const { user, logout, setUser  } = useAuthContext();
  const [showModal, setShowModal] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  useEffect(() => {
    if(!user) {
      setShowModal(false);
    }
  }, [user]);

  const handleLogout = () => {
    setLoading(false);
    logout();
     navigate('/Signin'); // Redirect after logout
    
  };

  const handleUpdate = async (updatedUser) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/api/v1/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(updatedUser),
      });
      const data = await response.json();
      console.log("update responce:", data );
      if (data.status === "success") {
        toast.success("Profile update successfully")
        // Update the user in context
        setIsEditing(false); // Close the edit mode
      //  fetchProfile(); // Fetch the updated profile data
        setUser(data.user); // Update user in context
        // Optionally, you can update the local storage as well
        localStorage.setItem("user", JSON.stringify(data.user));
        // Optionally, you can close the modal here if needed
        setShowModal(false);
      
        // Update user state or context here if needed
        // alert("Profile updated successfully!");
      } else {
        toast.error(data?.message || data?.error || "Failed to update profile.");
        // alert(data.error);
      }
    } catch (error) {
      console.error(error)
      toast.error("An error occurred while updating the profile.");
      // alert("An error occurred while updating the profile.");
    } finally {
      setLoading(false);
      // setShowModal(false);
    }
  };

  const getInitials = (fullName) => {
    if (!fullName) return 'U';
    return fullName
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };
  

  if (!user) {
    return <Navigate to="/" />
  };
  
  

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <AnimatePresence>
        
        {!isEditing && (
          <motion.div
            key="profile-card"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.4 }}
            className="bg-white shadow-lg rounded-lg space-y-6 p-8 w-full max-w-xl"
          >
             <h2 className="text-2xl font-bold text-gray-800 text-center">My Profile</h2>
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-blue-500 text-white rounded-full flex items-center justify-center text-3xl font-bold mb-4 shadow">
                {getInitials(user?.fullName || user?.name)}
              </div>

              <h2 className="text-2xl font-semibold text-gray-800 mb-1">
                {user?.fullName || user?.name}
              </h2>
              <p className="text-gray-600 mb-4">{user?.email}</p>
              <span className="text-sm px-3 py-1 bg-gray-200 rounded-full text-gray-700 capitalize">
                {user?.role}
              </span>
              <p className="text-gray-600 mt-2">{user?.phoneNumber}</p>

            </div>

            <div className="mt-8 flex justify-center gap-4">
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition"
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition"
              >
                Logout
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Update Profile Form */}
      {isEditing && (
        <UpadateProfile
          user={user}
          onClose={() => setIsEditing(false)}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
};


export default Profile;
