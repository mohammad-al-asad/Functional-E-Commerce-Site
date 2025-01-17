"use client";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";
import { FaRegHeart } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import {
  decreaseCounter,
  increaseCounter,
  removeCart,
} from "@/lib/redux/CartSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/redux";

function CartItems() {
  let counterId: any;
  const removeItem = (item: number) => {
    clearTimeout(counterId);
    counterId = setTimeout(() => dispatch(removeCart(item)), 800);
  };

  const router = useRouter();
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => {
    return state.cart.cart;
  });

  const setCounter = (action: string, id: number) => {
    if (action === "plus") {
      clearTimeout(counterId);
      counterId = setTimeout(() => dispatch(increaseCounter(id)), 800);
    } else if (action === "minus") {
      clearTimeout(counterId);
      counterId = setTimeout(() => dispatch(decreaseCounter(id)), 800);
    }
  };

  return (
    <div className="w-[64%]">
      <div className="mb-4 flex gap-2 bg-[#fafafa] p-3">
        <input type="checkbox" />
        <h3>Select all</h3>
      </div>
      {cartItems?.map((cartItem: any, index: number) => {
        if (cartItem) {
          
          return (
            <div className="mb-1 bg-[#fafafa] p-3" key={index}>
              <div className="flex justify-between items-center">
                <div className="flex gap-2 w-1/2">
                  <input type="checkbox" />
                  <Image
                    onClick={() =>
                      router.push(`/product/${cartItem.product.$id}`)
                    }
                    className="p-3"
                    src={cartItem.product.image}
                    height={50}
                    width={50}
                    alt={cartItem.product.title}
                  />
                  <div className="mt-3">
                    <h3 className="text-lg font-[500] line-clamp-2">
                      {cartItem.product.title}
                    </h3>
                    <h3 className="text-gray-500 text-xs">
                      No Brand, Color Family:Black
                    </h3>
                  </div>
                </div>
                <h2 className="text-xl">
                  <p className="font-[500] text-main">
                    ${cartItem.product.price}
                  </p>
                  <p className="line-through text-gray-400">
                    ${cartItem.product.price}
                  </p>
                  <div className="flex mt-2 gap-2">
                    <a>
                      <FaRegHeart />
                    </a>
                    <a
                      onClick={() => {
                        removeItem(cartItem.$id);
                      }}
                    >
                      <RiDeleteBin6Line />
                    </a>
                  </div>
                </h2>

                <div className="flex gap-1 mb-8">
                  <p
                    onClick={() => setCounter("minus", cartItem.$id)}
                    className="bg-[#EFF0F5] text-2xl cursor-pointer w-10 flex items-center justify-center text-gray-400"
                  >
                    -
                  </p>
                  <p className="2xl flex items-center justify-center">
                    {cartItem.count}
                  </p>
                  <p
                    onClick={() => setCounter("plus", cartItem.$id)}
                    className="bg-[#EFF0F5] text-2xl font-semibold cursor-pointer w-10 flex items-center justify-center text-gray-400"
                  >
                    +
                  </p>
                </div>
              </div>
            </div>
          );
        } else {
          return null;
        }
      })}
    </div>
  );
}

export default CartItems;
