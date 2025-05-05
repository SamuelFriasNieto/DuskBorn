import {ShopContext} from "@/context/ShopContext"
import { use, useContext, useEffect, useState } from "react"
import { RxCross2 } from "react-icons/rx";
import { useLocation } from "react-router-dom";

const SearchBar = () => {

    const {search, setSearch, showSearch, setShowSearch} = useContext(ShopContext)
    const [visible, setVisible] = useState(false)
    const location = useLocation()

    useEffect(() => {
        if(location.pathname.includes("collection")) {
            setVisible(true)
        } else {
            setVisible(false)
        }
    },[location])

    useEffect(()=> {
        setSearch("")
    },[showSearch])

  return showSearch && visible ? (
    <div className=" text-center py-5 border-b border-crimson-bright">
        <div className="inline-flex items-center justify-center border border-crimson-bright px-5 py-2 mx-3 rounded-full w-3/4 sm:w-1/2 ">
            <input value={search} onChange={(e) => setSearch(e.target.value)} className="flex-1 outline-none bg-inherit text-sm " type="text" placeholder="Search Item"/>
            <svg className='text-broken-white cursor-pointer w-4' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" width="24" height="24" stroke-width="1.6"> <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0"></path> <path d="M21 21l-6 -6"></path> </svg>
        </div>
        <RxCross2 onClick={() => setShowSearch(false)} size={20} className="text-crimson-bright  cursor-pointer inline"/>
    </div>
  ) : null
}

export default SearchBar

