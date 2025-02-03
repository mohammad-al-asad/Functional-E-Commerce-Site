"use client";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux";
import NotFound from "./utility/NotFound";
import SingleCart from "./SingleCart";

function CartItems() {
  const cartItems = useSelector((state: RootState) => state.cart.cart);

  return (
    <div className="text-white mt-5 w-full lg:w-[46.5%]">
      <div className="rounded-lg bg-main p-2 md:p-4">
        <h3 className="text-lg font-semibold p-1.5">All Carts</h3>
        <div className="h-0.5 bg-white" />

        <div className="overflow-y-auto overflow-x-hidden custom-scrollbar bg-main p-1 pt-3 h-[350px] lg:h-[450px]">
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
