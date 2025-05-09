import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../../contexts/AuthContext";
import CountriesCode from "../../../../data/countries.json";
const SignUp = () => {
  const { signup, signingUp } = useAuthContext();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "attendee",
  });

  const [passwordShown, setPasswordShown] = useState(false);

  const handleShowPass = () => {
    setPasswordShown((prev) => !prev);
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await signup(formData);
    if (success) {
      // Navigate to homepage after successful signup
      navigate("/signin");
    }

    
  };

  return (
    <div>
      <div className="flex justify-center items-center h-100 bg-gray-100">
        <div className="bg-white p-8 rounded-xl shadow-lg w-96">
          <h2 className="text-2xl font-semibold text-center">
            Create an Account
          </h2>
          <p className="text-gray-500 text-center mt-2">
            Already have an account?{" "}
            <Link to="/signin" className="text-blue-500">
              Sign in
            </Link>
          </p>
          <form onSubmit={handleSubmit} className="mt-6">
            <div className="mb-4">
              <label
                className="block text-sm font-medium mb-2"
                htmlFor="fullName"
              >
                Full Name:
              </label>
              <input
                type="text"
                name="fullName"
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleInput}
                required
                // className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2" htmlFor="email">
                Email:
              </label>
              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleInput}
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2" htmlFor="phone">
                Phone Number:
              </label>
              <div className="flex gap-2">
                <select
                  id="countryCode"
                  name="countryCode"
                  value={formData.countryCode}
                  onChange={handleInput}
                  className="w-1/2 px-1 py-1 border rounded-lg bg-white"
                  required
                >
                  {CountriesCode.map((country) => (
                    <option key={country.code} value={country.code}>
                      {country.name} ({country.code})
                    </option>
                  ))}
                </select>

                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  placeholder="e.g. 712345678"
                  value={formData.phoneNumber}
                  onChange={handleInput}
                  pattern="[0-9]{6,15}" // adjust if needed
                  required
                  className="w-2/3 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Include number without leading zero. Country code is selected
                separately.
              </p>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2" htmlFor="role">
                Role:
              </label>
              <select
                id="role"
                className="w-full px-3 py-2 border rounded-lg"
                name="role"
                value={formData.role}
                onChange={handleInput}
                required
              >
                <option value="attendee">Attendee</option>
                <option value="organizer">Organizer</option>
              </select>
            </div>
            <div className="mb-4">
              <div className="relative">
                <label
                  className="block text-sm font-medium mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  type={passwordShown ? "text" : "password"}
                  name="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleInput}
                  required
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span
                  className="absolute right-3 top-9 cursor-pointer text-gray-500"
                  onClick={handleShowPass}
                >
                  {passwordShown ? (
                    <svg
                      className="h-5 w-5 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="h-5 w-5 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                      />
                    </svg>
                  )}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="rememberMe"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  onChange={handleInput}
                />
                <label
                  htmlFor="rememberMe"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>
              <a href="#" className="text-sm text-blue-600 hover:text-blue-800">
                Forgot password?
              </a>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Or continue with
              </span>
            </div>
            <div className="mt-6 flex justify-center gap-4">
              <button className="flex items-center justify-center w-1/2 bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                <img
                  src="https://www.google.com/favicon.ico"
                  alt="Google"
                  className="h-5 w-5 mr-2"
                />
                Google
              </button>
            </div>{" "}
            <br />
            <button
              type="submit"
              className="w-full py-2 bg-blue-500  rounded-md text-white hover:text-blue-800"
              disabled={signingUp}
            >
              {signingUp ? "Signing up..." : "Sign Up"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
