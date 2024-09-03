import React from 'react'
import Banner from '../../Components/Banner'
import Categories from './Categories'
import SpacialDishes from './SpacialDishes'
import Testimonials from './Testimonials'
import OurServices from './OurServices'

const Home = () => {
  return (
    <div>
     <Banner/>
     <Categories/>
     <SpacialDishes/>
     <Testimonials/>
     <OurServices/>
    </div>
  )
}

export default Home
