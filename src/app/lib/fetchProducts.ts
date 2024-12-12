import { Product } from "@/app/lib/definitions";
import { fetchProdData } from "./data";

const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetchProdData(); 
  console.log("Product response", response)
  if (!Array.isArray(response)) {
    throw new Error("Failed to fetch products");
  }

  return response; 
};

export default fetchProducts;