import React from 'react'

const Navbar = () => {
  return (
    <div>
    <div className="bg-gray-800  flex items-center justify-between text-white py-4 px-12">
      <h1 className="text-4xl font-bold">E-commerce</h1>
      <div className='flex items-center'><input type="text" className="bg-gray-700 border w-[400px] border-gray-600 rounded-l py-2 px-4" placeholder="Search Product & Best deals" /><button className="bg-gray-700 hover:bg-gray-600 rounded-r p-2.5"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
</svg>
</button></div>
       <div className='flex gap-4'>
        <button className='hover:bg-gray-700 px-3 rounded cursor-pointer py-2'>Login</button><button className=' bg-gray-700 hover:bg-gray-600 px-3 rounded cursor-pointer py-2'>Sign Up</button>
       </div>
    </div>
    <div>
      
    </div>
    </div>
  )
}

export default Navbar