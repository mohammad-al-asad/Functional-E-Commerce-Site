import ProductGroup from "@/components/ProductGroup";
import { databases, db, productCollection } from "@/lib/Appwrite";

export default function Home() {
  const res = databases.listDocuments(db, productCollection);

  return (
    <div className="p-5 lg:p-12">
      <h2 className="font-bold md:text-3xl text-2xl my-5 text-center text-white bg-main border-b-8 p-4 md:p-6 rounded-t-md">
        Our Products
      </h2>
      <ProductGroup res={res} />
    </div>
  );
}
