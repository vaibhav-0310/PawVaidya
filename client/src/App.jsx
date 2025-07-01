import React, { useState } from "react";
import "./App.css";
// Import your pages and components
import Signup from "./pages/user/signup";
import Login from "./pages/user/login"; // We'll modify this to use useAuth
import { BrowserRouter, Route, Routes } from "react-router-dom"; // Ensure react-router-dom
import Home from "./pages/home/home";
import Phr from "./pages/phr/phr";
import Essentials from "./pages/essentials/essentials";
import Error from "./pages/error";
import Cart from "./pages/essentials/cart";
import Blogs from "./pages/blogs/Blogs";
import Vet from "./pages/vet/Vet";
import CreateBlog from "./pages/blogs/create";
import Navbar from "./utils/Navbar"; // You might want to pass auth state to Navbar
import ShowBlog from "./pages/blogs/ShowBlog";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Chatbot from "./utils/Chatbot";

// Import AuthProvider and ProtectedRoute
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoutes';


function App() {
  const [showChatbot, setShowChatbot] = useState(false);
  const toggleChatbot = () => {
    setShowChatbot((prev) => !prev);
  };
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastContainer />
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/phr" element={<Phr />} />
          <Route path="/blog" element={<Blogs />} />
          <Route path="/essentials" element={<Essentials />} />
          <Route path="/vet" element={<Vet />} />
          <Route path="/create/blog" element={<CreateBlog />} /> 
          <Route element={<ProtectedRoute />}>
            <Route path="/cart" element={<Cart />} />
            <Route path="/blog/:blogId" element={<ShowBlog />} />
          </Route>
          <Route path="*" element={<Error />} />
        </Routes>
        <button className="chatbot-toggle-button" onClick={toggleChatbot}>
          {showChatbot ? "✕" : "💬"}
        </button>
        <div className={`chatbot-popup-container ${showChatbot ? "show" : ""}`}>
          <Chatbot />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;