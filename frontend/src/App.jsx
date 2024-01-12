import React, { useEffect, useState } from 'react';
import './App.css'
import Navbar from './Components/Navbar/Navbar';
import { Outlet } from 'react-router-dom'
import Signup from './Components/Authentication/Signup/Signup';
import { UserInfoProvider } from './Contexts/UserInfo';
import useError from './Hooks/ErrorMessages';
import { useNavigate } from 'react-router-dom';
import Footer from './Components/Footer/Footer';
import { STATIC } from './Hooks/Config';

function App() {
  // navigate hook
  const navigate = useNavigate();
  // user state hook
  const [userInfo, setUserInfo] = useState({
    isLoggedIn: false,
    info: {}
  });
  // context api set user
  function setUser(userStatus = false, user = null) {
    setUserInfo({
      isLoggedIn: userStatus,
      info: { ...user }
    })
  }
  // error popup 
  const [errorPopup, setError] = useError();
  // check user already loggedin
  useEffect(() => {
    const params = {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        'Content-Type': 'application/json',
      },
    }
    fetch(STATIC + '/check_login', params)
      .then(response => {
        return response.json();
      })
      .then(data => {
        if (data.error) {
          throw data;
        }
        setUser(data.sucess, data.user);
      })
      .catch(error => {
        console.log(error);
        setError(true, error.message);
        setTimeout(() => {
          navigate('/login', { replace: true });
        }, 2000);
      });
  }, [])

  return (
    <>
      <UserInfoProvider value={{ userInfo, setUser }}>
        <Navbar></Navbar>
        <Outlet></Outlet>
        {errorPopup}
        <Footer />
      </UserInfoProvider>
    </>
  )
}

export default App
