import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import Cookies from 'js-cookie';

export const MyContext = createContext();

const MyProvider = ({ children }) => {
  const [eventsData, setEventsData] = useState([]);
  const [currentUser, setCurrentUser] = useState();
  const [sessionId, setSessionId] = useState(Cookies.get('sessionId') || '');

  useEffect(() => {
    fetchEventsData();
  }, []);

  useEffect(() => {
    if (sessionId) {
      Cookies.set('sessionId', sessionId, { expires: 7 }); // Set the session ID as a cookie that expires in 7 days
    } else {
      Cookies.remove('sessionId');
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
