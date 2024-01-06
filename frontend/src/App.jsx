import React, { useEffect, useState } from 'react';
import './App.css'
import Navbar from './Components/Navbar/Navbar';
import { Outlet } from 'react-router-dom'
import Signup from './Components/Authentication/Signup/Signup';
import { UserInfoProvider } from './Contexts/UserInfo';

function App() {
  const [userInfo, setUserInfo] = useState({
    isLoggedIn: false,
    userInfo: {}
  });
  function setUser(userStatus, user) {
    setUserInfo({
      isLoggedIn: userStatus,
      userInfo: { ...user }
    })
    console.log(user);
  }
  useEffect(() => {
    console.log("check-login")
    fetch('http://localhost:8080/check_login')
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.log(error.message);
      });
  }, [])

  return (
    <>
      <UserInfoProvider value={{ userInfo, setUser }}>
        <Navbar></Navbar>
        <Outlet></Outlet>
      </UserInfoProvider>
    </>
  )
}

export default App
