import CartTotal from '@/components/CartTotal'
import Title from '@/components/Title'
import {ShopContext} from '@/context/ShopContext';
import axios from 'axios';
import { get } from 'http';
import React, { use, useContext, useEffect, useState } from 'react'
import { FaStripe } from "react-icons/fa";
import { toast } from 'react-toastify';
import { date } from 'zod';


const PlaceOrder = () => {

  const [method, setMethod] = useState("cod")
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''
  })
  const {navigate, backendUrl, token, cartItems,setCartItems, getCartAmount,delivery_fee,products} =useContext(ShopContext)

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name
    const value = e.target.value

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const getUserData = async () => {
    try {
      const response = await axios.post(backendUrl + '/api/user/get', {}, {
        headers: {
          token
        }
      })
      console.log(response.data);
      if (response.status === 200) {
        setFormData({
          firstName: response.data.name,
          lastName: response.data.name,
          email: response.data.email,
          street: "",
          city: "",
          state: "",
          zipcode: "",
          country: "",
          phone: ""
        })
      } else {
        console.error("Error fetching user data:", response.data.message);
        toast.error("Error fetching user data")
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      toast.error("Error fetching user data")
    }
  }

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      let orderItems = []
      for (const items in cartItems) {
        for (const size in cartItems[items]) {
          if (cartItems[items][size] > 0) {
            const product = structuredClone(products.find((product) => product._id === items))
            orderItems.push({
              size: size,
              quantity: cartItems[items][size],
              price: product?.price,
              name: product?.name,
              image: product?.image,
              bestseller: product?.bestseller,
              category: product?.category,
              subCategory: product?.subCategory,
              date: product?.date,
              description: product?.description,
              id: product?._id,
            })
          }
        }
      }

      console.log(orderItems)

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      }

      switch (method) {
        case 'cod':

          const response = await axios.post(backendUrl + '/api/order/place', orderData, {
            headers: {
              token
            }
          })

          if(response.status === 200) {
            setCartItems({})
            navigate('orders')
            toast.success("Order placed successfully")
          } else {
            console.log(response.data.message)
            toast.error(response.data.message)
          }

        break;
          case 'stripe':
          const stripeResponse = await axios.post(backendUrl + '/api/order/stripe', orderData, {
            headers: {
              token
            }
          })

          if(stripeResponse.status === 200) {
            const {session_url} = stripeResponse.data
            window.location.replace(session_url)
          } else {
            console.log(stripeResponse.data.message)
            toast.error(stripeResponse.data.message)
          }
          break;
        default:
          break;
      }
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Error placing order")
    }
  }

  useEffect(() => {
    getUserData()
  },[token])


  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-2 pt-5 sm:pt-14 min-h-[80vh] mx-15'>
      <div className='flex flex-col gap-2 w-full sm:max-w-[480px]'>
        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'DELIVERY'} text2={'INFORMATION'}/>
        </div>
        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='firstName' value={formData.firstName} className='border border-crimson-bright px-3 py-2 w-full' type="text" placeholder='First Name' />
          <input required onChange={onChangeHandler} name='lastName' value={formData.lastName} className='border border-crimson-bright px-3 py-2 w-full' type="text" placeholder='Last Name' />
        </div>
        <input required onChange={onChangeHandler} name='email' value={formData.email} className='border border-crimson-bright px-3 py-2 w-full' type="email" placeholder='Email' />
        <input required onChange={onChangeHandler} name='street' value={formData.street} className='border border-crimson-bright px-3 py-2 w-full' type="text" placeholder='Street' />
        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='city' value={formData.city} className='border border-crimson-bright px-3 py-2 w-full' type="text" placeholder='City' />
          <input required onChange={onChangeHandler} name='state' value={formData.state} className='border border-crimson-bright px-3 py-2 w-full' type="text" placeholder='State' />
        </div>
        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='zipcode' value={formData.zipcode} className='border border-crimson-bright px-3 py-2 w-full' type="number" placeholder='Zipcode' />
          <input required onChange={onChangeHandler} name='country' value={formData.country} className='border border-crimson-bright px-3 py-2 w-full' type="text" placeholder='Country' />
        </div>
        <input required onChange={onChangeHandler} name='phone' value={formData.phone} className='border border-crimson-bright px-3 py-2 w-full' type="number" placeholder='Phone' />
      </div>

      <div className='mt-8'>
        <div className='mt-8 '>
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
              <p className='text-crimson text-sm font-medium mx-4 my-2'>CASH ON DELIVERY</p>
            </div>
          </div>
        </div>

        <div className='w-full text-end mt-5'>
          <button type='submit' className='w-full bg-crimson text-black border border-crimson px-15 py-3 hover:bg-midnight hover:text-broken-white transition-all cursor-pointer'>PLACE ORDER</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder
