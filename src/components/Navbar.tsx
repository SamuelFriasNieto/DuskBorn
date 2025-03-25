import React, { useEffect, useState, useRef } from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);

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
      <div className='borderNav flex items-center justify-between mb-5 h-16 border-crimson border-b-1 relative ' >
        <div className='flex items-center gap-10 pl-15 z-1'>
          <h1 className='text-2xl font-light font-gloock'>Dusk<b className='text-crimson font-bold'>Born</b></h1>

          <div className='flex items-center gap-5'>
            <svg className='text-broken-white cursor-pointer' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" width="24" height="24" stroke-width="1"> <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0"></path> <path d="M21 21l-6 -6"></path> </svg>

            <div ref={dropdownRef} className='group relative cursor-pointer'>
              <svg onClick={() => setOpenDropdown(!openDropdown)} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" ><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" /><path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" /></svg>
              <div className={`${openDropdown ? 'block' : 'hidden'} absolute dropdown-menu -right-15 pt-4`}>
                <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-black/80 text-broken-white rounded'>
                  <p className='cursor-pointer hover:text-crimson hover:brightness-150'>My Profile</p>
                  <p className='cursor-pointer hover:text-crimson hover:brightness-150'>Orders</p>
                  <p className='cursor-pointer hover:text-crimson hover:brightness-150'>Logout</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <button onClick={() => setIsOpen(!isOpen)} className={`cursor-pointer lg:hidden flex flex-col h-[48px] w-9 gap-[10.4px] 
          justify-center mr-15 *:bg-crimson *:h-0.5 *:w-full *:rounded-sm *:transition-all *:duration-300 *:origin-left  z-1`}>
          <div className={`${isOpen ? 'rotate-45' : ''}`}></div>
          <div className={`${isOpen ? 'opacity-0' : ''}`}></div>
          <div className={`${isOpen ? '-rotate-45' : ''}`}></div>
        </button>

        <ul className='items-center text-sm h-full z-1 hidden lg:flex '>

          <NavLink to={'/contact'} className='flex flex-col items-center px-5 gap-1'>
            <p>CONTACT</p>
          </NavLink>
          <NavLink to={'/about'} className='flex flex-col items-center px-5 gap-1'>
            <p>ABOUT</p>
          </NavLink>
          <NavLink to={'/about'} className='flex flex-col items-center px-5 gap-1'>
            <p>COLLECTION</p>
          </NavLink>
          <NavLink to={'/cart'} className=' flex flex-col items-center gap-1 px-5 h-full justify-center border-crimson border-l-1'>
            <p>CART (0)</p>
          </NavLink>
          <NavLink to={'/login'} className='flex flex-col items-center gap-1 px-15 pr h-full justify-center bg-crimson'>
            <p>LOGIN</p>
          </NavLink>
        </ul>


      </div>
  )
}

export default Navbar
