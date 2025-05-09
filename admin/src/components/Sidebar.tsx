import React from 'react'
import { NavLink } from 'react-router-dom'
import { IoIosAddCircleOutline } from "react-icons/io";
import { BsClipboardCheck } from "react-icons/bs";



const Sidebar = () => {
  return (
    <div className='w-[18%] min-h-screen border-r-2 border-crimson'>
        <div className='flex flex-col gap-4 pt-6 pl-[20%] text-[15px]'>
            <NavLink className='flex items-center gap-3 border border-crimson border-r-0 px-3 py-2 ' to={'/add'}>
                <IoIosAddCircleOutline className='text-crimson ac' size={30}/>
                <p className='hidden md:block'>Add Items</p>
            </NavLink>
            <NavLink className='flex items-center gap-3 border border-crimson border-r-0 px-3 py-2 ' to={'/list'}>
                <BsClipboardCheck className='text-crimson ac' size={30}/>
                <p className='hidden md:block'>List Items</p>
            </NavLink>
            <NavLink className='flex items-center gap-3 border border-crimson border-r-0 px-3 py-2 ' to={'/orders'}>
                <BsClipboardCheck className='text-crimson ac' size={30}/>
                <p className='hidden md:block'>Orders</p>
            </NavLink>
        </div>
    </div>
  )
}

export default Sidebar