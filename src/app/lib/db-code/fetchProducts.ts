import { Product } from "@/app/lib/definitions";

const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetch('/api/products');
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  return await response.json();
};

export default fetchProducts;