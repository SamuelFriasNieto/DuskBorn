import React from 'react'

interface NavbarProps {
  setToken: (token: string) => void;
}

const Navbar = ({setToken}:NavbarProps) => {
  return (
    <div className='flex items-center py-2 px-[4%] justify-between border-b border-crimson'>
        <h1 className='text-2xl font-light font-gloock'>Dusk<b className='text-crimson font-bold'>Born</b></h1>
        <button onClick={() => setToken('')} className='bg-crimson text-black px-5 py-2 sm:px-7 text-xs sm:text-sm cursor-pointer border border-crimson hover:bg-midnight hover:text-broken-white transition-all'>Logout</button>
    </div>
  )
}

export default Navbar