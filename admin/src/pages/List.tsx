import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";

interface ListProps {
  token: string;  
}

const List = ({token}:ListProps) => {
  const [list, setList] = useState<any[]>([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      console.log(response)
      if (response.status === 200) {
        setList(response.data);
      } else {
        toast.error("Failed to fetch list");
      }
    } catch (error) {
      console.error("Error fetching list:", error);
      toast.error("Error fetching list");
    }
  };

  const removeProduct = async (id:string) => {
    try {
      const response = await axios.post(backendUrl + "/api/product/remove",{id},{
        headers: { token }
      });
      if (response.status === 200) {
        toast.success("Product deleted successfully");
        fetchList();
      } else {
        toast.error("Failed to delete product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Error deleting product");
    }
  }

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      <p className="mb-2">All Products List</p>
      <div className="flex flex-col gap-2">
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-crimson-dark/15 border-crimson text-sm">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className="text-center">Action</b>
        </div>

        {
          list.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border-b border-crimson text-sm"
            >
              <img
                className="w-20 h-20 object-cover"
                src={item.image[0]}
                alt={item.name}
              />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{currency}{item.price}</p>
              <button onClick={() => removeProduct(item._id)} className="bg-crimson text-black border border-crimson hover:bg-midnight hover:text-broken-white transition-all cursor-pointer px-2 py-1 ">Delete</button>
            </div>
          ))
        }
      </div>
    </>
  );
};

export default List;
