'use client';

import { Product, Review } from '@/app/lib/definitions';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { use } from 'react';
import ReviewForm from '@/app/ui/products/review-form';

const ProductDetailsPage = ({ params }: { params: Promise<{ product_id: string }> }) => {
  const resolvedParams = use(params); 
  const product_id = resolvedParams.product_id;
  
  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReview] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    document.title = "Product Details";
  }, []);

  useEffect(() => {
    if (product_id) {
      const fetchProductDetails = async () => {
        try {
          const response = await fetch(`/api/prodDetails?product_id=${product_id}`);
          if (!response.ok) {
            throw new Error('Failed to fetch product details');
          }
          const data = await response.json();
          console.log("Product Data fetched", data.rows)
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

  useEffect(() => {
    if (product_id) {
      const fetchProdReviews = async () => {
        try {
          const response = await fetch(`/api/reviews?product_id=${product_id}`);
          if (!response.ok) {
            throw new Error('Failed to fetch product reviews');
          }
          const data = await response.json();
          setReview(data);
        } catch (err) {
          setError((err as Error).message);
        } finally {
          setLoading(false);
        }
      };
      fetchProdReviews();
    }
  }, [product_id]);

  if (loading) return <p>Loading product details...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <div className="main-body py-8 px-4 sm:px-8">
      <div className="product-details">
        <h1 className="text-4xl text-center text-secondary font-sancreek font-semibold mb-4">{product.product_name}</h1>
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
          <div className="details-info flex flex-col p-4 sm:p-6 bg-accent1  rounded-lg shadow-lg">
            <p><strong>Artisan: </strong> {`${product.artisan_firstname} ${product.artisan_lastname}`} </p>
            <h3 className="text-xl font-semibold mb-2">Description:</h3>
            <p className="mb-4">{product.product_description}</p>
            <h3 className="text-xl font-semibold mb-2">{`Price: $${product.product_price}`}</h3>

          </div>
        </div>
      </div>

      {/* Product Reviews Section */}
      <div className="mt-8">
        <div className="bg-accent1  rounded-lg p-6">
          <h1 className="text-center text-2xl font-semibold mb-4">Product Reviews</h1>
          {reviews.length === 0 ? (
            <p className="text-center text-secondary">No reviews for this product yet.</p>
          ) : (
            <ul className="list-decimal pl-5 space-y-4">
              {reviews.map((review, index) => (
                <li
                  key={review.product_id}
                  className="bg-accent1 p-4 flex flex-col"
                >
                  <p><strong>Review #{index + 1}: </strong></p>
                  <p><strong> Rating:</strong> {review.review_rating}</p>
                  <p><strong> Comment:</strong> {review.review_comment}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div>
        {/* {session && ( */}
          <ReviewForm productId={product_id}/>
        {/* )} */}
      </div>


    </div>
  );
};

export default ProductDetailsPage;
