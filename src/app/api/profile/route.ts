

// REPLACE ALL OF THIS CODE
import { createPool } from '@vercel/postgres';

const pool = createPool({
    connectionString: process.env.POSTGRES_URL,
  });
  
  export async function GET() {
    console.log(pool)
  }