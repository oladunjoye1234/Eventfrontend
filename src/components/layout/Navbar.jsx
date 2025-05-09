import { BellIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import { useState } from "react";

const Navbar = () => {
  const { user, logout } = useAuthContext();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const getInitials = (fullName) => {
    return fullName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <nav className="bg-gray-900 text-white p-4 flex items-center justify-between relative">
      <div className="flex items-center gap-4">
        <span className="text-lg font-bold">Eventnow</span>
      </div>

      {/* Hamburger Menu Button (Visible on Mobile) */}
      <button
        className="md:hidden flex items-center px-3 py-2 text-white focus:outline-none"
        onClick={toggleMenu}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
          />
        </svg>
      </button>

      {/* Navigation Links */}
      <div
        className={`${
          menuOpen ? "block" : "hidden"
        } md:flex md:items-center md:gap-6 absolute md:static top-16 left-0 w-full md:w-auto bg-gray-900 md:bg-transparent z-50 md:z-auto flex flex-col md:flex-row items-center gap-4 p-4 md:p-0`}
      >
        {user ? (
          <>
            {user.role === "organizer" && (
              <>
                <Link
                  to="/"
                  className="hover:text-gray-300 text-center"
                  onClick={() => setMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  to="/create-event"
                  className="hover:text-gray-300 text-center"
                  onClick={() => setMenuOpen(false)}
                >
                  Create Event
                </Link>
                <Link
                  to="/events"
                  className="hover:text-gray-300 text-center"
                  onClick={() => setMenuOpen(false)}
                >
                  Events
                </Link>
                <Link
                  to="/dashboard"
                  className="hover:text-gray-300 text-center"
                  onClick={() => setMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  to="/manage-events"
                  className="hover:text-gray-300 text-center"
                  onClick={() => setMenuOpen(false)}
                >
                  Manage Events
                </Link>
              </>
            )}

            {user.role === "attendee" && (
              <>
                <Link
                  to="/"
                  className="hover:text-gray-300 text-center"
                  onClick={() => setMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  to="/events"
                  className="hover:text-gray-300 text-center"
                  onClick={() => setMenuOpen(false)}
                >
                  Events
                </Link>
                <Link
                  to="/tickets"
                  className="hover:text-gray-300 text-center"
                  onClick={() => setMenuOpen(false)}
                >
                  My Tickets
                </Link>
              </>
            )}
            <Link
              to="/PageNotFound"
              className="hover:text-gray-300 flex justify-center"
              onClick={() => setMenuOpen(false)}
            >
              <BellIcon className="w-6 h-6 text-white" />
            </Link>

            {/* Avatar & Dropdown */}
            <div className="relative">
              <div
                className="w-10 h-10 bg-gray-700 flex items-center justify-center rounded-full cursor-pointer text-sm font-bold"
                onClick={toggleDropdown}
              >
                {getInitials(user.fullName)}
              </div>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg z-50">
                  <div className="px-4 py-2 border-b font-semibold">
                    {user.name}
                    <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                  </div>
                  <Link
                    to="/profile"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => {
                      setDropdownOpen(false);
                      setMenuOpen(false);
                    }}
                  >
                    Profile
                  </Link>
                  <Link
                    to="/dashboard"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => {
                      setDropdownOpen(false);
                      setMenuOpen(false);
                    }}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setDropdownOpen(false);
                      setMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <Link
              to="/Signin"
              className="hover:text-gray-300 text-center"
              onClick={() => setMenuOpen(false)}
            >
              Login
            </Link>
            <Link
              to="/Signup"
              className="hover:text-gray-300 text-center"
              onClick={() => setMenuOpen(false)}
            >
              Sign Up
            </Link>
          </>
        )}
      </div>

      {/* Custom CSS for Media Queries */}
      <style jsx>{`
        @media (max-width: 768px) {
          .container {
            padding: 1rem;
          }
          .text-lg {
            font-size: 1.25rem;
          }
          .gap-6 {
            gap: 1rem;
          }
          .w-10 {
            width: 2rem;
            height: 2rem;
            font-size: 0.75rem;
          }
          .absolute.top-16 {
            top: 3.5rem;
          }
          .w-48 {
            width: 10rem;
          }
          .px-4 {
            padding-left: 0.5rem;
            padding-right: 0.5rem;
          }
          .py-2 {
            padding-top: 0.25rem;
            padding-bottom: 0.25rem;
          }
          .text-sm {
            font-size: 0.75rem;
          }
          .text-xs {
            font-size: 0.625rem;
          }
        }
        @media (max-width: 640px) {
          .text-lg {
            font-size: 1rem;
          }
          .w-10 {
            width: 1.75rem;
            height: 1.75rem;
            font-size: 0.625rem;
          }
          .w-48 {
            width: 8rem;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;