import React, { useState } from 'react'
import { IoMdCloudUpload } from "react-icons/io";
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';


interface AddProps {
  token: string;
}

const Add = ({token}:AddProps) => {

  const [image1, setImage1] = useState<File | null>(null);
  const [image2, setImage2] = useState<File | null>(null);

  const [name, setname] = useState<string>("");
  const [description, setdescription] = useState<string>("");
  const [category, setcategory] = useState<string>("Men");
  const [subcategory, setsubcategory] = useState<string>("Top");
  const [price, setprice] = useState<string>('');
  const [sizes, setsizes] = useState<string[]>([]);
  const [bestseller, setbestseller] = useState<boolean>(false);
  const [stock,setStock] = useState<{[size:string]:number}>({});

  const onSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('hola')

    try {
      const formData = new FormData();
      image1 && formData.append("image1", image1 as Blob);
      image2 && formData.append("image2", image2 as Blob);
      formData.append("name", name);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("subCategory", subcategory);
      formData.append("price", price);
      formData.append("sizes", JSON.stringify(sizes));
      formData.append("bestseller", bestseller.toString());
      formData.append("stock", JSON.stringify(stock));

      const response = await axios.post(backendUrl + '/api/product/add', formData, {
        headers: {token}
      });

      if (response.status === 201) {
        toast.success("Product added successfully");
        setImage1(null);
        setImage2(null);
        setname("");
        setdescription("");
        setsizes([]);
        setbestseller(false);
      } else {
        toast.error("Failed to add product");
      }

      console.log(response.data);


    } catch (error) {
      console.log(error);
      toast.error("Failed to add product");
    }
  }

  return (
    <form onSubmit={onSubmit} className='flex flex-col w-full items-start gap-3'>
      <div>
        <p className='mb-2'>Upload Image</p>

        <div className='flex gap-2'>
          <label className='cursor-pointer' htmlFor="image1">
          {image1 ? <img className='w-25' src={URL.createObjectURL(image1)} alt="" /> : <IoMdCloudUpload className='border border-dashed text-crimson border-crimson p-8' size={130}/>}
          <input onChange={(e:any) => setImage1(e.target.files[0])} type="file" hidden id='image1' />
          </label>
          <label className='cursor-pointer' htmlFor="image2">
            {image2 ? <img className='w-25' src={URL.createObjectURL(image2)} alt="" /> : <IoMdCloudUpload className='border border-dashed text-crimson border-crimson p-8' size={130}/>}
            <input onChange={(e:any) => setImage2(e.target.files[0])} type="file" hidden id='image2' />
          </label>
        </div>
      </div>

      <div className='w-full'>
        <p className='mb-2 '>Product Name</p>
        <input onChange={(e)=>setname(e.target.value)} value={name} className='w-full max-w-[500px] px-3 py-2 border border-crimson' type="text" placeholder='Product Name' required/>
      </div>

      <div className='w-full'>
        <p className='mb-2 '>Product Description</p>
        <textarea onChange={(e)=>setdescription(e.target.value)} value={description} className='w-full max-w-[500px] px-3 py-2 border border-crimson' placeholder='Product Description' required/>
      </div>

      <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
        <div>
          <p className='mb-2'>Product Category</p>
          <select onChange={(e)=>setcategory(e.target.value)} className='w-full px-3 py-2 border border-crimson'>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
          </select>
        </div>

        <div>
          <p className='mb-2'>Sub Category</p>
          <select onChange={(e)=>setsubcategory(e.target.value)} className='w-full px-3 py-2 border border-crimson'>
            <option value="Top">Top</option>
            <option value="Bottom">Bottom</option>
            <option value="Winter">Winter</option>
          </select>
        </div>

        <div>
          <p className='mb-2'>Product Price</p>
          <input onChange={(e)=>setprice(e.target.value)} className='w-full px-3 py-2 sm:py-1.5 sm:w-[120px] border border-crimson' placeholder='25' type="number" />
        </div>
      </div>

      <div>
        <p className='mb-2'>Product Sizes</p>
        <div className='flex gap-3'>
          <div onClick={() => setsizes(prev => prev.includes("S") ? prev.filter(size => size !== "S") : [...prev, "S"])} className={`cursor-pointer ${sizes.includes("S") ? "bg-crimson text-broken-white" : ""}`}>
            <p className='px-3 py-1 cursor-pointer border border-crimson'>S</p>
          </div>
          <div onClick={() => setsizes(prev => prev.includes("M") ? prev.filter(size => size !== "M") : [...prev, "M"])} className={`cursor-pointer ${sizes.includes("M") ? "bg-crimson text-broken-white" : ""}`}>
            <p className='px-3 py-1 cursor-pointer border border-crimson'>M</p>
          </div>
          <div onClick={() => setsizes(prev => prev.includes("L") ? prev.filter(size => size !== "L") : [...prev, "L"])} className={`cursor-pointer ${sizes.includes("L") ? "bg-crimson text-broken-white" : ""}`}>
            <p className='px-3 py-1 cursor-pointer border border-crimson'>L</p>
          </div>
          <div onClick={() => setsizes(prev => prev.includes("XL") ? prev.filter(size => size !== "XL") : [...prev, "XL"])} className={`cursor-pointer ${sizes.includes("XL") ? "bg-crimson text-broken-white" : ""}`}>
            <p className='px-3 py-1 cursor-pointer border border-crimson'>XL</p>
          </div>
          <div onClick={() => setsizes(prev => prev.includes("XXL") ? prev.filter(size => size !== "XXL") : [...prev, "XXL"])} className={`cursor-pointer ${sizes.includes("XXL") ? "bg-crimson text-broken-white" : ""}`}>
            <p className='px-3 py-1 cursor-pointer border border-crimson'>XXL</p>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <p className='mb-2'>Stock por talla</p>
        {sizes.map(size => (
          <div key={size} className="flex items-center gap-2 mb-2">
            <label className="w-10">{size}:</label>
            <input
              type="number"
              min={0}
              value={stock[size] || ''}
              onChange={e => setStock(prev => ({...prev, [size]: Number(e.target.value)}))}
              className="border border-crimson px-2 py-1 w-24"
              required
            />
          </div>
        ))}
      </div>

      <div className='flex gap-2 mt-2'>
        <input onChange={()=>setbestseller(prev => !prev)} checked={bestseller} className='border border-crimson' type="checkbox" id='bestseller' />
        <label className='cursor-pointer' htmlFor="bestseller">Add to Bestseller</label>
      </div>

      <button type='submit' className='w-28 py-3 mt-4 bg-crimson border border-crimson text-black hover:bg-midnight hover:text-broken-white transition-all cursor-pointer'>Add</button>

    </form>
  )
}

export default Add