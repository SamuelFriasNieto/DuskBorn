import React, { useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../App'
import {toast} from 'react-toastify'

interface LoginProps {
    setToken: (token: string) => void;
}



const Login = ({setToken}: LoginProps) => {

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    console.log(backendUrl)


    const onSubmit = async (e: React.FormEvent) => {
        try {
            e.preventDefault();

            const response = await axios.post(backendUrl + '/api/user/admin', {
                email,
                password
            })

            console.log(response)

            if(response.status === 200) {
                setToken(response.data.token)
            } else {
                toast.error('Invalid credentials')
            }
        } catch (error: Error | any) {
            // Handle error
            console.error('Error during login:', error);
            toast.error(error.message)
        }
    }


  return (
    <div className='min-h-screen flex items-center justify-center bg-midnight w-full'>
        <div className='bg-ashen-grey shadow-[8px_8px_10px] shadow-crimson-dark/40 px-8 py-6 max-w-md'>
            <h1 className='text-2xl font-bold mb-4 text-crimson'>Admin Panel</h1>
            <form onSubmit={onSubmit}>
                <div className='mb-3 min-w-72'>
                    <p className='text-sm font-md mb-2'>Email Address</p>
                    <input onChange={(e) => setEmail(e.target.value)} className='w-full px-3 py-2 border border-crimson' type="email" placeholder='your@email.com' required/>
                </div>
                <div className='mb-3 min-w-72'>
                    <p>Password</p>
                    <input onChange={(e) => setPassword(e.target.value)} className='w-full px-3 py-2 border border-crimson' type="password" placeholder='Enter your password' required/>
                </div>
                <button className='mt-2 w-full border border-crimson bg-crimson text-black px-6 py-2 hover:bg-ashen-grey hover:text-broken-white cursor-pointer transition-all' type='submit'>Login</button>
            </form>
        </div>
    </div>
  )
}

export default Login