import { Category } from "@/app/lib/definitions";
import { fetchSearchCategories } from "./data";

const fetchCategories = async (): Promise<Category[]> => {
console.log("Calling fetchSearchCategories...");

const response = await fetchSearchCategories();

if (!response) {
  throw new Error("No response received from fetchSearchCategories.");
}

if (!Array.isArray(response)) {
  throw new Error("Failed to fetch products");
}

console.log("Categories fetched:", response);
  return response;
};

export default fetchCategories;