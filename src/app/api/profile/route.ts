
import { createPool } from '@vercel/postgres';

const pool = createPool({
  connectionString: process.env.POSTGRES_URL,
});

export async function GET(request: Request) {
  const url = new URL(request.url);
  const artisanId = url.searchParams.get('artisan_id');
  
  if (!artisanId) {
    return new Response('Artisan ID is required', { status: 400 });
  }

  console.log('artisanId:', artisanId); // Debugging the artisanId value

  try {
    const client = await pool.connect();
    
    const { rows } = await client.query(
      `
      SELECT 
        artisan.artisan_firstname, 
        artisan.artisan_lastname, 
        artisan.artisan_bio,
        product.product_id, 
        product.product_name, 
        product.product_price, 
        product.product_description, 
        product.product_image, 
        product.category_id
      FROM artisan
      LEFT JOIN product ON artisan.artisan_id = product.artisan_id
      WHERE artisan.artisan_id = $1;
      `,
      [artisanId]
    );

    if (rows.length === 0) {
      return new Response('No artisan found with the provided ID', { status: 404 });
    }

    return new Response(JSON.stringify(rows), { status: 200 });
  } catch (error) {
    console.error("Error fetching artisan:", error);
    return new Response('Failed to fetch artisan details', { status: 500 });
  }
}
