import React from 'react'
import { Link } from 'react-router-dom'
const Navbar = () => {
  return (
    <div className='bg-gray-800 pb-2'>
    <div className="bg-gray-800  flex items-center justify-between text-white py-4 px-12">
      <h1 className="text-4xl font-bold">E-commerce</h1>
      <div className='flex items-center'><input type="text" className="bg-gray-700 border w-[400px] border-gray-600 rounded-l py-2 px-4" placeholder="Search Product & Best deals" /><button className="bg-gray-700 hover:bg-gray-600 rounded-r p-2.5"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
</svg>
</button></div>
       <div className='flex gap-4'>
        <Link to="/userlogin"><button className='hover:bg-gray-700 px-3 rounded cursor-pointer py-2'>Login</button></Link><Link to="/userregister"><button className=' bg-gray-700 hover:bg-gray-600 px-3 rounded cursor-pointer py-2'>Sign Up</button></Link>
        <Link to="/cart"><button className='bg-gray-700 hover:bg-gray-600 px-3 rounded cursor-pointer py-2'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
</svg>
</button></Link>
       </div>
       
    </div>
    <div className='flex text-white justify-between mx-12'>
      <ul className='flex gap-5'>
        <Link to="/"><li>Home</li></Link>
        <Link to="/category"><li>Category</li></Link>
        <li>Brand</li>
        <li>About</li>
        <li>Contact</li>
      </ul>
      <ul className='flex gap-5'>
        <li>Support</li>
        <li>01712345678</li>
      </ul>
    </div>
    </div>
  )
}

export default Navbar