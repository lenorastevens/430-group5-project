'use client';

import { useEffect, useState } from "react";
import { Product } from "@/interfaces/Product";
import Link from 'next/link';
import Image from 'next/image';
import { useFilter } from '@/context/FilterContext'; 

const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetch("/api/products");
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  const data = await response.json();
  return data.flat(); 
};

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
    <div className="main-body">
      <h1>Products Page</h1>

      {loading && <p>Loading Products...</p>}

      {error && <p>Error: {error}</p>}

      {!loading && !error && filteredProducts.length === 0 && <p>No products found.</p>}

      {!loading && !error && filteredProducts.length > 0 && (
        <ul className="card-container">
          {filteredProducts.map((product) => (
            <li key={product.product_id} className="prod-card">
              <div className="prod-img">
                <Link href={`/product/details/${product.product_id}`}>
                  <Image
                    src={`/images/${product.product_image}`}
                    alt={`Product image of ${product.product_name}`}
                    width={500}
                    height={500}
                    className="prod-img"
                  />
                </Link>
              </div>
              <div className="prod-details">
                <Link href={`/product/details/${product.product_id}`}>
                  <h2>{product.product_name}</h2>
                </Link>
                <h3>{`$ ${product.product_price}`}</h3>
                <p>{product.product_description}</p>
                <p>{`${product.artisan_firstname} ${product.artisan_lastname}`}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductsPage;
