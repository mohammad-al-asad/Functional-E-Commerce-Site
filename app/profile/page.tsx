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
import NotFound from "@/components/utility/NotFound";

function Page() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const authUser: any = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    setUser(authUser);
    if (!authUser) {
      router.replace("/sign-in");
    }
  }, [authUser, router]);

  return (
    <div className="bg-main w-full md:w-[90%] lg:w-[75%] md:mt-10 md:rounded-lg mx-auto p-8 h-screen md:h-fit flex flex-col justify-center relative">
      <ProfileAvatar user={user} setUser={setUser} />

      <ProfileName user={user} setUser={setUser} />

      <ChangePassword user={user} />

      <div className="grid grid-rows-2 md:grid-cols-2 md:grid-rows-none  lg:p-5">
        <div className="w-fit">
          <AdressForm user={user} setUser={setUser} />

          <ProfileEmail user={user} setUser={setUser} />

          <ProfilePhone user={user} setUser={setUser} />
        </div>

        <div className="text-white">
          <h1 className="mb-2 font-semibold text-md ml-1">All Orders</h1>
          <div className="font-semibold text-sm p-3 border">
            <div className="flex ml-1">
              <h3 className="w-40">OrderId</h3>
              <h3 className="w-16">Total</h3>
              <h3>Status</h3>
            </div>
            <div className="overflow-auto custom-scrollbar h-[200px]">
              {user?.orders && user.orders.length != 0 ? (
                user.orders.map((item: any) => (
                  <div
                    key={item.$id}
                    className="flex text-xs p-2 my-2 bg-gray-800 rounded"
                  >
                    <h3 className="w-40 truncate">{item.$id}</h3>
                    <h3 className="w-16 truncate">{item.totalPrice}</h3>
                    <h3 className="w-16 truncate">{item.status}</h3>
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
