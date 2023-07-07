import React, { createContext, useEffect, useState } from 'react';
import Login from "./Login";
import axios from 'axios';

export const MyContext = createContext();

const MyProvider = ({ children }) => {
  const [eventsData, setEventsData] = useState([]);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchEventsData();
    checkSession();
  }, []);

  const fetchEventsData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/events');
      setEventsData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const checkSession = async () => {
    try {
      const response = await axios.get('/check_session');
      setUser(response.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const handleLogin = (user) => {
    setUser(user);
  };

  const handleLogout = async () => {
    try {
      await axios.delete('/logout');
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };


  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <MyContext.Provider value={{ user, eventsData, handleLogout }}>
      {children}
    </MyContext.Provider>
  );
};

export default MyProvider;
