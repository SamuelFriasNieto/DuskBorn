import CartTotal from "@/components/CartTotal";
import Title from "@/components/Title";
import { ShopContext } from "@/context/ShopContext";
import React, { useContext, useEffect, useState } from "react";
import { RiDeleteBinLine } from "react-icons/ri";

const Cart = () => {
  const { cartItems, products, currency, updateQuantity, navigate } =
    useContext(ShopContext);

  const [cartData, setCartData] = useState<any[]>([]);

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];

      for (const items in cartItems) {
        for (const size in cartItems[items]) {
          if (cartItems[items][size] > 0) {
            tempData.push({
              id: items,
              size: size,
              quantity: cartItems[items][size],
            });
          }
        }
      }
      setCartData(tempData);
    }
  }, [cartItems,products]);

  return (
    <div className="pt-14 mx-15">
      <div className="text-2xl mb-3">
        <Title text1={"YOUR"} text2={"CART"} />
      </div>

      <div>
        {cartData.map((item, index) => {
          const product = products.find((product) => product._id === item.id);
          return (
            <div
              key={index}
              className="py-4  border-b border-crimson grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
            >
              <div className="flex items-start gap-6">
                <img
                  className="w-16 sm:w-30 border border-crimson"
                  src={product?.image[0]}
                  alt=""
                />
                <div>
                  <p className="text-xs sm:text-lg font-medium ">
                    {product?.name}
                  </p>
                  <div className="flex items-center gap-5 mt-2">
                    <p className="">
                      {currency}
                      {product?.price}
                    </p>
                    <p className="px-2 sm:px-3 sm:py-1 sm:border border-crimson ">
                      {item.size}
                    </p>
                  </div>
                </div>
              </div>
              <input
                onChange={(e) =>
                  e.target.value === "" || e.target.value === "0"
                    ? null
                    : updateQuantity(item.id, item.size, Number(e.target.value))
                }
                className="border border-crimson max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
                type="number"
                min={1}
                defaultValue={item.quantity}
                name=""
                id=""
              />
              <RiDeleteBinLine
                onClick={() => updateQuantity(item.id, item.size, 0)}
                size={20}
                className="text-crimson mr-4 cursor-pointer"
              />
            </div>
          );
        })}
      </div>

      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal />

          <div className="w-full text-end">
            <button
              onClick={() => navigate("/place-order")}
              className="bg-crimson-bright text-black hover:bg-midnight border border-crimson-bright transition-all duration-300 hover:text-broken-white py-2 px-4 cursor-pointer"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
