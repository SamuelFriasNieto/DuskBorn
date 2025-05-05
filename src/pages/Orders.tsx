import Title from '@/components/Title'
import {ShopContext} from '@/context/ShopContext'
import React, { useContext } from 'react'

const Orders = () => {

  const {products, currency, getCartAmount, delivery_fee} = useContext(ShopContext)

  return (
    <div className='pt-16 mx-15'>
      <div className='text-2xl'>
        <Title text1={'MY'} text2={'ORDERS'}/>
      </div>

      <div>
        {
          products.slice(1,4).map((item, index)=> (
            <div key={index} className='py-4 border-b border-crimson flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
              <div className='flex items-start gap-6 text-sm'>
                <img className='w-16 sm:w-25' src={item.image[0]} alt="" />
                <div>
                  <p className='sm:text-base font-medium text-crimson'>{item.name}</p>
                  <div className='flex items-center gap-3 mt-2 text-base text-broken-white'>
                    <p className='text-lg'>{currency}{item.price}</p>
                    <p>Quantity: 1</p>
                    <p>Size: M</p>
                  </div>
                  <p className='mt-2'>Date: <span className='text-crimson'>25, Jul, 2025</span></p>
                </div>
              </div>
              <div className='md:w-1/2 flex justify-between'>
                <div className='flex items-center gap-2'>
                  <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                  <p className='text-lg text-crimson'>Ready to ship</p>
                </div>
                <button className='border border-crimson bg-crimson text-black px-4 py-2 text-sm font-medium hover:bg-midnight hover:text-broken-white transition-all cursor-pointer'>Track Order</button>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Orders
