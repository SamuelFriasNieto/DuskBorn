import React from 'react'
import { BiCalendarCheck } from "react-icons/bi";
import { MdVerified } from "react-icons/md";
import { FaHeadset } from "react-icons/fa6";



const OurPolicy = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-crimson'>
        <div>
            <BiCalendarCheck className='m-auto mb-5' size={50}/>
            <p className='font-semibold'>7 Days Return Policy</p>
            <p className='text-broken-white'>We offer hassle free exchange policy</p>
        </div>
        <div>
            <MdVerified className='m-auto mb-5' size={50}/>
            <p className='font-semibold'>Best Product Quality</p>
            <p className='text-broken-white'>Our products are made with the best quality resources</p>
        </div>
        <div>
            <FaHeadset className='m-auto mb-5' size={50}/>
            <p className='font-semibold'>Best Customer Support</p>
            <p className='text-broken-white'>We provide 24/7 customer support</p>
        </div>
    </div>
  )
}

export default OurPolicy