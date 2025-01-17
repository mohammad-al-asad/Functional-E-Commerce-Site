import React from "react";
import ProductCard from "./ProductCard";

function Result({
  filteredProduct,
  query,
}: {
  filteredProduct: any;
  query: any;
}) {
  return (
    <div className="px-10">
      <h1 className="py-3 text-white font-[400]">{`${filteredProduct.length} items found for`} &quot;<span className="text-red-400 font-semibold">{query}</span>&quot;</h1>
      <div className="grid grid-cols-5 gap-5">
      {filteredProduct.map((item:any,index:number)=><ProductCard product={item} key={index}/>)}
      </div>
    </div>
  );
}

export default Result;
