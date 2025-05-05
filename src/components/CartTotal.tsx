import {ShopContext} from '@/context/ShopContext'
import React, { useContext } from 'react'
import Title from './Title'

const CartTotal = () => {

    const {cartItems, products, currency,getCartAmount, delivery_fee} = useContext(ShopContext)

  return (
    <div className='w-full'>
        <div className='text-2xl'>
            <Title text1={'CART'} text2={'TOTALS'}/>
        </div>

        <div className='flex flex-col gap2 mt-2 text-sm'>
            <div className='flex justify-between py-2'>
                <p>Subtotal</p>
                <p>{currency}{getCartAmount()}.00</p>
            </div>
            <hr className='border-crimson'/>
            <div className='flex justify-between py-2'>
                <p>Shipping Fee</p>
                <p>{currency}{delivery_fee}</p>
            </div>
            <hr className='border-crimson' />
            <div className='flex justify-between py-2'>
                <p className='text-lg font-medium'>Total</p>
                <p className='text-lg font-medium text-crimson'>{currency}{getCartAmount() + delivery_fee}.00</p>
            </div>
        </div>
    </div>
  )
}

export default CartTotal