import 'dotenv/config';
import { sql } from '@vercel/postgres';
import { Review } from '@/app/lib/definitions';

export async function fetchReview() {
    try {
        console.log('Fetching revenue data...');
        await new Promise((resolve) => setTimeout(resolve, 3000));
        const data = await sql<Review>`SELECT * FROM review`;
        console.log('Data fetch completed after 3 seconds.');

        return data.rows;
    } catch (error) {
        console.error('Database Error: ', error);
        throw new Error('Failed to fetch review data.');
    }

}

export async function createUser(user: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) {
    try{
    await sql`
      INSERT INTO users (firstname, lastname, email, password)
      VALUES (${user.firstName}, ${user.lastName}, ${user.email}, ${user.password})
    `;
    return true;

    } catch (error) {
        console.error('Failed to create user:', error);
        return false;
    }
  }

export async function addReview(review: {
    review_comment: string;
    review_rating: number;
    user_id: number;
    product_id: number;
}) {
  try{
  await sql`
    INSERT INTO review (review_comment, review_rating, user_id, product_id)
    VALUES (${review.review_comment}, ${review.review_rating}, ${review.user_id}, ${review.product_id})
  `;
  return true;

  } catch (error) {
      console.error('Failed to create review:', error);
      return false;
  }
}

// export async function fetchSearchCategories() {
//   try {
//     console.log("Attempting to connect to the database...");
//     const client = await pool.connect();
//     console.log("Database client connected successfully.");

//     console.log("Executing query to fetch categories...");
//     const { rows } = await client.query('SELECT * FROM category;');
//     client.release();
//     console.log("Fetched categories successfully:", rows);

//     return rows;
//   } catch (error) {
//     console.error("Database Error (fetchSearchCategories):", error);
//     console.error("Error Stack Trace:", error);
//     throw new Error("Failed to fetch categories.");
//   }
// }

// export async function fetchProdData() {
//   try {
//     console.log("Attempting to connect to the database...");
//     const client = await pool.connect();
//     console.log("Database client connected successfully.");

//     console.log("Executing query to fetch product data...");
//     const { rows } = await client.query(`
//       SELECT 
//         p.product_id, 
//         p.product_name, 
//         p.product_description, 
//         p.product_price, 
//         p.product_image, 
//         p.category_id, 
//         a.artisan_firstname, 
//         a.artisan_lastname 
//       FROM public.product p 
//       JOIN public.artisan a ON p.artisan_id = a.artisan_id 
//       ORDER BY p.product_id ASC;
//     `);
//     client.release();
//     console.log("Fetched product data successfully:", rows);

//     return rows;
//   } catch (error) {
//     console.error("Database Error (fetchProdData):", error);
//     console.error("Error Stack Trace:", error);
//     throw new Error("Failed to fetch product data.");
//   }
// }
