import React from "react";
import { IoLocationOutline } from "react-icons/io5";
import { TbTruckDelivery } from "react-icons/tb";
import { BiMoneyWithdraw } from "react-icons/bi";
import { TbTruckReturn } from "react-icons/tb";
import { TbNotesOff } from "react-icons/tb";

function DeliveryDetails() {
  return (
    <div className="w-[30%] bg-[#fafafa] p-5 text-sm">
        <p className="mb-3">Delivery</p>
      <div className="space-y-8">

        <div className="flex gap-3 items-center">
          <IoLocationOutline className="text-2xl" />
          <div className="text-sm">
            <p>Dhaka, Dhaka North, Banani</p>
            <p>Road No. 12 - 19</p>
          </div>
          <button className="text-[#01a4d6] ml-2">Change</button>
        </div>

        <div className="flex gap-3 items-center">
          <TbTruckDelivery className="text-2xl" />
          <div className="text-sm">
            <p>
              <span className="font-semibold">Standard Delivery </span>
              <span className="text-[12px]">16 Jul - 19 Jul</span>
            </p>
            <p>4 - 7 day(s)</p>
          </div>
          <p className="ml-2 font-semibold">৳ 55</p>
        </div>

        <div className="flex gap-3 items-center">
          <BiMoneyWithdraw className="text-2xl" />
          <div className="text-sm">
            <p>Cash on Delivery Available</p>
          </div>
          <p className="ml-2 font-semibold"></p>
        </div>
      </div>


      <div className="service">
      <p className="mt-10 mb-3">Service</p>
      <div className="space-y-8 text-sm">
        <div className="flex gap-3 items-center">
          <TbTruckReturn className="text-2xl" />
          <div className="text-sm">
            <p>7 Day Return</p>
            <p>Change of mind applicable</p>
          </div>
          <p className="ml-2"></p>
        </div>

        <div className="flex gap-3 items-center">
          <TbNotesOff className="text-2xl" />
          <div className="text-sm">
            <p>Warranty not available</p>
          </div>
          <p className="ml-2 font-semibold"></p>
        </div>
      </div>
      </div>
    </div>
  );
}

export default DeliveryDetails;
