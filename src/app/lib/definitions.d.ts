export interface Product {
    product_id: number;
    product_name: string;
    product_description: string;
    product_price: number;
    product_image: string;
    artisan_id: number;
    artisan_firstname: string;
    artisan_lastname: string;
    category_id: number;
  }

export interface Category {
    category_id: number;
    category_name: string;
}

export interface Account {
    account_id: number;
    account_firstname: string;
    account_lastname: string;
    account_email: string;
    account_password: string;
    account_type: string;
}

export interface Artisan {
    artisan_id: number;
    artisan_firstname: string;
    artisan_lastname: string;
    artisan_bio: string;
}

export interface Review {
    review_id: number;
    review_comment: string;
    review_rating: number;
    review_date: Date;
    account_id: number;
    product_id: number;
}

export {};