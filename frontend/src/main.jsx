import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      {/* <Route path='' element={<Home />}></Route>
      <Route path='skills' element={<Skills />}></Route>
      <Route path='education' element={<Education />}></Route>
      <Route path='projects' element={<Projects />}></Route>
      <Route path='contact' element={<Contact />}></Route> */}
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
