import React, { useContext } from 'react'
import {ShopContext} from '../context/ShopContext';
import { Link } from 'react-router-dom';

interface ProductItemProps {
    id: string;
    image: string[];
    name: string;
    price: number;
}

const ProductItem: React.FC<ProductItemProps> =  ({id, image, name, price}) => {

    const {currency} = useContext(ShopContext);

  return (
    <Link to={`/product/${id}`} className='text-broken-white  cursor-pointer border border-crimson-dark'>
        <div className='overflow-hidden relative group h-full'>
            <img className='hover:scale-110 transition h-full object-cover ease-in-out duration-300' src={image[0]} alt="" />
            <div className='overflow-hidden pl-3 py-3 absolute left-0 -translate-x-[100%] bottom-0 w-full bg-crimson-dark/70 group-hover:translate-x-0 transition ease-in-out duration-300'>
                <p className='pb-1 text-sm'>{name}</p>
                <p className='text-sm font-medium'>{currency}{price}</p>
            </div>
        </div>

    </Link>
  )
}

export default ProductItem