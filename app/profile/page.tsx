"use client";
import { RootState } from "@/lib/redux";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProfileName from "@/components/ProfileName";
import ProfileLogout from "@/components/ProfileLogout";
import ProfileEmail from "@/components/ProfileEmail";
import ProfilePhone from "@/components/ProfilePhone";
import ChangePassword from "@/components/ChangePassword";
import ProfileAvatar from "@/components/ProfileAvatar";
import AdressForm from "@/components/AddressForm";
import { databases, db, orderCollection } from "@/lib/Appwrite";
import { Query } from "appwrite";
import NotFound from "@/components/NotFound";

function Page() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [order, setOrder] = useState<any>(null);
  const authUser: any = useSelector((state: RootState) => state.auth.user);

  async function fetchOrder() {
    if (user) {
      const { documents } = await databases.listDocuments(db, orderCollection, [
        Query.equal("userId", user.$id),
      ]);
      setOrder(documents);
    }
  }

  useEffect(() => {
    setUser(authUser);
    if (!authUser) {
      router.replace("/sign-in");
    }
    fetchOrder();
    console.log(order);
  }, [authUser, router]);

  return (
    <div className="bg-main w-2/3 mx-auto p-10 rounded-lg mt-4 flex flex-col justify-center relative">
      <ProfileAvatar user={user} setUser={setUser} />

      <ProfileName user={user} setUser={setUser} />

      <ChangePassword user={user} setUser={setUser} />

      <div className="flex justify-between">
        <div className="w-fit">
          <AdressForm user={user} setUser={setUser} />

          <ProfileEmail user={user} setUser={setUser} />

          <ProfilePhone user={user} setUser={setUser} />
        </div>

        <div className="text-white w-[45%]">
          <h1 className="mb-2 font-semibold text-md ml-1">All Orders</h1>
          {/* <hr /> */}
          <div className="font-semibold text-sm p-3 border">
            <div className="flex ml-1">
              <h3 className="w-40">OrderId</h3>
              <h3 className="w-16">Total</h3>
              <h3>Status</h3>
            </div>
            <div className="overflow-auto custom-scrollbar h-[200px]">
            {order && order.length != 0 ? (
              order.map((item: any) => (
                  <div className="flex text-xs p-2 my-2 bg-gray-800 rounded">
                  <h3 className="w-40 truncate">{item.$id}</h3>
                  <h3 className="w-16 truncate">{item.totalPrice}</h3>
                  <h3 className="w-16 truncate">{item.status}</h3>
                  <h3 className="text-blue-600 cursor-pointer hover:underline">Details</h3>
                </div>
              ))
            ) : (
              <NotFound text="No order to show" />
            )}
            </div>
          </div>
        </div>
      </div>

      <ProfileLogout />
    </div>
  );
}

export default Page;
