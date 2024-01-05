import React from 'react';
import './App.css'
import Navbar from './Components/Navbar/Navbar';
import { Outlet } from 'react-router-dom'
import Signup from './Components/Authentication/Signup/Signup';

function App() {


  return (
    <>
      <Navbar></Navbar>
      <Outlet></Outlet>
    </>
  )
}

export default App
