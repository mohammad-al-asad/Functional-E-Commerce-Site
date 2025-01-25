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

function Page() {
  const router = useRouter();

  const [user, setUser] = useState<any>(null);
  const authUser: any = useSelector((state: RootState) => state.auth.user);
  useEffect(() => {
    setUser(authUser);
    if (!authUser) {
      router.push("/sign-in");
    }
  }, [authUser, router]);

  return (
    <div className="bg-main w-2/3 mx-auto p-10 rounded-lg mt-4 flex flex-col justify-center relative">

      <ProfileAvatar user={user} setUser={setUser} />

      <ProfileName user={user} setUser={setUser} />

      <ChangePassword user={user} setUser={setUser} />

      <AdressForm user={user} setUser={setUser} />

      <ProfileEmail user={user} setUser={setUser} />

      <ProfilePhone user={user} setUser={setUser} />

      <ProfileLogout />

    </div>
  );
}

export default Page;
