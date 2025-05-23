import userModel from "../models/userModel.js"
import orderModel from "../models/orderModel.js"
import productModel from "../models/productModel.js"
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const currency = 'eur'
const deliveryCharge = 10


const placeOrder = async (req, res) => {
    try {
        const {userId, items, amount, address} = req.body
        for(const item of items) {
            const product = await productModel.findById(item.id)
            if(product.stock[item.size] < item.quantity) {
                return res.status(400).json({message: `${product.name} is out of stock. Remaining stock is ${product.stock[item.size]}`})
            }
        }
        for(const item of items) {
            await productModel.findByIdAndUpdate(item.id, {
                $inc: {
                    [`stock.${item.size}`]: -item.quantity
                }
            })
        }
        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod: 'COD',
            payment: false,
            date: Date.now()
        }
        const newOrder = new orderModel(orderData)
        await newOrder.save()
        const userData = await userModel.findByIdAndUpdate(userId, {cartData: {}})

        res.status(200).json({message: "Order placed successfully"})

    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Internal server error"})
    }
}

const placeOrderStripe = async (req, res) => {
    try {
        const {userId, items, amount, address} = req.body
        const {origin} = req.headers
        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod: 'Stripe',
            payment: true,
            date: Date.now()
        }
        const newOrder = new orderModel(orderData)
        await newOrder.save()

        const line_items = items.map((item) => ({
            price_data: {
                currency:currency,
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100
            },
            quantity: item.quantity
            
        }))

        line_items.push({
            price_data: {
                currency:currency,
                product_data: {
                    name: 'Delivery Charge'
                },
                unit_amount: deliveryCharge * 100
            },
            quantity: 1
        })

        const session = await stripe.checkout.sessions.create({
            line_items,
            mode: 'payment',
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
        })

        res.status(200).json({session_url: session.url})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Internal server error"})
    }
}

const verifyStripe = async (req, res) => {
    const {orderId, success, userId} = req.body

    try {
        if(success === 'true') {
            await orderModel.findByIdAndUpdate(orderId, {payment: true})
            await userModel.findByIdAndUpdate(userId, {cartData: {}})
            res.status(200).json({message: "Payment successful"})
        } else {
            await orderModel.findByIdAndDelete(orderId)
            res.status(200).json({message: "Payment failed"})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Internal server error"})
    }
}

const allOrders = async (req, res) => {
    try {
        const orders = await orderModel.find()
        res.status(200).json({orders})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Internal server error"})
    }
}

const userOrders = async (req, res) => {
    try {
        const {userId} = req.body
        const orders = await orderModel.find({userId})
        res.status(200).json({orders})
    } catch (error) {
        console.log(error)
    }
}

const updateStatus = async (req, res) => {
    try {
        
        const {orderId, status} = req.body
        const orderData = await orderModel.findByIdAndUpdate(orderId, {status})
        res.status(200).json({message: "Order status updated"})

    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Internal server error"})
    }
}


export {
    placeOrder,
    placeOrderStripe,
    allOrders,
    userOrders,
    updateStatus,
    verifyStripe
}