import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const MyContext = createContext();

const MyProvider = ({ children }) => {
  const [eventsData, setEventsData] = useState([]);

  useEffect(() => {
    fetchEventsData();
  }, []);

  const fetchEventsData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/events');
      setEventsData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MyContext.Provider value={{ eventsData }}>
      {children}
    </MyContext.Provider>
  );
};

export default MyProvider;