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
      `SELECT * FROM review WHERE product_id = $1`,
      [productId]
    );
    return new Response(JSON.stringify(rows), {
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching product reviews:", error);
    return new Response('Failed to fetch product details', { status: 500 });
  }
}
