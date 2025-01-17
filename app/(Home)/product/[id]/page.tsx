"use client";
import DeliveryDetails from "@/components/DeliveryDetails";
import ProductDetails from "@/components/ProductDetails";
import Loadder from "@/components/utility/Loadder";
import useProduct from "@/hooks/product";
import { useParams } from "next/navigation";
import React, { useEffect, useRef } from "react";

function Product() {
  const { getSingleData, singleData, loading, error } = useProduct();
  const { id } = useParams();
  const ref = useRef(getSingleData);
  useEffect(() => {
    ref.current(id);
  }, [id, ref]);

  return (
    <div className="p-2">
      {loading ? (
        <Loadder/>
      ) : error ? (
        <h2 className="text-center text-xl font-bold text-white">
          There was an error.
        </h2>
      ) : (
        <div className="flex m-10 p-5 bg-white gap-10">
          <ProductDetails product={singleData} />
          <DeliveryDetails />
        </div>
      )}
    </div>
  );
}

export default Product;
