import React from "react";

import ProductCard from "./ProductCard";

function ProductGroup({ products }: { products: any }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-6 md:grid-cols-4 gap-y-6 gap-x-4">
      {products.map((product: any) => {
        return (
          <ProductCard key={product.$id} product={product}/>
        );
      })}
    </div>
  );
}

export default ProductGroup;
