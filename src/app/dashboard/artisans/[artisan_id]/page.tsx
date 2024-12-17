'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Artisan, Product } from "@/app/lib/definitions";
import Link from 'next/link';
import { use } from 'react'; // Ensure use is imported

const ArtisanProfilePage = ({ params }: { params: Promise<{ artisan_id: string }> }) => {
  const resolvedParams = use(params); // Unwrap the promise
  const artisan_id = resolvedParams.artisan_id;

  const [artisan, setArtisan] = useState<Artisan | null>(null);
  const [products, setProducts] = useState<Product[]>([]); 
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    document.title = "Artisan Profile";
  }, []);

  useEffect(() => {
    if (!artisan_id) return;

    const fetchArtisanDetails = async () => {
      try {
        const response = await fetch(`/api/profile?artisan_id=${artisan_id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch artisan details");
        }

        const data: (Artisan & Product)[] = await response.json();
        if (data.length > 0) {
          const { artisan_id, artisan_firstname, artisan_lastname, artisan_bio } = data[0];
          setArtisan({ artisan_id, artisan_firstname, artisan_lastname, artisan_bio });

          const extractedProducts = data.map(({ 
            product_id, 
            product_name, 
            product_price, 
            product_description, 
            product_image, 
            category_id, 
            artisan_id, 
            artisan_firstname,
            artisan_lastname,
          }) => ({
            product_id,
            product_name,
            product_price,
            product_description,
            product_image,
            category_id,
            artisan_id,
            artisan_firstname,
            artisan_lastname,
          }));

          setProducts(extractedProducts);
        } else {
          setError("No artisan or products found.");
        }
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchArtisanDetails();
  }, [artisan_id]);

  if (loading) return <p className="text-center">Loading artisan details...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;
  if (!artisan) return <p className="text-center">Artisan not found</p>;

  return (
    <div className="main-body py-8 px-4 sm:px-8">
      {loading && <p className="text-secondary text-center">Loading Products...</p>}

      {error && <p className="text-red-500 text-center">Error: {error}</p>}

      {!loading && !error && products.length === 0 && (
          <p className="text-secondary text-center">No products found.</p>
      )}

      {!loading && !error && products.length > 0 && (
          <div className="product-details text-center">  {/* Center the entire content */}
            <h1 className="text-4xl text-secondary font-sancreek font-semibold mb-4 text-center">{artisan.artisan_firstname} {artisan.artisan_lastname}</h1>
            <div className="details-container grid grid-cols-1 gap-8 mx-auto">
              <h2 className="text-xl font-semibold mb-2">{artisan.artisan_bio}</h2>            
            </div>
            <ul className="grid grid-cols-[repeat(auto-fit,_minmax(min-content,_300px))] gap-4 max-w-full mx-auto justify-center">
            {products.map((product) => (
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
                      href={`/dashboard/product/${product.product_id}`}
                      className="text-secondary font-bold text-lg hover:underline"
                    >
                      {product.product_name}
                    </Link>
                    <h3 className="text-accent2 font-semibold text-xl mt-2">{`$${product.product_price}`}</h3>
                    <p className="text-secondary mt-2">{product.product_description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
    </div>
  );
};

export default ArtisanProfilePage;


