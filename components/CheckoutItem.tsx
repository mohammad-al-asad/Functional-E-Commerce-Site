import Image from "next/image";
import React from "react";

function CheckoutItem({ cart }: { cart: any }) {
  return (
    <div className="md:text-lg flex justify-between items-center mb-1 rounded-sm p-2 md:p-4 bg-gray-900 text-white h-24">
      <div className="bg-white mr-3 rounded-sm w-[100px] h-[70px] relative">
        <Image
          className="p-1"
          src={cart.product.image}
          fill
          alt={cart.product.title}
        />
      </div>
      <div className="lg:flex lg:gap-8 lg:my2 justify-between">
        <div className="my-2">
          <h3 className="line-clamp-2">
            {cart.product.title}
          </h3>
        </div>
        <h2 className="text-right lg:grid lg:place-items-center">
          <p className="font-semibold">
            ${cart.product.price}x{cart.count} ={" "}
            {cart.product.price * cart.count}
          </p>
        </h2>
      </div>
    </div>
  );
}

export default CheckoutItem;
