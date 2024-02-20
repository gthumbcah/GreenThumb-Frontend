import React from 'react'
import './App.css'
import Home from './Home.jsx'
import Calendar from './Calendar.jsx'
import Admin from './Admin.jsx'
import NewJob from './NewJob.jsx'
import { BrowserRouter, Routes, Route } from "react-router-dom"

const App = () =>  {
  return (
<>
      <h1>Green Thumb Landscaping</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Calendar" element={<Calendar />} />
          <Route path="/NewJob" element={<NewJob />} />
          <Route path="/Admin" element={<Admin />} />
        </Routes>
      </BrowserRouter>


</>
  )
}

export default App
