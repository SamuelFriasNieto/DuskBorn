import { createContext, use, useEffect, useState } from "react";
import { products } from "../assets/assets.js"
import { Product } from "../types/products.js";
import { set } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

type CurrencyT = "$" | "€" | "₹" | "£";

export type ShopContextT = {
    products: Product[];
    // currency: "$" | "€" | "₹" | "£";
    currency: CurrencyT
    delivery_fee: number;
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
    showSearch: boolean;
    setShowSearch: React.Dispatch<React.SetStateAction<boolean>>;
    cartItems: Record<string, any>;
    setCartItems: React.Dispatch<React.SetStateAction<Record<string, any>>>;
    addToCart: (itemId: string, size:string) => Promise<void>;
    getCartCount: () => number;
    updateQuantity: (itemId:string, size:string, quantity:number) => void;
    getCartAmount: () => number;
    navigate: (path: string) => void;
}

export const ShopContext = createContext(null as unknown as ShopContextT);

const ShopContextProvider: React.FC<{ children: React.ReactNode }> = (props) => {
    const currency: CurrencyT = "$"
    const delivery_fee = 10
    const [search, setSearch] = useState<string>("")
    const [showSearch, setShowSearch] = useState(true)
    const [cartItems, setCartItems] = useState<Record<string, any>>({})
    const navigate = useNavigate()

    const addToCart = async (itemId: string, size:string) => {
        let cartData = structuredClone(cartItems)

        if (!size) {
            toast.error("Please select a size")
            return
        }
         
        if(cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1
            } else {
                cartData[itemId][size] = 1
            }
        } else {
            cartData[itemId] = {}
            cartData[itemId][size] = 1
        }


        setCartItems(cartData)
    }

    const getCartCount = () => {
        let count = 0
        for (const item in cartItems) {
            for (const size in cartItems[item]) {
                count += cartItems[item][size]
            }
        }
        return count
    }

    const getCartAmount = () => {
        let amount = 0
        for (const item in cartItems) {
            for (const size in cartItems[item]) {
                const product = products.find((product) => product._id === item)
                if (product) {
                    amount += product.price * cartItems[item][size]
                }
            }
        }
        return amount 
    }

    const updateQuantity = (itemId:string, size:string, quantity:number) => {
        let cartData = structuredClone(cartItems)

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] = quantity
            } else {
                cartData[itemId][size] = 1
            }
        } else {
            cartData[itemId] = {}
            cartData[itemId][size] = 1
        }


        setCartItems(cartData)
    }


    const value = {
        products , currency, delivery_fee, search, setSearch, showSearch, setShowSearch, cartItems, setCartItems, addToCart, getCartCount, updateQuantity, getCartAmount, navigate
    };

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;


