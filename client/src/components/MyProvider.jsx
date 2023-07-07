import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

export const MyContext = createContext();

const MyProvider = ({ children }) => {
  const [sessionId, setSessionId] = useState(localStorage.getItem('sessionId') || '');
  const [eventsData, setEventsData] = useState([]);
  const [usersData, setUsersData] = useState([]);
  // if sessionID is not null:
  //   do the useState stuff for preexisting sessionID
  // else:
  //   do this stuff:
    const [currentUser, setCurrentUser] = useState();
    // const [currentUser, setCurrentUser] = useState({"first_name": "kash"});
    // TODO:  Line 15 should be the logic we need to fix: on a hard-refresh, the
    //        session ID is being persevered, but the app's ability to tether the 
    //        session ID to the appropriate user info (`currentUser`) is being 
    //        broken... likely because the `useState()` is taking precedence and 
    //        `currentUser` is being set to `undefined/null`. There may be a way to 
    //        cleverly use `handleLogin()` to leverage the execution of
    //        `setCurrentUser()`, or you may be able to hijack that logic directly 
    //        within the scope of this `MyProvider()` variable with some conditional
    //        logic. 


  useEffect(() => {
    fetchEventsData();
    fetchUsersData();
  }, []);

  useEffect(() => {
    console.log("ID please: ", sessionId)
    if (sessionId) {
      console.log("setting ID!")
      localStorage.setItem('sessionId', sessionId);
    } else {
      console.log("removing ID")
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

  const fetchUsersData = async () => {
    try {
      const response = await axios.get(`/users`);
      console.log("JFJFJFJFJJFJF", response.data)
      console.log("who am i ", usersData)
      setUsersData(response.data);
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
        usersData,
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
