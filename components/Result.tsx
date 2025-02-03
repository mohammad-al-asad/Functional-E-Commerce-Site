import React from "react";
import ProductCard from "./ProductCard";
import ProductGroup from "./ProductGroup";

function Result({
  filteredProduct,
  query,
}: {
  filteredProduct: any;
  query: any;
}) {
  return (
    <div className="p-4 lg:p-8">
      <h1 className="py-3 text-white font-[400]">{`${filteredProduct.length} items found for`} &quot;<span className="text-red-400 font-semibold">{query}</span>&quot;</h1>
      <ProductGroup products={filteredProduct}/>
    </div>
  );
}

export default Result;
