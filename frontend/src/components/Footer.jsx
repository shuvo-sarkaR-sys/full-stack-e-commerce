import React from 'react'
import appstore from '../assets/appstore.png'
import playstore from '../assets/google-play.png'
const Footer = () => {
  return (
    <div className='bg-[#F0F3F8] flex-wrap flex justify-start gap-8 md:gap-14 p-4 md:p-18'>
        <div className='xl:w-[20%]  w-auto '>
            <h2 className='text-2xl mb-5 font-bold text-gray-700'>Contact</h2>
            <ul className='leading-loose text-gray-600'>
                <li><strong>Address:</strong> 502 New Design Str, Melbourne, San Francisco, CA 94110, United States</li>
                <li><strong>Phone:</strong> (+01) 123-456789</li>
                <li><strong>E-mail:</strong> md.sirforce@gmail.com</li>
                <li><strong>Hours:</strong> Mon - Fri: 9:00 AM - 5:00 PM</li>

            </ul>
        </div>
        <div> 
            <h2 className='text-2xl  mb-5 font-bold text-gray-700'>Make Money with Us</h2>
            <ul className='leading-loose text-gray-600'>
                <li>Mission & Vision</li>
                <li>Our Team</li>
                <li>Careers</li>
                <li>press & Media</li>
                <li>Advertising</li>
                <li>Testimonials</li>
            </ul>
        </div>
        <div>
            <h2 className='text-2xl  mb-5 font-bold text-gray-700'>Company</h2>
            <ul className='leading-loose text-gray-600'   >
                <li>Our Blog</li>
                <li>Plan & Pricing</li>
                <li>Knowledge Base</li>
                <li>Cookie Policy</li>
                <li>Office Center</li>
                <li>News & Events</li>
            </ul>
        </div>
         <div>
            <h2 className='text-2xl  mb-5 font-bold text-gray-700'>My account</h2>
            <ul className='leading-loose text-gray-600'>
                <li>FAQs</li>
                <li>Editor Help</li>
                <li>Community</li>
                <li>Live Chatting</li>
                <li>Contact Us</li>
                <li>Support Center</li>
            </ul>
        </div>
        <div className='xl:w-1/4 w-auto'>
            <h2 className='text-2xl text-gray-700 mb-5 font-bold'>App & Payment</h2>
            <p className='leading-loose text-gray-600'>Download our Apps and get extra 15% Discount on your first Order…!</p>
            <div className='flex gap-3 mt-5'>
                <a href="#"><img src={appstore} alt="App Store" /></a>
                <a href="#"><img src={playstore} alt="Play Store" /></a>
            </div>
        </div>
    </div>
  )
}

export default Footer