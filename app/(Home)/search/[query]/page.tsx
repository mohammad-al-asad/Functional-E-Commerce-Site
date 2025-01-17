"use client";
import useProduct from "@/hooks/product";
import { useParams } from "next/navigation";
import Result from "@/components/Result";
import React, { useEffect, useRef } from "react";
import Loadder from "@/components/utility/Loadder";

function Query() {
  const { query } = useParams();
  const { filteredData, getFilteredData, loading, error } = useProduct();
  const ref = useRef(getFilteredData);
  useEffect(() => {
    ref.current(query.toString());
  }, [ref, query]);

  return (
    <div className="p-2">
      {loading ? (
        <Loadder/>
      ) : error ? (
        <h2 className="text-center text-xl font-bold text-white">
          There was an error.
        </h2>
      ) : (
        <Result filteredProduct={filteredData} query={query} />
      )}
    </div>
  );
}

export default Query;
