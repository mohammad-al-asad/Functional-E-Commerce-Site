"use client";
import React, { useEffect, useState } from "react";
import { IoLocationOutline } from "react-icons/io5";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import AddressForm from "./AddressForm";
import { RootState } from "@/lib/redux";
import { useSelector } from "react-redux";

function TotalCart() {
  const [user, setUser] = useState<any>(null);
  const authUser: any = useSelector((state: RootState) => state.auth.user);
  useEffect(() => {
    setUser(authUser);
  }, [authUser]);
  return (
    <div className="w-[35%] h-fit bg-main text-white p-6 text-sm rounded-lg">
      <p className="mb-2">Total</p>

      <AddressForm user={user} setUser={setUser} />

      <div className="space-y-3">
      <h2 className="text-lg font-semibold">Order Summary</h2>
      <div className="flex justify-between">
        <p>Subtotal (0 items)</p>
        <p className="font-semibold">$ 0</p>
      </div>

      <div className="flex justify-between">
        <p>Shiping Fee</p>
        <p className="font-semibold">$ 0</p>
      </div>

      <form>
        <div className="flex">
          <Input type="text" placeholder="Enter Voucher Code" />
          <Button
            className="bg-blue-500 hover:bg-blue-400 ml-2 text-white"
            type="submit"
          >
            Apply
          </Button>
        </div>
      </form>

      <div className="flex justify-between">
        <p>Total</p>
        <p className="font-semibold">$ 0</p>
      </div>
      <Button
        variant="outline"
        className="w-full bg-main ml-2 p-2 text-white"
        type="submit"
      >
        PROCCED TO CHECKOUT(0)
      </Button>
      </div>
    </div>
  );
}

export default TotalCart;
