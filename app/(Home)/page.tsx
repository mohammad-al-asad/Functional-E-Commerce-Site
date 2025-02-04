import ProductGroup from "@/components/ProductGroup";
import { databases, db, productCollection } from "@/lib/Appwrite";

export default function Home() {
  const res = databases.listDocuments(db, productCollection);

  return (
    <div className="p-5 lg:p-12">
      <h2 className="font-bold text-2xl md:text-3xl my-3 text-center text-white bg-red-600">
        Our Products
      </h2>
      <ProductGroup res={res} />
    </div>
  );
}
