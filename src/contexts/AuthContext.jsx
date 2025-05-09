import { createContext, useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "sonner";

export const authContext = createContext();

export const useAuthContext = () => {
  return useContext(authContext);
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [signingUp, setSigningUp] = useState(false);
  const [signingIn, setSigningIn] = useState(false);
  const [loadingAuth, setLoadingAuth] = useState(false);

  const signin = async (formData) => {
    setSigningIn(true);
    try {
      const response = await fetch(`http://localhost:3000/api/v1/auth/login`, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data);

      if (data.status === "success") {
        toast.success("Login successful");
        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
        setToken(data.token);
        localStorage.setItem("token", data.token);
        await fetchProfile();
        return true; // Return true on successful login
      } else {
        toast.error("Invalid credentials. Please try again.");
        return false; // Return false on failed login
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred. Please try again");
      return false; // Return false on error
    } finally {
      setSigningIn(false);
    }
  };

  const signup = async (formData) => {
    setSigningUp(true);
    try {
      const response = await fetch(`http://localhost:3000/api/v1/auth/signup`, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      console.log(data);

      if (data.status === "success") {
        toast.success("Account created successfully!");
        return true; // Return true on successful signup
      } else {
        toast.error("Failed to sign up.");
        return false; // Return false on failed signup
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Please try again.");
      return false; // Return false on error
    } finally {
      setSigningUp(false);
    }
  };

  const logout = () => {
    
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    <Navigate to="/Signin" />;
  };
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const fetchProfile = async () => {
    if (!token) return;
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/auth/profile`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      console.log(data);
      if (data && data.user) {
        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch profile");
    }
  };

  const value = {
    user,
    token,
    signingUp,
    signingIn,
    loadingAuth,
    setUser,
    signin,
    logout,
    fetchProfile,
    signup,
  };

  return <authContext.Provider value={value}>{children}</authContext.Provider>;
};

export default AuthProvider;
// import { method } from "lodash";
// import { useContext, useEffect, useState, createContext } from "react";
// import { toast } from "sonner";
// export const authContext = createContext();

// export const useAuthContext = () => {
//     return useContext(authContext);
// };

// const AuthProvider = ({ children }) => {
//     const [user, setUser] = useState(null);
//     const [token, setToken] = useState(null);
//     const [signingUp, setSigningUp] = useState(false);
//     const [isLogin, setIsLogin] = useState(false);
//     const [loading, setLoading] = useState(false);
//     const [role, setRole] = useState()

//     const signIn = async (formData) => {
//         setLoading(true);
//         try {
//             const response = await fetch(`http://localhost:3000/api/v1/auth/login`,{
//                 method: "POST",
//                 body: JSON.stringify(formData),
//                 headers: {
//                     "Content-Type":"application"
//                 }
//             })
//             console.log(response);
//             const data = await response.json()
//             if(data.status == "success"){
//                 toast.success(data.message)
//             }else{
//                 toast.error(data.error)
//             }
//         } catch (error) {
//             console.log(error);
//         }finally{
//             setLoading(false)
//         }
//     }

//     const SignUp = async (formDates) => {
//         setLoading(true)
//         try {
//             const response = await fetch(`http://localhost:3000/api/v1/auth/signup`, {
//                 method: "POST",
//                 body: JSON.stringify(formDates),
//                 headers: {
//                     "Content-Type": "application/json"
//                 }
//             })
//             console.log(response);
//             const data = await response.json()
//             console.log(data);
//             setUser(data)
//             console.log(setUser);

//             if(data.status == "success"){
//                 toast.success(data.message)
//             }else{
//                 toast.error(data.error)
//             }
//         } catch (error) {
//             console.log(error);

//         }finally{
//             setLoading(false)
//         }
//     }

//     const value = {
//         user,
//         token,
//         signingUp,
//         isLogin,
//         loading,
//         signIn,
//         SignUp,
//         setIsLogin
//     };

//     return <authContext.Provider value={value}>{children}</authContext.Provider>;
// };

// export default AuthProvider;
