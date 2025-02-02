import { debouncer } from "@/helpers/debouncer";
import { AppDispatch } from "@/lib/redux";
import {
  decreaseCounter,
  increaseCounter,
  removeCart,
  toggleIsSelected,
} from "@/lib/redux/CartSlice";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { Input } from "./ui/input";

function SingleCart({ cartItem }: { cartItem: any }) {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  return (
    <div className="mb-1 bg-gray-800 h-[110px] p-3 rounded-sm">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 w-1/2">
          <Input
            className="w-6 my-auto"
            type="checkbox"
            checked={cartItem.isSelected}
            onChange={() => debouncer(dispatch(toggleIsSelected(cartItem.$id)))}
          />
          <div className="rounded-sm w-20 relative bg-white m-1">
            <Image
              onClick={() => router.push(`/product/${cartItem.product.$id}`)}
              className="p-1.5"
              src={cartItem.product.image}
              fill
              alt={cartItem.product.title}
            />
          </div>
          <div className="mt-2 w-[90%]">
            <h3 className="text-lg font-[500] line-clamp-2 text-ellipsis">
              {cartItem.product.title}
            </h3>
            <h3 className="text-gray-500 text-xs">
              No Brand, Color Family:Any
            </h3>
          </div>
        </div>
        <h2 className="text-lg">
          <p className="font-[500]">${cartItem.product.price}</p>
          <p className="line-through text-gray-400">
            ${cartItem.product.price}
          </p>
          <div className="flex mt-2 gap-2">
            <a>
              <FaRegHeart />
            </a>
            <a onClick={debouncer(() => dispatch(removeCart(cartItem.$id)))}>
              <RiDeleteBin6Line />
            </a>
          </div>
        </h2>

        <div className="flex gap-1">
          <p
            onClick={debouncer(() => dispatch(decreaseCounter(cartItem.$id)))}
            className="bg-[#EFF0F5] text-2xl cursor-pointer w-7 h-7 flex items-center justify-center text-gray-500"
          >
            -
          </p>
          <p className="2xl flex items-center justify-center p-1">
            {cartItem.count}
          </p>
          <p
            onClick={debouncer(() => dispatch(increaseCounter(cartItem.$id)))}
            className="bg-[#EFF0F5] text-2xl font-semibold cursor-pointer w-7 h-7 flex items-center justify-center text-gray-500"
          >
            +
          </p>
        </div>
      </div>
    </div>
  );
}

export default SingleCart;
