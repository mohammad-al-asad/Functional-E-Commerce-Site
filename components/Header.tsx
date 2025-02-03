"use client";
import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { TbWorld } from "react-icons/tb";
import { IoCartOutline } from "react-icons/io5";
import { FaAngleDown } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "./ui/button";
import { RootState } from "@/lib/redux";
import { useSelector } from "react-redux";
import Image from "next/image";
import { Input } from "./ui/input";

function Header() {
  const [search, setSearch] = useState<string>("");
  const router = useRouter();
  const user: any = useSelector((state: RootState) => state.auth.user);

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (search.length < 2) return;
    router.push(`/search/${search}`);
  };

  return (
    <div className="bg-main grid grid-rows-3 lg:gap-4 lg:grid-rows-1 lg:grid-cols-3 place-items-center p-4 justify-around items-center fixed top-0 w-full z-50">
      <div className="flex w-[300px]">
        <div className="w-max h-full p-4 pr-1">
          <h1 className="text-red-600 font-[1000] text-3xl">|</h1>
        </div>
        <div
          onClick={() => router.push("/")}
          className="w-max p-4 pl-0 cursor-pointer"
        >
          <h1 className="text-white font-[700] text-3xl">THE COMMERCE</h1>
        </div>
      </div>

      <div className="relative h-12 w-full hidden lg:inline-grid">
        <Input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search in The Commerce"
          className="w-full h-full rounded-lg pr-14"
        />
        <Button
          onClick={handleSubmit}
          type="submit"
          className="absolute top-[4px] right-[4px] bg-red-600 hover:bg-red-400 text-white h-10 w-10 grid place-items-center rounded-lg"
        >
          <FaSearch />
        </Button>
      </div>

      <div className="flex justify-around gap-4 w-[300px]">
        {user ? (
          //  For user //
          <Link
            href="/profile"
            className="flex justify-center items-center gap-1.5 text-white"
          >
            <div className="w-[36px] h-[36px] relative">
              <Image
                fill
                className="rounded-full object-fill border-2"
                src={user.avatar}
                alt={user.name}
              />
            </div>
            <p className="w-20 text-md truncate">{user.name}</p>
          </Link>
        ) : (
          //  For guest //
          <>
            <Link
              href="/sign-in"
              className="flex justify-center items-center gap-1 text-white"
            >
              <CgProfile size={30} />
              Login
            </Link>
            <Link
              href="/sign-up"
              className="flex justify-center items-center gap-1 text-white"
            >
              Sign Up
            </Link>
          </>
        )}

        <div className="flex justify-center items-center gap-1 text-white">
          <TbWorld size={30} />
          <select
            className="text-white bg-transparent outline-none"
            name="lan"
            id="lan"
          >
            <option className="bg-main" value="en">
              EN
            </option>
            <option className="bg-main" value="bn">
              BN
            </option>
            <FaAngleDown />
          </select>
        </div>
        <Link
          href="/cart"
          className="flex justify-center items-center gap-1 text-white"
        >
          <IoCartOutline size={30} />
        </Link>
      </div>

      <div className="relative h-12 w-full lg:hidden">
        <Input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search in The Commerce"
          className="w-full h-full rounded-lg pr-14"
        />
        <Button
          onClick={handleSubmit}
          type="submit"
          className="absolute top-[4px] right-[4px] bg-red-600 hover:bg-red-400 text-white h-10 w-10 grid place-items-center rounded-lg"
        >
          <FaSearch />
        </Button>
      </div>
    </div>
  );
}

export default Header;
