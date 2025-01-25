import { useState } from "react";
import { Query } from "appwrite";
import { databases, db } from "@/lib/Appwrite";

const productCollection = "678071e2002d6fc2a823"
export default function useProduct() {
  const [allData, setAllData] = useState<any>([]);
  const [filteredData, setFilteredData] = useState<any>([]);
  const [singleData, setSingleData] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  async function getAllData() {
    setError(false);
    setLoading(true);
    try{
      const { documents } = await databases.listDocuments(db,productCollection);
      setAllData(documents);
      setLoading(false);
    }catch(error:any){
      setError(true);
      setLoading(false);
      console.log(error.message);
    }
  }

  async function getFilteredData(query: string) {
    setError(false);
    setLoading(true);
    try {
      const {documents} = await databases.listDocuments(db,productCollection,[Query.search("title",query)]);
      setFilteredData(documents);
      setLoading(false);
    } catch (error:any) {
      setError(true);
      setLoading(false);
      console.log(error.message);
    }
  }

  async function getSingleData(id: any) {
    setError(false);
    setLoading(true);
    try {
      const document = await databases.getDocument(db,productCollection,id);
      setSingleData(document);
      
      setLoading(false);
    } catch (error:any) {
      setError(true);
      setLoading(false);
      console.log(error.message);
    }
  }

  return {
    allData,
    getAllData,
    filteredData,
    getFilteredData,
    singleData,
    getSingleData,
    loading,
    error
  };
}

