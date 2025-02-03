"use client";
import NotFound from "@/components/utility/NotFound";
import ProductGroup from "@/components/ProductGroup";
import Loadder from "@/components/utility/Loadder";
import useProduct from "@/hooks/useProduct";
import { useEffect, useRef } from "react";

export default function Home() {
  const { getAllData, allData, loading, error } = useProduct();
  const ref = useRef(getAllData);

  useEffect(() => {
    ref.current();
  }, [ref]);

  if (loading) return <Loadder />;
  if (error) return <NotFound text="No product found" />;
  return (
    <div className="p-5 lg:p-12">
      <h2 className="font-bold text-2xl md:text-3xl my-3 text-center text-white bg-red-600">
        Our Products
      </h2>
      <ProductGroup products={allData} />
    </div>
  );
}
