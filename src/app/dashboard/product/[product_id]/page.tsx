'use client';

import { Product } from '@/app/lib/definitions';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { use } from 'react';

const ProductDetailsPage = ({ params }: { params: Promise<{ product_id: string }> }) => {
  const resolvedParams = use(params); // Unwrap the `params` Promise here
  const product_id = resolvedParams.product_id;
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (product_id) {
      const fetchProductDetails = async () => {
        try {
          const response = await fetch(`/api/prodDetails?product_id=${product_id}`);
          if (!response.ok) {
            throw new Error('Failed to fetch product details');
          }
          const data = await response.json();
          setProduct(data[0]);
        } catch (err) {
          setError((err as Error).message);
        } finally {
          setLoading(false);
        }
      };

      fetchProductDetails();
    }
  }, [product_id]);

  if (loading) return <p>Loading product details...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <div className="main-body py-8 px-4 sm:px-8">
      <div className="product-details">
        <h1 className="text-3xl font-semibold mb-4">{product.product_name}</h1>
        <div className="details-container grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="details-img rounded-lg overflow-hidden w-full h-auto">
            <Image
              src={`/images/${product.product_image}`}
              alt={`Image of ${product.product_name}`}
              width={500}
              height={500}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="details-info flex flex-col p-4 sm:p-6 bg-accent1 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-2">{`Price: $${product.product_price}`}</h3>
            <p className="mb-4">{product.product_description}</p>
            <p>{`Artisan: ${product.artisan_firstname} ${product.artisan_lastname}`}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
