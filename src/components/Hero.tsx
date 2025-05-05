import React from 'react'
import Autoplay from "embla-carousel-autoplay"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"

const Hero = () => {
    const plugin = React.useRef(
        Autoplay({ delay: 2000, stopOnInteraction:false  })
      )

  return (
    <div className='flex flex-col sm:flex-row border border-crimson border-t-0'>
        {/* Left side */}
        <div className='flex-1 flex items-center justify-center py-10 sm:py-0 sm:border-r sm:border-b-0 border-b border-crimson'>
            <div className='text-broken-white'>
                <div className='flex items-center gap-2'>
                    <p className='w-8 md:w-11 h-[2px] bg-broken-white'></p>
                    <p className='font-medium text-sm md:text-base'>OUR BESTSELLERS</p>
                </div>
                <h1 className='text-3xl sm:py-3 lg:text-5xl leading-relaxed'>Latest Arrivals</h1>
                <div className='flex items-center gap-2'>
                    <p className='font-semibold text-sm md:text-base'>SHOP NOW</p>
                    <p className='w-8 md:w-11 h-[1px] bg-broken-white'></p>
                </div>
            </div>
        </div>
        {/* Right side */}
        <Carousel className='flex-1' plugins={[plugin.current]}>
            <CarouselContent>
                <CarouselItem ><img className='w-full  bg-cover'  src="/src/assets/hero-image.png" alt="" /></CarouselItem>
                <CarouselItem ><img className='w-full  bg-cover'  src="/src/assets/hero-image2.png" alt="" /></CarouselItem>
            </CarouselContent>
        </Carousel>

        {/* <img className='w-full sm:w-1/2 bg-cover'  src="/src/assets/hero-image.png" alt="" /> */}
    </div>
  )
}

export default Hero