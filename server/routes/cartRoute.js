import express from 'express';
import { addToCart, updateCart, getUserCart } from '../controllers/cartController.js';
import authUser from '../middleware/auth.js';

const cartRouter = express.Router();
// Route to add an item to the cart
cartRouter.post('/add',authUser, addToCart);
// Route to update the cart
cartRouter.post('/update',authUser, updateCart);
// Route to get the user's cart
cartRouter.get('/get',authUser, getUserCart);
// Export the router
export default cartRouter;