import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import NotFound from './Components/Errors/NotFound.jsx'
import Signup from './Components/Authentication/Signup/Signup.jsx'
import Login from './Components/Authentication/Login/Login.jsx'
import Profile from './Components/Profile/Profile.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='signup' element={<Signup />}></Route>
      <Route path='login' element={<Login />}></Route>
      <Route path='users/:username' element={<Profile />}></Route>
      <Route path='*' element={<NotFound />}></Route>
    </Route>

  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
