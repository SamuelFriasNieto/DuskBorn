import { useContext, useEffect, useState } from 'react'
import {ShopContext} from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'

const LatestCollection = () => {

    const { products } = useContext(ShopContext) as { products: { _id: string; image: string[]; name: string; price: number }[] }

    const [latestProducts, setLatestProducts] = useState<{ _id: string; image: string[]; name: string; price: number }[]>([])

    useEffect(() => {
        setLatestProducts(products.slice(0, 10))
    }, [products])


  return (
    <div className='my-10'>
        <div className='text-center py-8 text-3xl'>
            <Title text1={'LATEST'} text2={'COLLECTIONS'}/>
            <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-broken-white'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni dolores tempore necessitatibus, officiis, molestias recusandae ab dicta eius laboriosam nihil dolorem temporibus ea repudiandae magnam mollitia minus, facere voluptatum. Eligendi.
            </p>
        </div>

        {/*Rendering Products*/}

        <div className='mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 px-6'>
            {
                latestProducts.map((item,index) => (
                    <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
                ))
            }
        </div>
    </div>
  )
}

export default LatestCollection