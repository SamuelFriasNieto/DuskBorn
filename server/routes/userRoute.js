import { register } from 'module';
import {loginUser, registerUser, adminLogin, updateUser, getUser, forgotPassword, resetPassword} from '../controllers/userController.js';
import express from 'express';
import authUser from '../middleware/auth.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/admin', adminLogin);
userRouter.post('/update',authUser, updateUser);
userRouter.post('/get',authUser, getUser);
userRouter.post('/forgotpassword', forgotPassword);
userRouter.post('/resetpassword', resetPassword);

export default userRouter;