"use client";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import AddressForm from "./AddressForm";
import { AppDispatch, RootState } from "@/lib/redux";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { putItems } from "@/lib/redux/SelectedCart";
import { useToast } from "@/hooks/use-toast";

function TotalCart() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  const { toast } = useToast();
  const dispatch = useDispatch<AppDispatch>();
  const authUser: any = useSelector((state: RootState) => state.auth.user);
  const cartItems = useSelector((state: RootState) => state.cart.cart);
  const [subtotal, setSubtotal] = useState(0);

  const shipping = 100;
  const selectedCartItems = React.useMemo(() => {
    return cartItems?.filter((item) => item.isSelected) || [];
  }, [cartItems]);

  useEffect(() => {
    setUser(authUser);
    let newSubtotal = 0;
    selectedCartItems.forEach((item) => {
      newSubtotal += item.product.price * item.count;
    });
    setSubtotal(parseFloat(newSubtotal.toFixed(2)));
  }, [authUser, selectedCartItems]);
  return (
    <div className="h-fit bg-main lg:mt-5 self-start text-white p-6 text-sm rounded-lg w-full lg:w-[600px]">
      <p className="mb-2">Total</p>

      <AddressForm user={user} setUser={setUser} />

      <div className="space-y-3">
        <h2 className="text-lg font-semibold">Order Summary</h2>
        <div className="flex justify-between">
          <p>Subtotal ({selectedCartItems.length} items)</p>
          <p className="font-semibold">$ {subtotal}</p>
        </div>

        <div className="flex justify-between">
          <p>Shiping Fee</p>
          <p className="font-semibold">$ {shipping}</p>
        </div>

        <form>
          <div className="flex text-main">
            <Input type="text" disabled placeholder="Enter Voucher Code" />
            <Button
              className="bg-blue-500 hover:bg-blue-400 ml-2 text-white"
              type="submit"
              disabled
            >
              Apply
            </Button>
          </div>
        </form>

        <div className="flex justify-between">
          <p>Total</p>
          <p className="font-semibold">$ {subtotal + shipping}</p>
        </div>
        <Button
          onClick={() => {
            if (cartItems.length === 0) {
              toast({
                title: "There is no cart to checkout",
              });
            } else {
              dispatch(putItems(selectedCartItems));
              router.push("/checkout");
            }
          }}
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
