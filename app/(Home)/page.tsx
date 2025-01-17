"use client";
import ProductGroup from "@/components/ProductGroup";
import Loadder from "@/components/utility/Loadder";
import useProduct from "@/hooks/product";
import { useEffect, useRef } from "react";

export default function Home() {
  const { getAllData, allData, loading } = useProduct();
  const ref = useRef(getAllData);
  useEffect(() => {
    ref.current();
  }, [ref]);

  if (loading) return <Loadder />;
  return (
      <div className="p-10">
        <div>
          <h2 className="font-bold text-2xl py-3 text-white">Flash Sale</h2>
          <ProductGroup products={allData} />
        </div>
        <div>
          <h2 className="font-bold text-2xl py-3 mt-6 text-white">For You</h2>
          <ProductGroup products={allData} />
        </div>
      </div>
  );
}
