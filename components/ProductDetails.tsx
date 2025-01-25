import Image from "next/image";
import React from "react";
import Rating from "@/components/utility/Rating";
import { addToCart } from "@/lib/redux/CartSlice";
import { useToast } from "@/hooks/use-toast";
import { AppDispatch, RootState } from "@/lib/redux";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "./ui/button";

function ProductDetails({ product }: { product: any }) {
  const dispatch = useDispatch<AppDispatch>();
  const user: any = useSelector((state: RootState) => state.auth.user);
  const { toast } = useToast();
  let counterId: any;
  function addItem() {
    try {
      clearTimeout(counterId);
      counterId = setTimeout(async () => {
        dispatch(addToCart({ product, userId: user.$id }));

        toast({
          title: "Added to cart",
        });
      }, 800);
    } catch (error: any) {
      toast({
        title: "Error adding to cart",
        description: error.message,
      });
    }
  }
  return (
    <div className="grid grid-cols-2 w-[70%] text-white bg-main p-3">
      <div className="relative mr-3 bg-white rounded-md">
        <Image className="p-4" src={product.image} alt={product.title} fill />
      </div>
      <div className="my-auto p-4">
        <h1 className="text-xl font-semibold">{product.title}</h1>
        <p className="my-3 line-clamp-6">{product.description}</p>
        <Rating rating={product.rating} />

        <h1 className="text-main text-3xl font-semibold">{`$${product.price}`}</h1>
        <div className="buttons flex gap-5">
          <Button className="bg-blue-500 w-60 hover:bg-blue-400">Buy Now</Button>
          <Button
          variant="outline"
            onClick={() => {
              if (user) {
                addItem();
              } else {
                toast({
                  title: "Please login to add to cart",
                });
              }
            }}
            className="bg-main p-3 w-60 text-white"
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
