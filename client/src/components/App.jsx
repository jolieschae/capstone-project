import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import MyProvider, { MyContext } from "./MyProvider";
import Home from "./Home";
import Nav from "./Nav";
import Login from "./Login";
import SignUpForm from "./SignUpForm";
import Profile from "./Profile";
import Events from "./Events";
import EventMap from "./EventMap";
import Gigs from "./Gigs"
import Community from "./Community"
import Post from "./Post"
import Feed from "./Feed"
import Error from "./Error";
import './app.css'

function App() {

  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isLoginPage = location.pathname === "/login";
  const isRegisterPage = location.pathname === "/register";

  return (
    <div>
      {(isHomePage || isLoginPage || isRegisterPage) ? null : <Nav />}
      <MyProvider>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<SignUpForm />} />
      <Route path='/profile' element={<Profile />} /> 
      <Route path='/events' element={<Events />} />
      <Route path='/eventmap' element={<EventMap />} />
      <Route path='/collab' element={<Gigs />} />
      <Route path='/community' element={<Community />} />
      <Route path='/post' element={<Post />} />
      <Route path='/feed' element={<Feed />} />
      <Route path='*' element={<Error />} />
      </Routes>
      </MyProvider>
      </div>
      
    )
}

export default App;
