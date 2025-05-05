import React, { useEffect, useState, useRef, useContext } from 'react'
import {Link, NavLink } from 'react-router-dom'
import { IoBagHandleOutline  } from "react-icons/io5";
import {ShopContext} from '@/context/ShopContext';


const Navbar = () => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const {showSearch, setShowSearch, getCartCount} = useContext(ShopContext)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(false);
      }
    };

    if (openDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openDropdown]);

  return (
    <div>
      <div className='borderNav flex items-center justify-between h-16 border-crimson border-b-1 relative ' >
        <div className='flex items-center gap-10 pl-15'>
          <Link to={'/'}><h1 className='text-2xl font-light font-gloock'>Dusk<b className='text-crimson font-bold'>Born</b></h1></Link>


        </div>

        <button onClick={() => setIsOpen(!isOpen)} className={` cursor-pointer lg:hidden flex flex-col h-[48px] w-9 gap-[10.4px] 
          justify-center mr-15 *:h-0.5 *:w-full *:rounded-sm *:transition-all *:duration-400 *:origin-left  z-2 ${isOpen ? '*:bg-ashen-grey' : '*:bg-crimson'}`}>
          <div className={`${isOpen ? 'rotate-45' : ''}`}></div>
          <div className={`${isOpen ? 'opacity-0' : ''}`}></div>
          <div className={`${isOpen ? '-rotate-45' : ''}`}></div>
        </button>

        <ul className='items-center text-sm h-full  hidden lg:flex '>
          <div className='flex items-center gap-5 mr-5'>
              <svg onClick={()=> setShowSearch(!showSearch)} className='text-broken-white cursor-pointer' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" width="24" height="24" stroke-width="1.6"> <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0"></path> <path d="M21 21l-6 -6"></path> </svg>

              <div ref={dropdownRef} className='group relative cursor-pointer'>
                <svg onClick={() => setOpenDropdown(!openDropdown)} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" ><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" /><path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" /></svg>
                <div className={`${openDropdown ? 'block' : 'hidden'} absolute dropdown-menu -right-15 pt-4 z-10`}>
                  <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-ashen-grey/80 text-broken-white rounded'>
                    <p className='cursor-pointer hover:text-crimson hover:brightness-160'>My Profile</p>
                    <p className='cursor-pointer hover:text-crimson hover:brightness-160'>Orders</p>
                    <p className='cursor-pointer hover:text-crimson hover:brightness-160'>Logout</p>
                  </div>
                </div>
              </div>
              <Link to={'/cart'} className='relative'>
                <IoBagHandleOutline size={24} className=''/>
                <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-broken-white aspect-square rounded-full text-[8px]'>{getCartCount()}</p>
              </Link>
            </div>
          <NavLink to={'/collection'} className='flex flex-col items-center px-5 gap-1 h-full justify-center border-crimson border-l-1 hover:text-crimson-bright'>
            <p>COLLECTION</p>
          </NavLink>
          <NavLink to={'/login'} className='flex flex-col items-center gap-1 px-15 pr h-full justify-center bg-crimson hover:text-midnight'>
            <p>LOGIN</p>
          </NavLink>
        </ul>

      </div>
      <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-ashen-grey bg-brightness-125 transition-all z-1 duration-400 ${isOpen ? 'w-full' : 'w-0'}`}>
          <div className='flex flex-col text-broken-white'>
            <NavLink onClick={() => setIsOpen(false)} className='py-[1.2rem] pl-6 border-b bg-crimson hover:text-ashen-grey border-crimson' to={'/'}>HOME</NavLink>
            <NavLink onClick={() => setIsOpen(false)} className='py-2 pl-6 border-b border-crimson hover:text-crimson-bright' to={'/collection'}>COLLECTION</NavLink>
            <NavLink onClick={() => setIsOpen(false)} className='py-2 pl-6 border-b border-crimson hover:text-crimson-bright' to={'/login'}>LOGIN</NavLink>
          </div>
        </div>
    </div>
  )
}

export default Navbar
