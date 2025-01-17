"use client";
import { Button } from "@/components/ui/button";
import { account } from "@/lib/Appwrite";
import { clearUser } from "@/lib/redux/AuthSlice";
import { useRouter } from "next/navigation";
import React from "react";
import { useDispatch } from "react-redux";

function Page() {
  const router = useRouter();
  const dispatch = useDispatch();
  return (
    <div>
      <Button
        onClick={() => {
          account.deleteSession("current");
          dispatch(clearUser());
          router.push("/");
        }}
      >
        Logout
      </Button>
    </div>
  );
}

export default Page;
