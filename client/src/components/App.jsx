import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
// import MyProvider, { MyContext } from "./MyProvider";
import Home from "./Home";
import Nav from "./Nav";
import Login from "./Login";
import Profile from "./Profile";
import Error from "./Error";
import './app.css'

function App() {
  return (
    <div><Nav/>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/profile' element={<Profile />} /> 
      <Route path='*' element={<Error />} />
      </Routes>
    {/* <MyProvider>
      <Nav/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/profile' element={<Profile />} /> 
        <Route path='*' element={<Error />} />
        </Routes>
      </MyProvider>   */}
      </div>
      
    )
}

export default App;
