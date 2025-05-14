import {ShopContext} from '@/context/ShopContext'
import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {

  const [currentState, setCurrentState] = useState<string>("Login")
  const {token, setToken, navigate, backendUrl} = useContext(ShopContext)
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [name, setName] = useState<string>("")


  const onSubmitHandler = async (event: any) => {
    event.preventDefault()

    try {
      if(currentState === 'Login') {
        await axios.post(backendUrl + '/api/user/login', {
          email,
          password
        }).then((res) => {
          if (res.status === 200) {
            setToken(res.data.token)
            console.log(res)
            localStorage.setItem('token', res.data.token)
            navigate('/')
          } else {
            toast.error('invalid credentials')
          }
        })
      } else {
        axios.post(backendUrl + '/api/user/register', {
          name,
          email,
          password
        }).then((res) => {
          if (res.status === 201) {
            console.log(res)
            setToken(res.data.token)
            localStorage.setItem('token', res.data.token)
            navigate('/')
          } else {
            toast.error(res.data.message)
          }
        })
      }
    } catch (error) {
      console.log(error)
      toast.error("Invalid credentials")
    }
  }

  useEffect(() => {
    if(token) {
      navigate('/')
    }
  },[token])


  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-broken-white'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='text-3xl'>{currentState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-crimson'/>
      </div>
      {currentState === 'Login' ? '' : <input onChange={(e) => setName(e.target.value)} className='w-full px-3 py-2 border border-crimson' type="text" name="" id="" placeholder='Name' required/>}
      <input onChange={(e) => setEmail(e.target.value)} className='w-full px-3 py-2 border border-crimson' type="email" name="" id="" placeholder='Email' required/>
      <input onChange={(e) => setPassword(e.target.value)} className='w-full px-3 py-2 border border-crimson' type="password" name="" id="" placeholder='Password' required/>
      <div className='w-full flex justify-between text-sm mt-[-8px]'>
        <p onClick={()=> navigate('/forgot-password')} className='cursor-pointer'>Forgot your password?</p>
        {
        currentState === 'Login' ? 
        <p onClick={() => setCurrentState('Sign Up')} className='cursor-pointer'>Create Account</p>
        : <p onClick={() => setCurrentState('Login')} className='cursor-pointer'>Login Here</p>

      }
      </div>
      <button className='border border-crimson bg-crimson text-black px-8 py-2 mt-4 hover:bg-midnight hover:text-broken-white transition-all cursor-pointer'>{currentState === 'Login' ? 'Sign In' : 'Sign Up'}</button>
      
    </form>
  )
}

export default Login
