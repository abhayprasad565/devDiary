import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import NotFound from './Components/Errors/NotFound.jsx'
import Signup from './Components/Authentication/Signup/Signup.jsx'
import Login from './Components/Authentication/Login/Login.jsx'
import Profile from './Components/Profile/Profile.jsx'
import EditProfile from './Components/Profile/EditProfile.jsx'
import Posts from './Components/Posts/Posts.jsx'
import ViewPost from './Components/Posts/ViewPost.jsx'
import NewPost from './Components/Posts/NewPost.jsx'
import EditPost from './Components/Posts/EditPost.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='/' element={<Posts />}></Route>
      <Route path='signup' element={<Signup />}></Route>
      <Route path='login' element={<Login />}></Route>
      <Route path='users/edit/:username' element={<EditProfile />}></Route>
      <Route path='users/:username' element={<Profile />}></Route>
      <Route path='/posts' element={<Posts />}></Route>
      <Route path='/posts/view/:id' element={<ViewPost />}></Route>
      <Route path='/posts/new' element={<NewPost />}></Route>
      <Route path='/posts/edit/:id' element={<EditPost />}></Route>



      <Route path='*' element={<NotFound />}></Route>
    </Route>

  )
)

ReactDOM.createRoot(document.getElementById('root')).render(

  <RouterProvider router={router} />
)
