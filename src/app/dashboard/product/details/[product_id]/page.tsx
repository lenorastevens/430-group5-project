"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Product } from '@/app/ui/Product';

const ProductDetailsPage = ({ params }: { params: Promise<{ product_id: string }> }) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [product_id, setProductId] = useState<string | null>(null);

  useEffect(() => {
    const fetchParams = async () => {
      try {
        const resolvedParams = await params;
        setProductId(resolvedParams.product_id);
      } catch {
        setError('Failed to fetch parameters');
      }
    };

    fetchParams();
  }, [params]);

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
    <div className='main-body'>
      <div className="product-details">
        <h1 className='prod-title'>{product.product_name}</h1>
        <div className='details-container'>
          <div className='details-img'>
            <Image
              src={`/images/${product.product_image}`}
              alt={`Image of ${product.product_name}`}
              width={500}
              height={500}
              className='details-img'
            />
          </div>
          <div className='details-info'>
            <h3>{`Price: $${product.product_price}`}</h3>
            <p>{product.product_description}</p>
            <p>{`Artisan: ${product.artisan_firstname} ${product.artisan_lastname}`}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;