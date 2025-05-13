import {ShopContext} from '@/context/ShopContext'
import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'

const Verify = () => {

    const {navigate, token, setCartItems, backendUrl} = useContext(ShopContext)
    const [searchParams,setSearchParams] = useSearchParams()

    const success = searchParams.get('success')
    const orderId = searchParams.get('orderId')

    const verifyPayment = async () => {
        try {
            if (!token) {
                return null
            }
            const response = await axios.post(backendUrl + '/api/order/verifyStripe', {
                orderId: orderId,
                success: success
            }, {
                headers: {
                    token
                }
            })

            if (response.status === 200 && success === 'true') {
                setCartItems({})
                navigate('/orders')
            } else {
                navigate('/cart')
                console.error("Error verifying payment:", response.data.message);
            }
        } catch (error) {
            console.log("Error verifying payment:", error);
            toast.error("Error verifying payment")
            navigate('/cart')
        }
    }

    useEffect(() => {
        verifyPayment()
    },[token])

  return (
    <div>
        
    </div>
  )
}

export default Verify