import { NextResponse } from 'next/server';
import { createPool } from '@vercel/postgres';

const pool = createPool({
  connectionString: process.env.POSTGRES_URL,
});

export async function GET() {
  try {
    const client = await pool.connect();
    const { rows } = await client.query(`
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
    `);
    client.release();
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}
