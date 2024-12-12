import { Pool } from '@vercel/postgres';

declare global {
  namespace NodeJS {
    interface Global {
      _vercel_postgres_pool?: Pool;
    }
  }
}

export {};