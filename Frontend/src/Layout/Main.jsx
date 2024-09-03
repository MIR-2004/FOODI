import React, { useContext } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Components/Navbar'
import '../App.css'
import Footer from '../Components/Footer'
import { AuthContext } from '../Context/AuthProvider'
import Loading from '../Components/Loading'

const Main = () => {

  const{loading} = useContext(AuthContext)

  return (
    <div>
   <div className='min-h-screen'>
        <Navbar/>
        <div className='min-h-screen'>
        <Outlet/>
        </div>
        <Footer/>
        </div>

    </div>
  )
}

export default Main
