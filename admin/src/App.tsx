import React, { useEffect, useState } from 'react' 
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import {Route, Routes} from 'react-router-dom'
import Add from './pages/Add'
import List from './pages/List'
import Orders from './pages/Orders'
import Login from './pages/Login'
import { ToastContainer } from 'react-toastify'


export const backendUrl = import.meta.env.VITE_BACKEND_URI
export const currency = '$'

const App = () => {

  const [token, setToken] = useState<string>(localStorage.getItem('token') || '')

  useEffect(() => {
    localStorage.setItem('token', token)
  },[token])



  return (
    <div className='font-sm bg-midnight min-h-screen  max-w-screen text-broken-white '>
      <ToastContainer />
      { token === ''
      ? <Login setToken={setToken}/>
      :
      <>
        <Navbar setToken={setToken} />
        <div className='relative flex w-full h-full'>
          <Sidebar/>
          <div className='w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-broken-white text-base'>
            <Routes>
              <Route path='/add' element={<Add token={token}/>} />
              <Route path='/list' element={<List token={token}/>} />
              <Route path='/orders' element={<Orders token={token}/>} />
            </Routes>
          </div>
        </div>
      </>
      }
      
    </div>
  )
}

export default App