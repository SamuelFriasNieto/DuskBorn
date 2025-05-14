import { Carousel, CarouselContent, CarouselItem,  CarouselNext,
  CarouselPrevious, } from '@/components/ui/carousel'
import {ShopContext} from '@/context/ShopContext'
import type { Product as Prod } from '@/types/products'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const Product = () => {

  const {productId} = useParams()
  const {products, currency, addToCart} = useContext(ShopContext)
  const [productData, setProductData] = useState<Prod>()
  const [image, setImage] = useState<string>('')
  const [size, setSize] = useState<string>('')



  const fetchProductData = async () => {
    products.map((item) => {
      if(item._id === productId) {
        setProductData(item)
        setImage(item.image[0])
        return null
      }
    })
  }

  useEffect(()=> {
    fetchProductData()
  },[productId, products])

  useEffect(() => {
    window.scrollTo(0, 0)
  },[productId])

  return productData ? (
    <div className=' transition-opacity ease-in duration-500 opacity-100'>
     <div className='md:grid md:grid-cols-2'>
      <div className='border border-crimson border-t-0 '>

        <Carousel className=''>
            <CarouselContent>
              {
                productData.image.map((item, index) => (   
                  <CarouselItem key={index} ><img className='w-full h-full object-cover cursor-pointer' onClick={() => setImage(item)}  src={item} alt="" /></CarouselItem>
                ))
              }
            </CarouselContent>
            <CarouselPrevious className='cursor-pointer absolute top-1/2 left-5 -translate-y-1/2 bg-black/70 hover:bg-crimson-bright hover:text-black ring-0 border-0 rounded-full p-2'/>
            <CarouselNext className='cursor-pointer absolute top-1/2 right-5 -translate-y-1/2 bg-black/70 hover:bg-crimson-bright hover:text-black ring-0 border-0 rounded-full p-2'/>
        </Carousel>
      </div>
        
      <div className='py-20 px-10 md:px-40 flex flex-col  justify-center border-b border-crimson'>
        <h1 className='font-medium text-2xl'>{productData.name}</h1>
        <p className='mt-3 text-xl'>{currency}{productData.price}</p>
        <p className='mt-9 md:w-4/5'>{productData.description}</p>
        <div className='flex flex-col gap-4 my-8'>
          <p>Size:</p>
          <div className='flex gap-2'>
              {productData.sizes.map((item, index) => (
                <button key={index} onClick={() => setSize(item)} className={`border border-crimson-bright px-6 py-1 text-sm cursor-pointer hover:bg-crimson-bright hover:text-black ${size === item ? 'bg-crimson-bright text-black' : ''}`}>{item}</button>
              ))}
          </div>
        </div>
        <button onClick={() => addToCart(productData._id,size)} className='bg-crimson-bright text-black hover:bg-midnight border border-crimson-bright transition-all duration-300 hover:text-broken-white py-2 px-4 cursor-pointer'>ADD TO CART</button>
        <hr className='mt-8 sm:w-4/5 border-crimson' />
        <div className='text-sm text-broken-white mt-5 flex flex-col gap-1'>
            <p>100% Original product.</p>
            <p>Cash on delivery available in this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
        </div>
     </div>

     <div className='mt-20 mx-15 col-span-full'>
        <div className='flex'>
            <b className='border border-b-0 border-crimson px-5 py-3 text-sm'>Description</b>
        </div>
        <div className='flex flex-col gap-4 border border-crimson-bright px-6 py-6 text-sm text-broken-white '>
            {productData.description}
        </div>
     </div>

     </div>
    </div>
  ) : <div className='opacity-0'></div>
}

export default Product
