"use client";
import CartItems from '@/components/CartItems';
import TotalCart from '@/components/TotalCart';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';

function CartPage() {
  const router = useRouter();
  const user = useSelector((state: any) => state.auth.user);
  
useEffect(() => {
  if(!user){
    router.replace("/sign-in");
  }
}, [router, user]);

  return (
    <div className="p-8 mx-24 flex justify-between h-[650px]">
      <CartItems/>
      <TotalCart/>
    </div>
  )
}

export default CartPage