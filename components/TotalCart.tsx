import React from "react";
import { IoLocationOutline } from "react-icons/io5";

function TotalCart() {
  return (
    <div className="w-[35%] h-fit bg-[#fafafa] p-6 text-sm space-y-5">
      <p className="mb-3">Location</p>
      <div className="space-y-8">
        <div className="flex gap-3 items-center">
          <IoLocationOutline className="text-2xl" />
          <div className="text-sm">
            <p>Dhaka, Dhaka North, Banani</p>
            <p>Road No. 12 - 19</p>
          </div>
        </div>
      </div>
      <h2 className="text-xl font-semibold pt-2">Order Summary</h2>
      <div className="flex justify-between">
        <p>Subtotal (0 items)</p>
        <p className="font-semibold">$ 0</p>
      </div>

      <div className="flex justify-between">
        <p>Shiping Fee</p>
        <p className="font-semibold">$ 0</p>
      </div>

      <form>
        <input
          className="border-2 p-2 focus:outline-none"
          type="text"
          placeholder="Enter Voucher Code"
        />
        <button className="w-20 bg-[#01a4d6] mt-2 ml-1 p-2 text-white" type="submit">
          Apply
        </button>
      </form>

      <div className="flex justify-between">
        <p>Total</p>
        <p className="font-semibold">$ 0</p>
      </div>
      <button className="w-full bg-main ml-2 p-2 text-white" type="submit">
        PROCCED TO CHECKOUT(0)
      </button>
    </div>
  );
}

export default TotalCart;
