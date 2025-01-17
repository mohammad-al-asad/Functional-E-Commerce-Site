"use client";
import Header from "@/components/Header";
import React from "react";

function HomeLayout({ children } : { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}

export default HomeLayout;
