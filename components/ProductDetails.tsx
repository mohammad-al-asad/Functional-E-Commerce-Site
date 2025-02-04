"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Rating from "@/components/utility/Rating";
import { addToCart } from "@/lib/redux/CartSlice";
import { useToast } from "@/hooks/use-toast";
import { AppDispatch, RootState } from "@/lib/redux";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "./ui/button";
import { debouncer } from "@/helpers/debouncer";
import { useRouter } from "next/navigation";
import { putItems } from "@/lib/redux/SelectedCart";
import NotFound from "./utility/NotFound";

function ProductDetails({ res }: { res: any }) {
  const [product, setProduct] = useState<any>(null);
  useEffect(() => {
    res.then((value:any)=>setProduct(value))
  }, [res.value]);

  const dispatch = useDispatch<AppDispatch>();
  const user: any = useSelector((state: RootState) => state.auth.user);
  const { toast } = useToast();
  const router = useRouter();

  async function addItem() {
    try {
      debouncer(async () => {
        await dispatch(addToCart({ product, userId: user.$id }));

        toast({
          title: "Added to cart",
        });
      })();
    } catch (error: any) {
      toast({
        title: "Error adding to cart",
        description: error.message,
      });
    }
  }
  if (product)
    return (
      <div className="grid grid-rows-2 place-items-center gap-3 lg:grid-rows-1 lg:grid-cols-2 w-fit md:w-[50%] lg:w-[65%] text-white bg-main p-3 rounded-lg">
        <div className="relative bg-white rounded-md w-[350px] h-[300px] md:w-full lg:h-full">
          <Image className="p-4" src={product.image} alt={product.title} fill />
        </div>

        <div className="my-auto p-4 w-[350px] md:w-[365px] lg:w-full">
          <h1 className="text-xl font-semibold">{product.title}</h1>
          <p className="my-3 line-clamp-5">{product.description}</p>
          <Rating rating={product.rating} />

          <h1 className="text-main text-3xl font-semibold">{`$${product.price}`}</h1>
          <div className="buttons flex gap-5">
            <Button
              onClick={() => {
                dispatch(
                  putItems([
                    {
                      product: { ...product },
                      count: 1,
                      userId: user.$id,
                      isSelected: true,
                    },
                  ])
                );
                router.push("/checkout");
              }}
              className="bg-blue-500 w-60 hover:bg-blue-400"
            >
              Buy Now
            </Button>
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
  if (!product)
    return (
      <div className="bg-gray-800 w-full h-full absolute top-0">
        <NotFound text="Product not found" />
      </div>
    );
}

export default ProductDetails;
