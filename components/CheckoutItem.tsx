import Image from "next/image";
import React from "react";

function CheckoutItem({ cart }: { cart: any }) {
  return (
    <div className="flex justify-between items-center mb-1 rounded-sm p-3 bg-gray-900 text-white h-28">
      <div className="flex gap-2 w-1/2">
        <div className="bg-white m-1 rounded-sm w-20 h-18 relative">
          <Image
            className="p-1"
            src={cart.product.image}
            fill
            alt={cart.product.title}
          />
        </div>
        <div className="mt-2">
          <h3 className="text-lg font-[500] line-clamp-2">
            {cart.product.title}
          </h3>
          <h3 className="text-gray-500 text-xs">No Brand, Color Family:Any</h3>
        </div>
      </div>
      <h2 className="text-lg">
        <p className="font-[500]">
          ${cart.product.price}x{cart.count} = {cart.product.price * cart.count}
        </p>
      </h2>
    </div>
  );
}

export default CheckoutItem;
