import {ShopContext} from "@/context/ShopContext";
import axios from "axios";
import React, { FormEvent, useContext, useState } from "react";
import { toast } from "react-toastify";

const ForgotPassword = () => {

    const [email, setEmail] = useState<string>("");
    const {backendUrl} = useContext(ShopContext)

    const onSubmitHandler = async (e:FormEvent) => {
        e.preventDefault();
        console.log(backendUrl)
        try {
            
            const response = await axios.post(backendUrl + '/api/user/forgotpassword', {
                email: email
            })
    
            if (response.status === 200) {
                console.log(response.data);
                toast.success("Password reset link sent to your email")
            } else {
                console.error("Error sending password reset link:", response.data.message);
                toast.error("Error sending password reset link")
            }
        } catch (error) {
            console.log("Error sending password reset link:", error);
            toast.error("Error sending password reset link")
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
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border border-crimson"
          type="email"
          name=""
          id=""
          placeholder="Email"
          required
        />
        <button className="border border-crimson bg-crimson text-black px-8 py-2 mt-4 hover:bg-midnight hover:text-broken-white transition-all cursor-pointer">
            Send Reset Link
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
