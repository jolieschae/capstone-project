import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

export const MyContext = createContext();

const MyProvider = ({ children }) => {
  const [eventsData, setEventsData] = useState([]);
  const [currentUser, setCurrentUser] = useState();
  const [sessionId, setSessionId] = useState(localStorage.getItem('sessionId') || '');

  useEffect(() => {
    fetchEventsData();
  }, []);

  useEffect(() => {
    if (sessionId) {
      localStorage.setItem('sessionId', sessionId);
    } else {
      localStorage.removeItem('sessionId');
    }
  }, [sessionId]);

  const fetchEventsData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/events');
      setEventsData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogin = (userData) => {
    const sessionId = uuidv4();
    setCurrentUser(userData);
    setSessionId(sessionId);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setSessionId('');
  };

  return (
    <MyContext.Provider
      value={{
        eventsData,
        currentUser,
        handleLogin,
        handleLogout,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export default MyProvider;
