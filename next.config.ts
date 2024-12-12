import dotenv from 'dotenv';
import type { NextConfig } from "next";

// Load environment variables from .env
dotenv.config();

console.log("Environment Variables Loaded");
console.log("POSTGRES_URL:", process.env.POSTGRES_URL);

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
