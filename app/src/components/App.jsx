import React from 'react'
import './App.css'
import Home from './Home.jsx'
import Calendar from './Calendar.jsx'
import Admin from './Admin.jsx'
import NewJob from './NewJob.jsx'
import { BrowserRouter, Routes } from "react-router-dom"

const App = () =>  {
  return (
<>
  <h1>Green Thumb Landscaping</h1>
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/calendar" element={<Calendar />}/>
      <Route path="new job" element={<NewJob />}/>
          </Routes>
  </BrowserRouter>
{/* {  <Home />
  <Calendar />
  <NewJob />
  <Admin />} */}

</>
  )
}

export default App
