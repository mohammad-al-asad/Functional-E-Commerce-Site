"use client"
import React, { useEffect, useState } from "react";
import { TbTruckDelivery } from "react-icons/tb";
import { BiMoneyWithdraw } from "react-icons/bi";
import { TbTruckReturn } from "react-icons/tb";
import { TbNotesOff } from "react-icons/tb";
import AddressForm from "./AddressForm";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux";

function DeliveryDetails() {
    const [user, setUser] = useState<any>(null);
    const authUser: any = useSelector((state: RootState) => state.auth.user);
    useEffect(() => {
      setUser(authUser);
    }, [authUser]);
  return (
    <div className="w-full bg-main text-white md:w-[45%] lg:w-[30%] h-fit rounded-lg p-5 text-sm">
        <p className="mb-3">Delivery</p>
      <div>
        <AddressForm user={user} setUser={setUser}/>

        <div className="flex gap-3 items-center mb-4">
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
