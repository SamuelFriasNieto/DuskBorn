import React from 'react'
import { IoMdCloudUpload } from "react-icons/io";


interface AddProps {
  token: string;
}

const Add = ({token}:AddProps) => {
  return (
    <form action="" className='flex flex-col w-full items-start gap-3'>
      <div>
        <p className='mb-2'>Upload Image</p>

        <div className='flex gap-2'>
          <label className='cursor-pointer' htmlFor="image1">
            <IoMdCloudUpload className='border border-dashed text-crimson border-crimson p-8' size={130}/>
            <input type="file" hidden id='image1' />
          </label>
          <label className='cursor-pointer' htmlFor="image2">
            <IoMdCloudUpload className='border border-dashed text-crimson border-crimson p-8' size={130}/>
            <input type="file" hidden id='image2' />
          </label>
        </div>
      </div>

      <div className='w-full'>
        <p className='mb-2 '>Product Name</p>
        <input className='w-full max-w-[500px] px-3 py-2 border border-crimson' type="text" placeholder='Product Name' required/>
      </div>

      <div className='w-full'>
        <p className='mb-2 '>Product Description</p>
        <textarea className='w-full max-w-[500px] px-3 py-2 border border-crimson' placeholder='Product Description' required/>
      </div>

      <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
        <div>
          <p className='mb-2'>Product Category</p>
          <select className='w-full px-3 py-2 border border-crimson'>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
          </select>
        </div>

        <div>
          <p className='mb-2'>Sub Category</p>
          <select className='w-full px-3 py-2 border border-crimson'>
            <option value="Top">Top</option>
            <option value="Bottom">Bottom</option>
            <option value="Winter">Winter</option>
          </select>
        </div>

        <div>
          <p className='mb-2'>Product Price</p>
          <input className='w-full px-3 py-2 sm:py-1.5 sm:w-[120px] border border-crimson' placeholder='25' type="number" />
        </div>
      </div>

      <div>
        <p className='mb-2'>Product Sizes</p>
        <div className='flex gap-3'>
          <div>
            <p className='px-3 py-1 cursor-pointer border border-crimson'>S</p>
          </div>
          <div>
            <p className='px-3 py-1 cursor-pointer border border-crimson'>M</p>
          </div>
          <div>
            <p className='px-3 py-1 cursor-pointer border border-crimson'>L</p>
          </div>
          <div>
            <p className='px-3 py-1 cursor-pointer border border-crimson'>XL</p>
          </div>
          <div>
            <p className='px-3 py-1 cursor-pointer border border-crimson'>XXL</p>
          </div>
        </div>
      </div>

      <div className='flex gap-2 mt-2'>
        <input type="checkbox" id='bestseller' />
        <label className='cursor-pointer' htmlFor="bestseller">Add to Bestseller</label>
      </div>

      <button type='submit' className='w-28 py-3 mt-4 bg-crimson'>Add</button>

    </form>
  )
}

export default Add