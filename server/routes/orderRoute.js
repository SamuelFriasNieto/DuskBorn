import express from 'express';
import {    placeOrder,
    placeOrderStripe,
    allOrders,
    userOrders,
    updateStatus,verifyStripe} from '../controllers/orderController.js';

import authUser from '../middleware/auth.js';
import adminAuth from '../middleware/adminAuth.js';

const orderRouter = express.Router();

orderRouter.post('/list',adminAuth,allOrders)
orderRouter.post('/status',adminAuth,updateStatus)

orderRouter.post('/place',authUser,placeOrder)
orderRouter.post('/stripe',authUser,placeOrderStripe)

orderRouter.post('/userorders',authUser,userOrders)

orderRouter.post('/verifystripe',authUser,verifyStripe)

// Export the router
export default orderRouter;
