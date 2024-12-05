'use client';
// import GlassBoxImage from '@/components/productImages/GlassBox';
// import StoneVaseImage from '@/components/productImages/StoneVase';
// import WovenBasketsImage from '@/components/productImages/WovenBaskets';
// import ClayVasesImage from '@/components/productImages/ClayVases';
import Link from 'next/link';
import { useEffect, useState } from "react";
import Image from 'next/image';


interface Product {
  product_id: number;
  product_name: string;
  product_description: string;
  product_price: number;
  product_image: string;
  artisan_id: number;
  category_id: number;
  artisan_firstname: string;
  artisan_lastname: string;
}

const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetch("/api/products");
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  return response.json();
}

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    document.title = 'Products';
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

    return (
             
        <div className='main-body'>
          <h1>Products Page</h1>

          {loading && <p> Loading Products...</p>}
          
          {error && <p>Error: {error}</p>}

          {!loading && !error && products.length === 0 && (
            <p>No artisans found.</p>
          )}

          {!loading && !error && products.length > 0 && (
            <ul className='card-container'>
              {products.map((product) => (
              <li key={product.product_id} className='prod-card'>
                <div className='prod-img'>
                  <Link href={{
                      pathname: "/product/details",
                      query: { artisan_id: product.artisan_id, product_id: product.product_id },
                    }}>
                    <Image
                      src={`/images/${product.product_image}`}
                      alt= {`Product image of ${product.product_name}`}
                      layout='responsive'
                      width= {16}
                      height= {9}
                      className='prod-img'
                    />
                  </Link>
                </div>
                <div className='prod-details'>
                  <Link
                    href={{
                      pathname: "/product/details",
                      query: { artisan_id: product.artisan_id, product_id: product.product_id },
                    }}
                    className="prod-name"
                  >
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

