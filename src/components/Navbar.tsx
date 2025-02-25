import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div>
      <div className='flex items-center justify-between mb-5  h-16  ' >
        <div className='flex items-center gap-10'>
          <h1 className='text-2xl font-light font-gloock'>Dusk<b className='text-crimson font-bold'>Born</b></h1>

          <div className='flex items-center gap-5'>
            <svg className='text-broken-white' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" width="24" height="24" stroke-width="1"> <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0"></path> <path d="M21 21l-6 -6"></path> </svg>

            <div className='group relative'>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" ><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" /><path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" /></svg>
            </div>
          </div>
        </div>

        <ul className='hidden sm:flex items-center text-sm h-full'>

          <NavLink to={'/contact'} className='flex flex-col items-center px-5 gap-1'>
            <p>CONTACT</p>
          </NavLink>
          <NavLink to={'/about'} className='flex flex-col items-center px-5 gap-1'>
            <p>ABOUT</p>
          </NavLink>
          <NavLink to={'/about'} className='flex flex-col items-center px-5 gap-1'>
            <p>COLLECTION</p>
          </NavLink>
          <hr className='w-[1.5px] h-2/3 bg-crimson border-none' />
          <NavLink to={'/cart'} className='flex flex-col items-center gap-1 px-5 h-full justify-center'>
            <p>CART (0)</p>
          </NavLink>
          <NavLink to={'/login'} className='flex flex-col items-center gap-1 px-15 pr h-full justify-center bg-crimson'>
            <p>LOGIN</p>
          </NavLink>
        </ul>

      </div>
      <hr className='w-3/4 h-[1px] bg-crimson border-none m-auto' />

    </div>

  )
}

export default Navbar
