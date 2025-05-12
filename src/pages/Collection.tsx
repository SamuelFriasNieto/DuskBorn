import Title from '@/components/Title';
import { Checkbox } from '@/components/ui/checkbox'
import { ShopContext } from '@/context/ShopContext'
import { useContext, useEffect, useState } from 'react'
import { IoIosArrowDropdownCircle } from "react-icons/io";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import ProductItem from '@/components/ProductItem';
import { Product } from '@/types/products';


const Collection = () => {

  const {products, search, showSearch} = useContext(ShopContext)
  const [showFilter, setShowFilter] = useState(false)
  const [filterProducts, setFilterProducts] = useState<Product[]>([])
  const [category, setCategory] = useState<string[]>([])
  const [subCategory, setSubCategory] = useState<string[]>([])
  const [sortType, setSortType] = useState<string>('Relevant')

  const toggleCategory = (value: string) => {
    if (category.includes(value)) {
      setCategory(prev => prev.filter(item => item !== value));
    } else {
      setCategory(prev => [...prev, value]);
    }
  }
  const toggleSubCategory = (value: string) => {
    if (subCategory.includes(value)) {
      setSubCategory(prev => prev.filter(item => item !== value));
    } else {
      setSubCategory(prev => [...prev, value]);
    }
  }

  const applyFilter = () => {
    let productsCopy = products.slice()
    if(search.length > 0) {
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    }
    if(category.length > 0) {
      productsCopy = productsCopy.filter(item => category.includes(item.category))
    }
    if(subCategory.length > 0) {
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory))
    }
    setFilterProducts(productsCopy)
  }

  const sortProduct = () => {
    let fpcopy = filterProducts.slice()

    switch (sortType) {
      case 'Low-High':
        fpcopy.sort((a, b) => a.price - b.price)
        break;
      case 'High-Low':
        fpcopy.sort((a, b) => b.price - a.price)
        break;
      default:
        applyFilter()
        break;
    }

    setFilterProducts(fpcopy)
  }

  useEffect(() => {
    sortProduct()
  }, [sortType])


  useEffect(() => {
    applyFilter()
  },[category, subCategory, search,showSearch,products])


  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 '>

      {/*Filter Options*/}
      <div className='min-w-60 mx-15'>
        <p onClick={() => setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>FILTERS
          <IoIosArrowDropdownCircle className={`text-crimson-bright sm:hidden ${showFilter ? 'rotate-180' : ''} duration-300 `}/>
        </p>

        <div className={`border border-crimson-dark pl-5 py-3 mt-6  ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium text-crimson-bright'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-broken-white'>
            <p className='flex gap-2 items-center' >
              <Checkbox className='border-crimson-bright data-[state=checked]:bg-crimson-dark data-[state=checked]:border-crimson-dark' id="Men" value={'Men'} onCheckedChange={(checked) => toggleCategory('Men')}/> 
              <label htmlFor="Men">Men</label>
            </p>
            <p className='flex gap-2 items-center' >
              <Checkbox className='border-crimson-bright data-[state=checked]:bg-crimson-dark data-[state=checked]:border-crimson-dark' id="Women" value={'Women'} onCheckedChange={(checked) => toggleCategory('Women')}/>
              <label htmlFor="Women">Women</label>
            </p>
          </div>
        </div>

        <div className={`border border-crimson-dark pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium text-crimson-bright'>TYPE</p>
          <div className='flex flex-col gap-2 text-sm font-light text-broken-white'>
            <p className='flex gap-2 items-center'>
              <Checkbox className='border-crimson-bright data-[state=checked]:bg-crimson-dark data-[state=checked]:border-crimson-dark' id="Topwear" value={'Topwear'} onCheckedChange={(checked) => toggleSubCategory('Topwear')}/> 
              <label htmlFor="Topwear">Top</label>
            </p>
            <p className='flex gap-2 items-center'>
              <Checkbox className='border-crimson-bright data-[state=checked]:bg-crimson-dark data-[state=checked]:border-crimson-dark' id="Bottomwear" value={'Bottomwear'} onCheckedChange={(checked) => toggleSubCategory('Bottomwear')}/>
              <label htmlFor="Bottomwear">Bottom</label>
            </p>
            <p className='flex gap-2 items-center'>
              <Checkbox className='border-crimson-bright data-[state=checked]:bg-crimson-dark data-[state=checked]:border-crimson-dark' id="Winterwear" value={'Winterwear'} onCheckedChange={(checked) => toggleSubCategory('Winterwear')}/>
              <label htmlFor="Winterwear">Winter</label>
            </p>
          </div>
        </div>
        
      </div>

      <div className='flex-1'>

        <div className='flex justify-between text-base sm:text-2xl mb-4 mr-15'>
          <Title text1={'ALL'} text2={'COLLECTIONS'}/>

          <Select onValueChange={(value) => setSortType(value)} >
            <SelectTrigger  className="w-[180px] border-crimson-bright">
              <SelectValue placeholder="Sort" />
            </SelectTrigger>
            <SelectContent  className='border border-crimson-bright text-sm px-2 focus-visible:outline-0 bg-crimson-bright text-broken-white'>
              <SelectGroup >
                <SelectItem value="Relevant">Relevant</SelectItem>
                <SelectItem value="Low-High">Low-High</SelectItem>
                <SelectItem value="High-Low">High-Low</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6 mr-15'>
          {
            filterProducts.map((item, index)=> (
              <ProductItem key={index} name={item.name} id={item._id} image={item.image} price={item.price} />
            ))
          }
        </div>

      </div>

    </div>
  )
}

export default Collection
