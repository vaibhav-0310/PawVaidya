
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios

const AuthContext = createContext(null);

axios.defaults.withCredentials = true; 

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Function to check auth status from backend
  const checkAuthStatus = async () => {
    try {
      // Use axios.get instead of fetch
      const response = await axios.get('/api/auth-status'); // Adjust URL if using axios.defaults.baseURL
      const data = response.data; // Axios puts the response body in .data

      if (data.isAuthenticated) {
        setIsAuthenticated(true);
        setUser(data.user);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    } catch (error) {
      console.error('Error fetching auth status:', error);
      // Handle network errors or server issues
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  // For login using axios.post
  const login = async (username, password) => {
    try {
      setIsLoading(true);
      const response = await axios.post('/api/login', { username, password }); // Axios sends data as JSON by default
      const data = response.data;

      if (response.status === 200 && data.success) { // Assuming your login endpoint returns { success: true } on success
        await checkAuthStatus(); // Re-fetch status to get updated user data
        return true;
      } else {
        setIsAuthenticated(false);
        setUser(null);
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      setIsAuthenticated(false);
      setUser(null);
      // Axios error handling: error.response contains server response if available
      if (error.response && error.response.data && error.response.data.message) {
        throw new Error(error.response.data.message); // Throw specific error message from backend
      }
      throw new Error('An unexpected error occurred during login.'); // Generic error
    } finally {
      setIsLoading(false);
    }
  };

  // For logout using axios.get
  const logout = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('/api/logout');
      if (response.status === 200) { // Check for successful status code
        setIsAuthenticated(false);
        setUser(null);
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};