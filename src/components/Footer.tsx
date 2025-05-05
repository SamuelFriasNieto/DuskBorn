import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14  mt-30 text-sm p-15 border-t border-crimson-dark '>
        <div className='border-r border-crimson-dark'>
            <Link to={'/'}><h1 className='mb-5 text-2xl font-light font-gloock'>Dusk<b className='text-crimson font-bold'>Born</b></h1></Link>
            <p className='leading-6 w-full md:w-2/3 text-broken-white'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Praesentium tempore aut maxime rerum illo laborum placeat nobis totam reiciendis. Cum repellendus harum necessitatibus nulla, amet praesentium modi nobis alias sapiente.</p>
        </div>

        <div className='border-r border-crimson-dark'>
            <p className='text-xl font-medium mb-5'>COMPANY</p>
            <ul className='flex flex-col gap-1 text-broken-white'>
                <li>Home</li>
                <li>About Us</li>
                <li>Delivery</li>
                <li>Privacy Policy</li>
            </ul>
        </div>

        <div>
            <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
            <ul className='flex flex-col gap-1 text-broken-white'>
                <li>+34-666-354-701</li>
                <li>sae.nieto@gmail.com</li>
            </ul>
        </div>

    </div>
  )
}

export default Footer