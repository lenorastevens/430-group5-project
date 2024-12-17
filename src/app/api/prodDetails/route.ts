import { createPool } from '@vercel/postgres';

const pool = createPool({
  connectionString: process.env.POSTGRES_URL,
});

export async function GET(request: Request) {
  const url = new URL(request.url);
  const productId = url.searchParams.get('product_id');
  
  if (!productId) {
    return new Response('Product ID is required', { status: 400 });
  }

  try {
    const client = await pool.connect();
    const { rows } = await client.query(
      `
      SELECT 
        p.product_id,
        p.product_name,
        p.product_description,
        p.product_price,
        p.product_image,
        p.category_id,
        a.artisan_firstname,
        a.artisan_lastname
      FROM product p
      INNER JOIN artisan a ON p.artisan_id = a.artisan_id
      WHERE product_id = $1
      `,
      [productId]
    );
    return new Response(JSON.stringify(rows), {
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching product:", error);
    return new Response('Failed to fetch product details', { status: 500 });
  }
}
