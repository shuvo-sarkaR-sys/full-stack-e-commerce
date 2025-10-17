import React from 'react'
import HotDeal from './HotDeal'
const Hero = () => {
  return (
    <div className="relative bg-gradient-to-r from-blue-500 to-purple-500 h-[90vh] w-full  ">
      <div className="absolute inset-0 flex justify-between items-center w-[80%] m-auto text-white">
        <div>
          <h1 className="text-6xl text-start font-bold">Welcome to Our Store</h1>
        <p className="mt-2">Find the best products at unbeatable prices.</p>
        </div>
        <div>
          <HotDeal/>
        </div>
      </div>
    </div>
  )
}

export default Hero