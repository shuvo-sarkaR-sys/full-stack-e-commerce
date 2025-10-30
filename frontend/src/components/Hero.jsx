import React from 'react'
import HotDeal from './HotDeal'
import hero1 from '../assets/banner-hero-2.png'
import hero2 from '../assets/banner-hero-3.png'
import hero3 from '../assets/banner.png'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; // core Swiper styles
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

const Hero = () => {
    

  return (
    <div className="relative mt-0  h-[80vh] w-full  ">
      <div className="absolute inset-0 flex justify-between items-center w-[90%] m-auto text-white">
         <div className="w-[70%] h-auto mx-auto ">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
      
        pagination={{ clickable: true }}
        autoplay={{ delay: 7000, disableOnInteraction: false }}
        loop={true}
        className="rounded-md h-[500px] "
      >
         
          <SwiperSlide  >
            <div className='relative bg-[#DCF4E0] text-black'>
            <img
              src={hero1}
              alt=''
              className="w-full object-cover rounded-2xl"
            />
            <div className='absolute inset-0 p-16 text-[#425A8B]'>
              <p>TRENDING NOW</p>
              <h1 className='text-5xl mt-2 font-bold'>Big Sale 25%</h1>
              <h1 className='text-6xl font-bold'>Laptop & Pc</h1>
              <p className='mt-6 w-[45%]'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsa repudiandae aliquid deleniti adipisci vitae harum officia, distinctio quasi, facilis labore est cupiditate.</p>
              <button className='mt-10 bg-orange-500 hover:bg-[#425A8B] text-white py-2 px-4 rounded-md'>Shop Now</button>
            </div>
            </div>
          </SwiperSlide>
          <SwiperSlide  >
            <div className='bg-[#F7E5D5] relative'>
              <img
              src={hero2}
              alt=''
              className="w-full object-cover rounded-2xl"
            />
            <div className='absolute inset-0 p-16 text-[#425A8B]'>
              <p>TOP SALE THIS MONTH</p>
              <h1 className='text-5xl mt-2 font-bold'>Hot Collection</h1>
              <h1 className='text-6xl font-bold'>Virtual Glasses</h1>
              <p className='mt-6 w-[45%]'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsa repudiandae aliquid deleniti adipisci vitae harum officia, distinctio quasi, facilis labore est cupiditate.</p>
              <button className='mt-10 bg-orange-500 hover:bg-[#425A8B] text-white py-2 px-4 rounded-md'>Shop Now</button>
            </div>
            </div>
            
          </SwiperSlide>
           <SwiperSlide  >
            <div className='bg-[#D4F7FF] relative'>
              <img
              src={hero3}
              alt=''
              className="w-full object-cover rounded-2xl"
            />
            <div className='absolute inset-0 p-16 text-[#425A8B]'>
              <p>TRENDING NOW</p>
              <h1 className='text-5xl mt-2 font-bold'>Big Sale 25%</h1>
              <h1 className='text-6xl font-bold'>Laptop & Pc</h1>
              <p className='mt-6 w-[45%]'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsa repudiandae aliquid deleniti adipisci vitae harum officia, distinctio quasi, facilis labore est cupiditate.</p>
              <button className='mt-10 bg-orange-500 hover:bg-[#425A8B] text-white py-2 px-4 rounded-md'>Shop Now</button>
            </div>
            </div>
            
          </SwiperSlide>
        </Swiper>
    </div>
        <div>
          <HotDeal/>
        </div>
      </div>
    </div>
  )
}

export default Hero