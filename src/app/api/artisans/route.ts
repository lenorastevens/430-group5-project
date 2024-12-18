import { NextResponse } from 'next/server';
import { createPool } from '@vercel/postgres';

const pool = createPool({
  connectionString: process.env.POSTGRES_URL,
});

export async function GET() {
  let client;
  try {
    client = await pool.connect();
    const { rows } = await client.query(`
      SELECT 
        artisan_id, 
        artisan_firstname, 
        artisan_lastname, 
        artisan_bio 
      FROM artisan;
    `);

    return NextResponse.json(rows);
  } catch (error) {
    console.error("Error fetching artisans:", error);
    return NextResponse.json(
      { error: "Failed to fetch artisans" },
      { status: 500 }
    );
  } finally {
    if (client) client.release(); 
  }
}
