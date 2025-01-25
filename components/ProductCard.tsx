import React from "react";
import Image from "next/image";
import Rating from "./utility/Rating";
import Link from "next/link";

function ProductCard({ product }: { product: any }) {

  return (
    <Link
      href={`/product/${product.$id}`}
      className="group/card hover:scale-[1.015] transition-all h-auto flex flex-col items-center justify-between rounded-md bg-white"
    >
      <div className="relative my-4 w-[170px] h-[150px]">
        <Image
          className="mix-blend-multiply"
          priority
          src={product.image}
          alt={product.title}
          fill
        />
      </div>
      <div className="w-full h-[43%] flex justify-around flex-col p-3 bg-main text-white rounded-b-md">
        <h1 className="text-sm font-semibold line-clamp-2 mb-1 group/edit group-hover/card:text-blue-500">
          {product.title}
        </h1>
        <p className="text-sm text-gray-500 line-clamp-1 ">{product.description}</p>
        <Rating rating={product.rating} />
        <h1 className="font-semibold text-price">{`$${product.price}`}</h1>
      </div>
    </Link>
  );
}

export default ProductCard;
