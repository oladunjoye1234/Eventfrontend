import React, { use } from 'react'
import {useState, useContext} from "react"
import { useAuthContext } from "../../../../contexts/AuthContext"
// import { Toaster } from "sonner"
import { Link,  useNavigate, } from 'react-router-dom'
const signIn = () => {
  const {signin, signingIn, user } = useAuthContext();
  const navigate = useNavigate();
  const [formData, setFormData]= useState({
    email: "",
    password: "",
  })
  const [passwordShown, setPasswordShown] = useState(false)

  

  const handleShowPass = () => {
    setPasswordShown((prev) => !prev);
  };

  const handleInput = (e) => {
    const {name, value} = e.target;
    setFormData((prev) => ({...prev, [name]: value}))
    console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await signin(formData);
    if (success) {
      navigate("/"); // Redirect to homepage on successful login
    }
    
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
    <div className="bg-white p-8 rounded-xl shadow-lg w-96">
      <h2 className="text-2xl font-semibold text-center">Welcome Back!</h2>
      <p className="text-gray-500 text-center mt-2">
        Don't have an account? <Link to="/signup" className="text-blue-500">Sign up</Link>
      </p>

      <form onSubmit={handleSubmit} className="mt-6">
        <div className="mb-4">
        <label className="block text-sm font-medium mb-2" htmlFor="email">
            Email:
          </label>
          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={formData?.email}
            onChange={handleInput}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <div className="relative">
          <label className="block text-sm font-medium mb-2" htmlFor="password">
              Password:
          </label>
            <input
              type={passwordShown ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleInput}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span
              className="absolute right-3 top-10 cursor-pointer text-gray-500"
              onClick={handleShowPass}
            >
              {passwordShown ?  (
                <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              ) : (
                <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
                )
              }
            </span>
          </div>
        </div>

        <div className="text-right mb-4">
          <Link to="/forgot-password" className="text-blue-500 text-sm">Forgot Password?</Link>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
          disabled={signingIn}
        >
          {signingIn ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </div>
  </div>
);
};


export default signIn





