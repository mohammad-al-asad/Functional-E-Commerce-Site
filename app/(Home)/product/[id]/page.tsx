import ProductDetails from "@/components/ProductDetails";
import React from "react";
import { databases, db, productCollection } from "@/lib/Appwrite";
import DeliveryDetails from "@/components/DeliveryDetails";

export const dynamicParams = false;
export async function generateStaticParams() {
  const { documents: products } = await databases.listDocuments(
    db,
    productCollection
  );
  return products.map(({ $id }) => ({ id: $id }));
}

function Page({ params }: { params: any }) {
  const res = databases.getDocument(db, productCollection, params.id);
  return (
    <div className="p-2">
      <div className="flex flex-wrap gap-2 mt-8 mb-0 justify-center">
        <ProductDetails res={res} />
        <DeliveryDetails />
      </div>
    </div>
  );
}

export default Page;
