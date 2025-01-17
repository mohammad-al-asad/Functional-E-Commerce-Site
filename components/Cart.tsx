import React from "react";
import CartItems from "./CartItems";
import TotalCart from "./TotalCart";


function Cart() {

  return (
    <div className="p-8 mx-24 flex justify-between">
      <CartItems/>
      <TotalCart/>
    </div>
  );
}

export default Cart;
