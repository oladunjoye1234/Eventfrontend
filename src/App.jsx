import { BrowserRouter, Routes, Route,   } from "react-router-dom";
import {Toaster} from "sonner"
import Home from "./(pages)/public-page/Home/home";
import SignUp from "./(pages)/public-page/auth/Signup/Signup";
import SignIn from "./(pages)/public-page/auth/login/Signin";
import AuthProvider from "./contexts/AuthContext";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import Event from "./(pages)/private-page/Events/events";
import EventDetails from "./(pages)/private-page/Events/eventDetails";
import CreateEvent from "./(pages)/private-page/Createevent/createEvent";
import ManageEvent from "./(pages)/private-page/ManageEvent/manageEvent";
import ManageTickets from "./(pages)/private-page/ManageTickets/tickets";
import PageNotFound from "./components/common/PageNotFound";
// import { useAuthContext } from "../../../contexts/AuthContext";
import Profile from "./(pages)/private-page/Profile/profile";
import Dashboard from "./(pages)/private-page/Dashboard/dashboard";





function App() {
  // const { user } = useAuthContext();
  return (
    <BrowserRouter>
      <AuthProvider>
      <Navbar/>
        <Toaster position="top-left" richColors visibleToasts />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          {/* Add other routes here */}
          <Route path="/profile" element={ <Profile />} />
          <Route path= "/dashboard" element= {<Dashboard/>} />
          <Route path= "/events" element={<Event/>} />
          <Route path= "/events/:id" element={<EventDetails/>} />
          <Route path="/create-event" element={<CreateEvent/>}/>
          <Route path="/manage-events" element={<ManageEvent/>}/>
          <Route path="/tickets" element={<ManageTickets/>}/>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Footer/>
      </AuthProvider>
    </BrowserRouter>
  
  );
}

export default App;
