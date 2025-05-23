import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";

interface ListProps {
  token: string;
}

const List = ({ token }: ListProps) => {
  const [list, setList] = useState<any[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [newStock, setNewStock] = useState<{ [size: string]: number }>({});

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      console.log(response);
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

  const removeProduct = async (id: string) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/product/remove",
        { id },
        {
          headers: { token },
        }
      );
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
  };

  const handleEditStock = (item: any, index: number) => {
    setEditIndex(index);
    setNewStock({ ...item.stock });
  };

  const handleStockChange = (size: string, value: number) => {
    setNewStock((prev) => ({ ...prev, [size]: value }));
  };

  const saveStock = async (productId: string) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/product/update-stock",
        { productId, stock: newStock },
        { headers: { token } }
      );
      if (response.status === 200) {
        toast.success("Stock updated");
        setEditIndex(null);
        fetchList();
      } else {
        toast.error("Failed to update stock");
      }
    } catch (error) {
      toast.error("Error updating stock");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      <p className="mb-2">All Products List</p>
      <div className="flex flex-col gap-2">
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-crimson-dark/15 border-crimson text-sm">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Stock</b>
          <b className="text-center">Action</b>
          <b className="text-center">Edit Stock</b>
        </div>

        {list.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr_1fr] items-center py-1 px-2 border-b border-crimson text-sm"
          >
            <img
              className="w-20 pr-2 sm:pr-0 h-20 object-cover "
              src={item.image[0]}
              alt={item.name}
            />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>
              {currency}
              {item.price}
            </p>
            <div>
              {item.stock
                ? Object.entries(item.stock).map(([size, qty]) => (
                    <span key={size} className="block">
                      {size}: {qty as string | number}
                    </span>
                  ))
                : "—"}
            </div>
            <button
              onClick={() => removeProduct(item._id)}
              className="bg-crimson text-black border border-crimson hover:bg-midnight hover:text-broken-white transition-all cursor-pointer px-2 py-1 "
            >
              Delete
            </button>

              {editIndex === index ? (
                <div className="flex flex-col items-center gap-1 justify-center">
                  {Object.keys(item.stock).map((size) => (
                    <div key={size} className="flex items-center justify-between gap-1">
                      <span>{size}:</span>
                      <input
                        type="number"
                        min={0}
                        value={newStock[size] || 0}
                        onChange={(e) =>
                          handleStockChange(size, Number(e.target.value))
                        }
                        className="w-12 border border-crimson px-1"
                      />
                    </div>
                  ))}
                  <button
                    onClick={() => saveStock(item._id)}
                    className="bg-green-600 text-white px-2 py-1 mt-1 mr-1"
                  >
                    Guardar
                  </button>
                  <button
                    onClick={() => setEditIndex(null)}
                    className="bg-gray-400 text-white px-2 py-1 mt-1"
                  >
                    Cancelar
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => handleEditStock(item, index)}
                  className="bg-midnight ml-2 text-white border border-crimson px-2 py-1 cursor-pointer"
                >
                  Reponer stock
                </button>
              )}
          </div>
        ))}
      </div>
    </>
  );
};

export default List;
