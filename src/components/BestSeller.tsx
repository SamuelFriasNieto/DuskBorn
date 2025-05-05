import React, { useContext, useEffect, useState } from 'react'
import {ShopContext} from '../context/ShopContext';
import Title from './Title';
import { Product } from '../types/products';
import ProductItem from './ProductItem';

const BestSeller = () => {

    const { products } = useContext(ShopContext)
    const [bestSellers, setBestSellers] = useState<Product[]>([])

    useEffect(()=> {
        const  bestProduct = products.filter((item) =>(item.bestseller))
        setBestSellers(bestProduct.slice(0,4))
    },[])

  return (
    <div className='my-10'>
        <div className='text-center text-3xl py-8'>
            <Title text1={'BEST'} text2={'SELLERS'}/>
            <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-broken-white'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Saepe modi similique nisi quaerat ipsum molestiae sunt harum? Unde vitae provident vero totam deserunt, fugit dolore, culpa veritatis fugiat facilis sit?</p>
        </div>
       
        <div className='grid grid-cols-2 gap-4 gap-y-6 px-6 lg:px-70'>
            {
                bestSellers.map((item, index) => (
                    <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
                ))
            }
        </div>
    </div>
  )
}

export default BestSeller