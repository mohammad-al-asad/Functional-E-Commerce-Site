"use client";
import Cart from '@/components/Cart'
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';

function CartPage() {
  const router = useRouter();
  const user = useSelector((state: any) => state.auth.user);
  
useEffect(() => {
  if(!user){
    router.push("/sign-in");
  }
}, [router, user]);
  return (
    <div>
      <Cart/>
    </div>
  )
}

export default CartPage