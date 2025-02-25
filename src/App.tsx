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

const App = () => {
  return (
    <div className='font-nm px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]  bg-midnight h-screen w-screen text-broken-white'>
      <Navbar/>
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
      </Routes>
    </div>
  )
}

export default App
