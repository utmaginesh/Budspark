import React from 'react'
import About from './About'
import Approach from './Approach'
import Feature from './Feature'
import Footer from './Footer'
import Services from './Services'
import Header from './Header'

const Landing = () => {
    localStorage.setItem('jwtToken', null);
    localStorage.setItem('userRole', null);
    localStorage.setItem('userEmail', null);
    localStorage.setItem('tokenExpiration', null);
  return (
    <div>
      <Header />
      <Feature />
      <About />
      <Services />
      <Approach />
      <Footer />
    </div>
  )
}

export default Landing
