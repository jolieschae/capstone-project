import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import MyProvider, { MyContext } from "./MyProvider";
import Home from "./Home";
import Nav from "./Nav";
import Login from "./Login";
// import Profile from "./Profile";
import Error from "./Error";

function App() {
  return (
    <div>
    <MyProvider>
      <Nav/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/login' element={<Login />} />
        {/* <Route path='/attractions/:id' element={<AttractionDetails />} /> */}
        {/* <Route path='/parkmap' element={<Map />} /> */}
        {/* <Route path='/profile' element={<UserProfile />} /> */}
        <Route path='*' element={<Error />} />
        </Routes>
      </MyProvider>
      </div>
      
    )
}

export default App;
