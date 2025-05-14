import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Collection from './pages/Collection'
import About from './pages/About'
import Login from './pages/Login'
import Contact from './pages/Contact'
import PlaceOrder from './pages/PlaceOrder'
import Orders from './pages/Orders'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SearchBar from './components/SearchBar'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Verify from './pages/Verify'
import Profile from './pages/Profile'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'

const App = () => {
  return (
    <div className='font-nm fondo bg-midnight min-h-screen overflow-hidden max-w-screen text-broken-white'>
      <ToastContainer  />
      <Navbar/>
      <SearchBar/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/collection' element={<Collection/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/place-order' element={<PlaceOrder/>} />
        <Route path='/orders' element={<Orders/>} />
        <Route path='/product/:productId' element={<Product/>} />
        <Route path='/cart' element={<Cart/>} />
        <Route path='/verify' element={<Verify/>} />
        <Route path='/profile' element={<Profile/>} />
        <Route path='/forgot-password' element={<ForgotPassword/>} />
        <Route path='/reset-password' element={<ResetPassword/>} />
      </Routes>
      <Footer/>
    </div>
  )
}

export default App
