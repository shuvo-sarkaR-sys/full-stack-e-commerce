import React from 'react'
import Navbar from '../components/Navbar'
import Category from '../components/Category'
import Footer from '../components/Footer'
const CategoryMain = () => {
  return (
    <div>
        <Navbar/>
        <div className='min-h-[50vh]'>
            <Category/>
        </div>
        <Footer/>
    </div>
  )
}

export default CategoryMain