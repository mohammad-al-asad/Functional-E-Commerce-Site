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
    <div className="p-2 md:p-6 flex flex-wrap items-center justify-center gap-4">
      <CartItems/>
      <TotalCart/>
    </div>
  )
}

export default CartPage