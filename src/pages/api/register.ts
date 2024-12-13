import { NextApiRequest, NextApiResponse } from 'next';
import { Pool } from 'pg';
import bcrypt from 'bcrypt';




const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { firstname, lastname, email, password, account_type } = req.body;

    // Validate input
    if (!firstname || !lastname || !email || !password || !account_type) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    try {
      // Check if the email already exists
      const { rows } = await pool.query('SELECT * FROM public.account WHERE account_email = $1', [email]);
      if (rows.length > 0) {
        return res.status(400).json({ message: 'Email already in use' });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert new user into the database
      const result = await pool.query(
        'INSERT INTO public.account (account_firstname, account_lastname, account_email, account_password, account_type) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [firstname, lastname, email, hashedPassword, account_type]
      );

      const newUser = result.rows[0];

      res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
