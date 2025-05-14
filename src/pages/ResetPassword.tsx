import { ShopContext } from '@/context/ShopContext'
import axios from 'axios'
import React, { FormEvent, useContext } from 'react'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'

const ResetPassword = () => {

    const [password, setPassword] = React.useState('')
    const {backendUrl, navigate} = useContext(ShopContext)
    const [searchParams,setSearchParams] = useSearchParams()
    const token = searchParams.get('token')

    const onSubmitHandler = async (e:FormEvent) => {
        e.preventDefault()
        console.log(token)
        try {
            const response = await axios.post(backendUrl + '/api/user/resetpassword', {
                password: password,
                token: token
            })
            if (response.status === 200) {
                console.log(response.data);
                toast.success("Password reset successfully")
                navigate('/login')
            } else {
                console.error("Error resetting password:", response.data.message);
                toast.error("Error resetting password")
            }
        } catch (error) {
            console.error("Error resetting password:", error);
            toast.error("Error resetting password")
        }
    }

  return (
    <div>
      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-broken-white"
      >
        <div className="inline-flex items-center gap-2 mb-2 mt-10">
          <p className="text-3xl">Forgot Password</p>
          <hr className="border-none h-[1.5px] w-8 bg-crimson" />
        </div>
        <input
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 border border-crimson"
          type="password"
          name=""
          id=""
          placeholder="NewPassword"
          required
        />
        <button className="border border-crimson bg-crimson text-black px-8 py-2 mt-4 hover:bg-midnight hover:text-broken-white transition-all cursor-pointer">
            Change Password
        </button>
      </form>
    </div>
  )
}

export default ResetPassword