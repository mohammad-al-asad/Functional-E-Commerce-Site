"use client";
import React, { useEffect, useState } from "react";

function SearchCounter({ res, query }: { res: any; query: string }) {
  const [searchLength, setSearchLength] = useState(0);

  useEffect(() => {
    res.then((value: any) => setSearchLength(value.documents.length));
  }, [res]);
  return (
    <h1 className="py-3 text-white font-[400]">
      {`${searchLength} items found for`} &quot;
      <span className="text-red-400 font-semibold">{query}</span>&quot;
    </h1>
  );
}

export default SearchCounter;
