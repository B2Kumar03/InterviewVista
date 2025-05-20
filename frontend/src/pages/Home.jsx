import React from 'react'
import Navbar from '../components/Layout/Navbar'
import Footer from '../components/Layout/Footer'
import MainSection from '../components/Layout/MainSection'
import FeaturesCard from '../components/Layout/FeaturesCard'
import CreateInterview from './CreateInterview'
import Instructions from './Instructions'


const Home = () => {
  return (
    <>
    <Navbar/>
    <MainSection/>
    <FeaturesCard/>
    <Footer/>
    <Instructions/>
    {}
    </>
  )
}

export default Home