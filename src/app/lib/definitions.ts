export type User = {
    id: string;
    firstname: string,
    lastname: string,
    email: string;
    password: string;
    account_type: string
};

export type Product = {
    product_id: number;
    product_name: string;
    product_description: string;
    product_price: number;
    product_image: string;
    artisan_id: number;
    artisan_firstname: string;
    artisan_lastname: string;
    category_id: number;
};

export type Category = {
    category_id: number;
    category_name: string;
};

export type Account = {
    account_id: string;
    account_firstname: string;
    account_lastname: string;
    account_email: string;
    account_password: string;
    account_type: string;
};

export type Artisan = {
    artisan_id: number;
    artisan_firstname: string;
    artisan_lastname: string;
    artisan_bio: string;
};

export type Review = {
    review_id: number;
    review_comment: string;
    review_rating: number;
    review_date: Date;
    account_id: number;
    product_id: number;
};
