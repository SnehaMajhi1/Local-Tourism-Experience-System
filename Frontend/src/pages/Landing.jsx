import React from 'react'
import Navbar from '../components/common/Navbar';
import Hero from '../components/landingComponents/Hero';
import Features from '../components/landingComponents/Features';
import Footer from '../components/landingComponents/Footer';


const Landing = () => {
  return (
    <div>
      <Navbar/>
      <Hero/>
      <Features/>
      <Footer/>
    </div>
  )
}

export default Landing