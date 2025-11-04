import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import image1 from '../assets/blog-1.jpg'
import image2 from '../assets/blog-2.jpg'
import image3 from '../assets/blog-3.jpg'
import image4 from '../assets/blog-4.jpg'
import image5 from '../assets/blog-5.jpg'
import deliver from '../assets/delivery.svg'
import support from '../assets/support.svg'
import secure from '../assets/secure.svg'
import voucher from '../assets/voucher.svg'
const LatestNews = () => {
  return (
    <div className="container mx-auto text-[#425A8B] my-8 md:my-14 px-3 md:px-18 ">
        <h2 className='text-3xl font-bold'>Latest News & Events</h2>
        <p className='mb-8'>From our blog, forum</p>
        <hr className=' text-gray-200 mb-8 bg-gray-300' />
          <Swiper
          modules={[Autoplay]}
          spaceBetween={40}
          breakpoints={{
            320: { slidesPerView: 2 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
          autoplay={{ delay: 3000}}
          loop={true}
        > 
          <SwiperSlide >
            <img src={image1} alt="" />
            <div className='flex gap-2 items-center w-fit px-3 py-1 mt-4 rounded-md bg-[#516da566]'><div className='w-2 h-2 rounded-full bg-[#29509f]'></div> <p>Development</p></div>
            <h1 className='md:text-2xl text-lg line-clamp-2 mt-3 font-bold text-gray-700'>HTML5- The Future of Web App Development</h1>
            <div className='flex gap-5'><p>September 02, 2025</p> <p>4 mins read</p></div>
          </SwiperSlide>
          <SwiperSlide>
            <img src={image2} alt="" />
           <div className='flex gap-2 items-center w-fit px-3 py-1 mt-4 rounded-md bg-[#516da566]'><div className='w-2 h-2 rounded-full bg-[#29509f]'></div> <p>Technology</p></div>
            <h1 className='md:text-2xl text-lg line-clamp-2 mt-3 font-bold text-gray-700'>The latest technologies to be used for VR in 2025</h1>
            <div className='flex gap-5'><p>September 02, 2025</p> <p>4 mins read</p></div>
          </SwiperSlide>
          <SwiperSlide>
            <img src={image3} alt="" />
            <div className='flex gap-2 items-center w-fit px-3 py-1 mt-4 rounded-md bg-[#516da566]'><div className='w-2 h-2 rounded-full bg-[#29509f]'></div> <p>Gaming</p></div>
            <h1 className='md:text-2xl text-lg line-clamp-2 mt-3 font-bold text-gray-700'>The Rise of Cloud Gaming in 2025</h1>
            <div className='flex gap-5'><p>September 02, 2025</p> <p>4 mins read</p></div>

          </SwiperSlide>
          <SwiperSlide>
            <img src={image4} alt="" />
            <div className='flex gap-2 items-center w-fit px-3 py-1 mt-4 rounded-md bg-[#516da566]'><div className='w-2 h-2 rounded-full bg-[#29509f]'></div> <p>Blockchain</p></div>
            <h1 className='md:text-2xl text-lg line-clamp-2 mt-3 font-bold text-gray-700'>Exploring the Impact of Blockchain Technology</h1>
            <div className='flex gap-5'><p>September 02, 2025</p> <p>4 mins read</p></div>
          </SwiperSlide>
          <SwiperSlide>
            <img src={image5} alt="" />
            <div className='flex gap-2 items-center w-fit px-3 py-1 mt-4 rounded-md bg-[#516da566]'><div className='w-2 h-2 rounded-full bg-[#29509f]'></div> <p>Technology</p></div>
            <h1 className='md:text-2xl text-lg line-clamp-2 mt-3 font-bold text-gray-700'>The latest technologies to be used for VR in 2025</h1>
            <div className='flex gap-5'><p>September 02, 2025</p> <p>4 mins read</p></div>
          </SwiperSlide>
        </Swiper>
        <div className='grid grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-10 xl:mt-26 mb-8'>
          <div className='flex gap-4 border-gray-200 border rounded-md px-2 py-3 h-20'> <img src={deliver} className='w-10'  alt="" /><div><p className='font-semibold text-sm md:text-xl'>Free Delivery</p><p className='text-gray-400 md:text-sm text-xs'>From all orders over $10</p></div></div>
          <div  className='flex gap-4 border-gray-200 border rounded-md px-2 py-3 h-20'> <img src={support} className='w-10'   alt="" /><div><p className='font-semibold text-sm md:text-xl'>24/7 Support</p><p className='text-gray-400 md:text-sm text-xs'>Shop with an expert</p></div></div>
          <div className='flex gap-4 border-gray-200 border rounded-md px-2 py-3 h-20'> <img src={secure} className='w-10' alt="" /><div><p className='font-semibold text-sm md:text-xl'>Secure Payments</p><p className='text-gray-400 md:text-sm text-xs'>Shop with confidence</p></div></div>
          <div className='flex gap-4 border-gray-200 border rounded-md px-2 py-3 h-20'> <img src={voucher} className='w-10' alt="" /><div><p className='font-semibold text-sm md:text-xl'>Discount Vouchers</p><p className='text-gray-400 md:text-sm text-xs'>Get the best deals</p></div></div>
         </div>
         <div className='bg-[#0E224D] p-4 h-56 box-4'>
          <h1 className='md:text-4xl text-xl md:text-start text-center  md:mt-14 md:ml-10 font-bold text-white'>Subscrible & Get <span className='text-yellow-600'>10%</span> Discount</h1>
           <p className='md:text-xl text-xs font-semibold text-white ml-10'>Get E-mail updates about our latest shop and special offers.</p>
          </div>
        </div>
  )
}

export default LatestNews