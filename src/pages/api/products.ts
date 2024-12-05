 
import { NextApiRequest, NextApiResponse } from 'next';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { rows } = await pool.query('SELECT p.product_id, p.product_name, p.product_description, p.product_price, p.product_image, a.artisan_firstname, a.artisan_lastname FROM public.product p JOIN public.artisan a ON p.artisan_id = a.artisan_id ORDER BY p.product_id ASC;');
    
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
}
