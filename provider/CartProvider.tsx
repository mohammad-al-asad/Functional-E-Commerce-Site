"use client";
import Loadder from "@/components/utility/Loadder";
import useAppwrite from "@/lib/Appwrite";
import React, { ReactNode, useEffect, useState } from "react";

function CartProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  const { fetch_User_Cart } = useAppwrite();

  useEffect(() => {
    (async function () {
      try {
        await fetch_User_Cart();
        setLoading(false);
      } catch (error: any) {
        console.log(error.message);
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return <Loadder />;
  } else {
    return <>{children}</>;
  }
}

export default CartProvider;
