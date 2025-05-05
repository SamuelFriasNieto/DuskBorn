import CartTotal from '@/components/CartTotal'
import Title from '@/components/Title'
import {ShopContext} from '@/context/ShopContext';
import React, { use, useContext, useState } from 'react'
import { FaStripe } from "react-icons/fa";


const PlaceOrder = () => {

  const [method, setMethod] = useState("stripe")
  const {navigate} =useContext(ShopContext)

  return (
    <div className='flex flex-col sm:flex-row justify-between gap-2 pt-5 sm:pt-14 min-h-[80vh] mx-15'>
      <div className='flex flex-col gap-2 w-full sm:max-w-[480px]'>
        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'DELIVERY'} text2={'INFORMATION'}/>
        </div>
        <div className='flex gap-3'>
          <input className='border border-crimson-bright px-3 py-2 w-full' type="text" placeholder='First Name' />
          <input className='border border-crimson-bright px-3 py-2 w-full' type="text" placeholder='Last Name' />
        </div>
        <input className='border border-crimson-bright px-3 py-2 w-full' type="email" placeholder='Email' />
        <input className='border border-crimson-bright px-3 py-2 w-full' type="text" placeholder='Street' />
        <div className='flex gap-3'>
          <input className='border border-crimson-bright px-3 py-2 w-full' type="text" placeholder='City' />
          <input className='border border-crimson-bright px-3 py-2 w-full' type="text" placeholder='State' />
        </div>
        <div className='flex gap-3'>
          <input className='border border-crimson-bright px-3 py-2 w-full' type="number" placeholder='Zipcode' />
          <input className='border border-crimson-bright px-3 py-2 w-full' type="text" placeholder='Country' />
        </div>
        <input className='border border-crimson-bright px-3 py-2 w-full' type="number" placeholder='Phone' />
      </div>

      <div className='mt-8'>
        <div className='mt-8 min-w-80'>
          <CartTotal />
        </div>

        <div className='mt-12'>
          <Title text1={'PAYMENT'} text2={'METHOD'}/>
          <div className='flex gap-3 flex-col lg:flex-row'>
            <div onClick={() => setMethod('stripe')} className='flex items-center gap-3 border border-crimson px-5 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border border-crimson rounded-full ${method === 'stripe' ? 'bg-crimson':''}`}></p>
              <FaStripe size={35} className='text-crimson mx-4' />
            </div>
            <div onClick={() => setMethod('cod')} className='flex items-center gap-3 border border-crimson px-5 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border border-crimson rounded-full ${method === 'cod' ? 'bg-crimson':''}`}></p>
              <p className='text-crimson text-sm font-medium mx-4'>CASH ON DELIVERY</p>
            </div>
          </div>
        </div>

        <div className='w-full text-end mt-5'>
          <button onClick={() => navigate('/orders')} className='bg-crimson text-black border border-crimson px-15 py-3 hover:bg-midnight hover:text-broken-white transition-all cursor-pointer'>PLACE ORDER</button>
        </div>
      </div>
    </div>
  )
}

export default PlaceOrder
