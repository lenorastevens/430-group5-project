 
import { NextApiRequest, NextApiResponse } from 'next';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { product_id } = req.query;

    if (!product_id) {
        return res.status(400).json({ error: 'Product ID is required' });
    }

    const productIdInt = parseInt(product_id as string, 10);

    if (isNaN(productIdInt)) {
      return res.status(400).json({ error: "Invalid product_id" });
    }

    const { rows } = await pool.query(
        `SELECT p.product_id, p.product_name, p.product_description, p.product_price, p.product_image, a.artisan_firstname, a.artisan_lastname 
        FROM public.product p 
        JOIN public.artisan a ON p.artisan_id = a.artisan_id 
        WHERE p.product_id = $1;`,
        [productIdInt]
        );

    if (rows.length === 0) {
        return res.status(404).json({ error: 'Product not found' });
    }
    console.log(rows)
    res.status(200).json(rows);

  } catch (error) {
    console.error("Error fetching product details:", error);
    res.status(500).json({ error: 'Failed to fetch product details' });
  }
}
