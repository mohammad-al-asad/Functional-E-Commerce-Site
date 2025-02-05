import { databases, db, productCollection } from "@/lib/Appwrite";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { documents } = await databases.listDocuments(db, productCollection);
  const productEntries: MetadataRoute.Sitemap = documents.map(({$id})=>({
    url:`${process.env.NEXT_PUBLIC_BASE_URL}/product/${$id}`
  }))

  return [
    {url:`${process.env.NEXT_PUBLIC_BASE_URL}/`},
    ...productEntries
  ];
}
