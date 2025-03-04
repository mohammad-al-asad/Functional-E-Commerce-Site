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
import React from "react";
import { FaRegHeart } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { Input } from "./ui/input";

function SingleCart({ cartItem }: { cartItem: any }) {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  return (
    <div className="mb-1 bg-gray-900 p-3 rounded-sm w-full">
      <div className="flex items-center gap-4">
        <div className="flex gap-2">
          <Input
            className="w-4 md:w-5 my-auto"
            type="checkbox"
            checked={cartItem.isSelected}
            onChange={() => debouncer(dispatch(toggleIsSelected(cartItem.$id)))}
          />
          <div className="rounded-sm w-20 h-20 relative bg-white m-1">
            <Image
              onClick={() => router.push(`/product/${cartItem.product.$id}`)}
              className="p-1.5"
              src={cartItem.product.image}
              fill
              alt={cartItem.product.title}
            />
          </div>
        </div>

        <div className="flex flex-col w-full">
          {/* Title */}
          <div className="mb-2">
            <h3 className="text-sm md:text-xl line-clamp-2 text-ellipsis">
              {cartItem.product.title}
            </h3>
          </div>

          <div className="flex justify-end items-center md:gap-10 gap-4 md:text-lg">
            <p className="font-[500]">${cartItem.product.price}</p>
            <div className="flex gap-2 items-center">
              <a>
                <FaRegHeart />
              </a>
              <a onClick={debouncer(() => dispatch(removeCart(cartItem.$id)))}>
                <RiDeleteBin6Line />
              </a>
            </div>

            {/* count */}
            <div className="flex gap-0.5 md-gap-1 justify-center items-center">
              <p
                onClick={debouncer(() =>
                  dispatch(decreaseCounter(cartItem.$id))
                )}
                className="bg-[#EFF0F5] text-2xl cursor-pointer w-5 h-5 md:w-7 md:h-7 flex items-center justify-center text-gray-500"
              >
                -
              </p>
              <p className="text-sm md:text-lg flex items-center justify-center p-1">
                {cartItem.count}
              </p>
              <p
                onClick={debouncer(() =>
                  dispatch(increaseCounter(cartItem.$id))
                )}
                className="bg-[#EFF0F5] text-2xl font-semibold cursor-pointer w-5 h-5 md:w-7 md:h-7 flex items-center justify-center text-gray-500"
              >
                +
              </p>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleCart;
