import 'dotenv/config';

import { createPool } from '@vercel/postgres';

console.log("Initializing Database Pool...");

const pool = createPool({ connectionString: process.env.POSTGRES_URL });

console.log("Pool created. Connection String:", process.env.POSTGRES_URL);

export async function fetchSearchCategories() {
  try {
    console.log("Attempting to connect to the database...");
    const client = await pool.connect();
    console.log("Database client connected successfully.");

    console.log("Executing query to fetch categories...");
    const { rows } = await client.query('SELECT * FROM category;');
    client.release();
    console.log("Fetched categories successfully:", rows);

    return rows;
  } catch (error) {
    console.error("Database Error (fetchSearchCategories):", error);
    console.error("Error Stack Trace:", error);
    throw new Error("Failed to fetch categories.");
  }
}

export async function fetchProdData() {
  try {
    console.log("Attempting to connect to the database...");
    const client = await pool.connect();
    console.log("Database client connected successfully.");

    console.log("Executing query to fetch product data...");
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
      FROM public.product p 
      JOIN public.artisan a ON p.artisan_id = a.artisan_id 
      ORDER BY p.product_id ASC;
    `);
    client.release();
    console.log("Fetched product data successfully:", rows);

    return rows;
  } catch (error) {
    console.error("Database Error (fetchProdData):", error);
    console.error("Error Stack Trace:", error);
    throw new Error("Failed to fetch product data.");
  }
}
