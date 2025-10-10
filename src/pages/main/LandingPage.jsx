import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './HomePage'
import AboutUs from './AboutUs'
import Explore from './Explore'
import Libraries from './Libraries'
import Quizzes from './Quizzes'
import Boards from './Boards'
import Contact from './Contact'
import Login from './Login'
import Register from './Register'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

const LandingPage = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/explore/libraries" element={<Libraries />} />
        <Route path="/explore/quizzes" element={<Quizzes />} />
        <Route path="/explore/boards" element={<Boards />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default LandingPage