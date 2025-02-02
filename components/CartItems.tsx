"use client";
import React from "react";
import {  useSelector } from "react-redux";
import {  RootState } from "@/lib/redux";
import NotFound from "./NotFound";
import SingleCart from "./SingleCart";

function CartItems() {
  const cartItems = useSelector((state: RootState) => state.cart.cart);

  return (
    <div className="w-[64%] text-white">
      <div className="rounded-md bg-main p-6 h-[88%]">
        <h3 className="text-lg font-semibold mb-2">All Carts</h3>
        <div className="h-0.5 bg-white" />
        <div className="overflow-y-auto h-[93%] custom-scrollbar bg-main p-2">
          {cartItems.length !== 0 ? (
            cartItems.map((cartItem: any) => {
              return <SingleCart key={cartItem.$id} cartItem={cartItem} />;
            })
          ) : (
            <NotFound text="No cart to show" />
          )}
        </div>
      </div>
    </div>
  );
}

export default CartItems;
