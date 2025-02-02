"use client";
import Header from "@/components/Header";
import React from "react";

function HomeLayout({ children } : { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div className="mt-56 lg:mt-20">
      {children}
      </div>
    </>
  );
}

export default HomeLayout;
