import React from 'react'

const Hero = () => {
  return (
    <div className="relative">
      <img src="path/to/your/image.jpg" alt="Hero" className="w-full h-96 object-cover" />
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
        <h1 className="text-4xl font-bold">Welcome to Our Store</h1>
        <p className="mt-2">Find the best products at unbeatable prices.</p>
      </div>
    </div>
  )
}

export default Hero