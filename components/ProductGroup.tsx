"use client";
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import NotFound from "./utility/NotFound";

function ProductGroup({ res }: { res: any }) {
  const [products, setProducts] = useState<any>(null);
  useEffect(() => {
    res.then((value: any) => setProducts(value.documents));
  }, [res]);

  if (!products || products.length === 0) return <NotFound text="No product found" />;
  if (products)
    return (
      <div className="grid grid-cols-2 lg:grid-cols-5 md:grid-cols-4 gap-y-6 gap-x-4">
        {products.map((product: any) => {
          return <ProductCard key={product.$id} product={product} />;
        })}
      </div>
    );
}

export default ProductGroup;
