"use client";
import Loadder from "@/components/utility/Loadder";
import { account } from "@/lib/Appwrite";
import { AppDispatch } from "@/lib/redux";
import { setUser } from "@/lib/redux/AuthSlice";
import { fetchCart } from "@/lib/redux/CartSlice";
import React, { ReactNode, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

function CartProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    async function fetch_User_Cart() {
      try {
        const user = await account.get();
        dispatch(setUser(user));
        dispatch(fetchCart(user.$id));
        setLoading(false);
      } catch (error: any) {
        setLoading(false);
        console.log(error.message);
      }
    }
    fetch_User_Cart();
  }, [dispatch]);

  if (loading) {
    return <Loadder />;
  } else {
    return <>{children}</>;
  }
}

export default CartProvider;
