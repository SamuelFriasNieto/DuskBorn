import Title from '@/components/Title'
import {ShopContext} from '@/context/ShopContext'
import axios from 'axios'
import React, { use, useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const Orders = () => {

  const {backendUrl, token, currency, getCartAmount, delivery_fee} = useContext(ShopContext)

  const [orderData, setOrderData] = useState<any[]>([])

  const loadOrders = async () => {
    try {
      if (!token) {
        return null
      }

      const response = await axios.post(backendUrl + '/api/order/userorders',{}, {
        headers: {
          token
        }
      })
      console.log(response.data)

      if(response.status === 200) {
        let allOrdersItem: any[] = []
        response.data.orders.map((order:any) => {
          order.items.map((item:any) => {
            item['status'] = order.status
            item['payment'] = order.payment
            item['paymentMethod'] = order.paymentMethod
            item['date'] = order.date
            allOrdersItem.push(item)
          })
        })

        setOrderData(allOrdersItem)
      } else {
        console.error("Error fetching orders:", response.data.message);
        toast.error("Error fetching orders")
      }

    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Error fetching orders")
    }
  }

  useEffect(() => {
    loadOrders()
  },[token])

  return (
    <div className='pt-16 mx-10 sm:mx-15'>
      <div className='text-2xl'>
        <Title text1={'MY'} text2={'ORDERS'}/>
      </div>

      <div>
        {
          orderData.map((item, index)=> (
            <div key={index} className='py-4 border-b border-crimson flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
              <div className='flex items-start gap-6 text-sm'>
                <img className='w-16 sm:w-25' src={item.image[0]} alt="" />
                <div>
                  <p className='sm:text-base font-medium text-crimson'>{item.name}</p>
                  <div className='flex items-center gap-3 mt-2 text-base text-broken-white'>
                    <p className='text-lg'>{currency}{item.price}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Size: {item.size}</p>
                  </div>
                  <p className='mt-2'>Date: <span className='text-crimson'>{new Date(item.date).toDateString()}</span></p>
                  <p className='mt-2'>Payment: <span className='text-crimson'>{item.paymentMethod}</span></p>
                </div>
              </div>
              <div className='md:w-1/2 flex justify-between'>
                <div className='flex items-center gap-2'>
                  <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                  <p className='text-lg text-crimson'>{item.status}</p>
                </div>
                <button onClick={loadOrders} className='border border-crimson bg-crimson text-black px-4 py-2 text-sm font-medium hover:bg-midnight hover:text-broken-white transition-all cursor-pointer'>Track Order</button>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Orders
