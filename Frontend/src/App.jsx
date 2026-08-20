import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Landing from './pages/Landing'
import About from './pages/About'
import Contact from './pages/contact'

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={< Landing />} />
      <Route path="/about" element={< About />} />
      <Route path="/contact" element={< Contact/>} />
    </Routes>
    </BrowserRouter>
  )
}

export default App 
