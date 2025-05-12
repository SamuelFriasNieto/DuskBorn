import userModel from "../models/userModel.js"


const addToCart = async (req, res) => {
    const {userId, itemId, size} = req.body

    try {
        const userData = await userModel.findById(userId)
        const cartData = await userData.cartData
        if(cartData[itemId]) {
            if(cartData[itemId][size]) {
                cartData[itemId][size] += 1
            } else {
                cartData[itemId][size] = 1
            }
        } else {
            cartData[itemId] = {}
            cartData[itemId][size] = 1
        }

        await userModel.findByIdAndUpdate(userId, {cartData})

        res.status(200).json({message: "Item added to cart"})
    } catch (error) {
        res.status(500).json({message: "Internal server error"})
        console.log(error)
    }

    
}

const updateCart = async (req, res) => {
    try {
        const {userId, itemId, size, quantity} = req.body

        const userData = await userModel.findById(userId)
        const cartData = await userData.cartData

        cartData[itemId][size] = quantity

        await userModel.findByIdAndUpdate(userId, {cartData})
        res.status(200).json({message: "Cart updated"})
    } catch (error) {
        res.status(500).json({message: "Internal server error"})
        console.log(error)
    }
}

const getUserCart = async (req, res) => {
    try {
        const {userId} = req.body
        const userData = await userModel.findById(userId)
        const cartData = await userData.cartData
        res.status(200).json({cartData})
    } catch (error) {
        res.status(500).json({message: "Internal server error"})
        console.log(error)
    }
}

export {
    addToCart,
    updateCart,
    getUserCart}