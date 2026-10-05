import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Landing from './pages/Landing'
import About from './pages/About'
import Contact from './pages/contact'
import ExperiencesList from './pages/ExperiencesList'
import CreateExperience from './pages/CreateExperience'
import ExperienceDetail from './pages/ExperienceDetail'
import EditExperience from './pages/EditExperience'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/experiences" element={<ExperiencesList />} />
        <Route path="/experiences/create" element={<CreateExperience />} />
        <Route path="/experiences/:id" element={<ExperienceDetail />} />
        <Route path="/experiences/edit/:id" element={<EditExperience />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
