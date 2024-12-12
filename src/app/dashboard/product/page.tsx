'use client';

import { useEffect, useState } from "react";
import { Product } from "@/app/lib/definitions";
import Link from 'next/link';
import Image from 'next/image';
import { useFilter } from '@/app/ui/FilterContext'; 
import fetchProducts from '@/app/lib/fetchProducts';

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  
  const { selectedCategory, searchTerm } = useFilter();

  useEffect(() => {
    document.title = "Products";
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === '' || product.category_id === selectedCategory;
    const matchesSearchTerm =
      product.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.artisan_firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.artisan_lastname.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearchTerm;
  });

  return (
    <div className="bg-primary min-h-screen p-4">
      <h1 className="text-secondary text-2xl font-bold text-center mb-6">Products Page</h1>

      {loading && <p className="text-secondary text-center">Loading Products...</p>}

      {error && <p className="text-red-500 text-center">Error: {error}</p>}

      {!loading && !error && filteredProducts.length === 0 && (
        <p className="text-secondary text-center">No products found.</p>
      )}

      {!loading && !error && filteredProducts.length > 0 && (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto">
          {filteredProducts.map((product) => (
            <li
              key={product.product_id}
              className="bg-accent1 border-4 border-secondary rounded-lg shadow-md p-4 flex flex-col items-center"
            >
              <div className="flex justify-center items-center overflow-hidden rounded-lg mb-4">
                <Link href={`/product/details/${product.product_id}`}>
                  <Image
                    src={`/images/${product.product_image}`}
                    alt={`Product image of ${product.product_name}`}
                    width={500}
                    height={500}
                    className="max-h-[125px] w-auto object-contain"
                  />
                </Link>
              </div>
              <div className="text-center">
                <Link
                  href={`/product/details/${product.product_id}`}
                  className="text-secondary font-bold text-lg hover:underline"
                >
                  {product.product_name}
                </Link>
                <h3 className="text-accent2 font-semibold text-xl mt-2">{`$${product.product_price}`}</h3>
                <p className="text-secondary mt-2">{product.product_description}</p>
                <p className="text-secondary mt-1">{`${product.artisan_firstname} ${product.artisan_lastname}`}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductsPage;
