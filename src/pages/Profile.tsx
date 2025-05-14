import {ShopContext} from "@/context/ShopContext";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { LuUserRound } from "react-icons/lu";
import { toast } from "react-toastify";

const Profile = () => {

    const {navigate, setToken, setCartItems, token, backendUrl} = useContext(ShopContext)
    const [name, setName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const getUserData = async () => {
        if (!token) {
            navigate('/login')
        }
        const response = await axios.post(backendUrl + '/api/user/get', {}, {
            headers: {
                token
            }
        })
        if (response.status === 200) {
            console.log(response.data);
            setName(response.data.name)
            setEmail(response.data.email)
        } else {
            console.error("Error fetching user data:", response.data.message);
            toast.error("Error fetching user data")
        }
    }

    const saveChanges = async () => {
        try {
            if (!token) {
                return null
            }
            const response = await axios.post(backendUrl + '/api/user/update', {
                name: name,
                email: email,
                password: password
            }, {
                headers: {
                    token
                }
            })
            if (response.status === 200) {
                console.log(response.data);
                setName('')
                setEmail('')
                setPassword('')
                toast.success("Profile updated successfully")
            } else {
                console.error("Error updating profile:", response.data.message);
                toast.error("Error updating profile")
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            toast.error("Error updating profile")
        }
    }

    const logout = () => {
        navigate('/login')
        localStorage.removeItem('token')
        setToken('')
        setCartItems({})
    }

    useEffect(() => {
        getUserData()
    },[token])

  return (
    <div className="flex flex-col items-start pt-16 w-[30%] mx-auto min-w-[300px]">
      <div className="flex items-center justify-start gap-2 mb-5">
        <div onClick={() => navigate('/')} className="flex gap-2 items-center cursor-pointer hover:text-crimson transition-all">
          <FaArrowLeft />
          <p className="text-xs">Back</p>
        </div>
        <h1 className="ml-2 text-lg font-medium">Mi profile</h1>
      </div>
      <div className=" border border-crimson w-full p-5 mb-5 flex flex-col gap-5 bg-ashen-grey shadow-[5px_5px_10px] shadow-crimson/50">
        <div className="flex items-center gap-2 text-crimson">
          <LuUserRound size={20} />
          <h2 className="text-2xl font-bold">Personal Data</h2>
        </div>
        <div>
          <p className="mb-2">Name</p>
          <input value={name} onChange={(e) => setName(e.target.value)}
            className="w-full border border-crimson px-5 py-2"
            type="text"
            placeholder={name}
          />
        </div>
        <div>
          <p className="mb-2">Email</p>
          <input value={email} onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-crimson px-5 py-2"
            type="email"
            placeholder={email}
          />
        </div>
        <div className="mb-5">
          <p className="mb-2">Password</p>
          <input value={password} onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-crimson px-5 py-2"
            type="password"
            placeholder="New Password"
          />
        </div>
        <button onClick={() => saveChanges()} className="border border-crimson bg-crimson px-5 py-2 hover:bg-ashen-grey transition-all cursor-pointer">
          Save Changes
        </button>
      </div>
      <p onClick={() => logout()} className="text-center w-full opacity-75 cursor-pointer">Logout</p>
    </div>
  );
};

export default Profile;
