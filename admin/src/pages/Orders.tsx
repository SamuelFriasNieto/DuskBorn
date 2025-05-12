import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { BsFillBoxSeamFill } from "react-icons/bs";

interface OrdersProps {
  token: string;
}

const Orders = ({ token }: OrdersProps) => {
  const [orders, setOrders] = useState<any[]>([]);

  const loadOrders = async () => {
    try {
      if (!token) {
        return null;
      }
      const response = await axios.post(
        backendUrl + "/api/order/list",
        {},
        {
          headers: {
            token,
          },
        }
      );

      if (response.status === 200) {
        console.log(response.data);
        setOrders(response.data.orders.reverse());
      } else {
        console.error("Error fetching orders:", response.data.message);
        toast.error("Error fetching orders");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Error fetching orders");
    }
  };

  const updateStatus = async (status:string,orderId:string) => {
    try {
      if (!token) {
        return null;
      }
      const response = await axios.post(backendUrl + '/api/order/status', {
        orderId: orderId,
        status: status
      }, {
        headers: {
          token
        }
      })
      if (response.status === 200) {
        console.log(response.data);
        toast.success("Order status updated successfully");
        loadOrders();
      } else {
        console.error("Error updating order status:", response.data.message);
        toast.error("Error updating order status");
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error("Error updating order status");
    }
  }

  useEffect(() => {
    loadOrders();
  }, [token]);

  return (
    <div>
      <h3>Orders</h3>
      <div>
        {orders.map((order, index) => (
          <div className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border border-crimson p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-broken-white" key={index}>
            <BsFillBoxSeamFill size={30} className="text-crimson " />
            <div>
              <div>
                {order.items.map((item: any, index: any) => {
                  if (index === order.items.length - 1) {
                    return (
                      <p className="py-0.5 " key={index}>
                        {item.name} x {item.quantity}
                        <span> {item.size}</span>
                      </p>
                    );
                  } else {
                    return (
                      <p className="py-0.5" key={index}>
                        {item.name} x {item.quantity}
                        <span> {item.size},</span>
                      </p>
                    );
                  }
                })}
              </div>
              <p className="mt-3 mb-2 font-medium">{order.address.firstName + " " + order.address.lastName}</p>
              <div>
                <p >{order.address.street + ","}</p>
                <p>
                  {order.address.city +
                    ", " +
                    order.address.state +
                    ", " +
                    order.address.country +
                    ", " +
                    order.address.zipcode}
                </p>
              </div>
              <p>{order.address.phone}</p>
            </div>
            <div>
              <p className="text-sm sm:text-[15px]">Items : {order.items.length}</p>
              <p className="mt-3">Method : {order.paymentMethod}</p>
              <p>Payment : {order.payment ? 'Done' : 'Pending'}</p>
              <p>Date : {new Date(order.date).toLocaleDateString()}</p>
            </div>
            <p className="text-sm sm:text-[15px]">{currency}{order.amount}</p>
            <select onChange={(e) => updateStatus(e.target.value,order._id)} value={order.status} className="p-2 font-semibold border border-crimson">
              <option value="Order Placed">Order Placed</option>
              <option value="Packing">Packing</option>
              <option value="Shiped">Shiped</option>
              <option value="Out For Delivery">Out For Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
