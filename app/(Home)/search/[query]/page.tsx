import { Query } from "appwrite";
import React from "react";
import ProductGroup from "@/components/ProductGroup";
import { databases, db, productCollection } from "@/lib/Appwrite";
import SearchCounter from "@/components/utility/SearchCounter";

function Page({ params }: { params: any }) {

  const res = databases.listDocuments(db, productCollection, [
    Query.search("title", params.query as string),
  ]);

  return (
    <div className="p-2">
      <div className="p-4 lg:p-8">
        <SearchCounter res={res} query={params.query} />
        <ProductGroup res={res} />
      </div>
    </div>
  );
}

export default Page;
