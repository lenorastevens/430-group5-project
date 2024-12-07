CREATE TYPE public.account_type AS ENUM
	('Artisan', 'Customer', 'Admin');

ALTER TYPE public.account_type OWNER TO neondb_owner;

CREATE TABLE public.category (
	category_id INT GENERATED BY DEFAULT AS IDENTITY,
	category_name CHARACTER VARYING NOT NULL,
	CONSTRAINT category_pk PRIMARY KEY (category_id)
);

CREATE TABLE IF NOT EXISTS public.artisan
(
	artisan_id integer NOT NULL GENERATED BY DEFAULT AS IDENTITY,
	artisan_firstname character varying NOT NULL,
    artisan_lastname character varying NOT NULL,
	artisan_bio text NOT NULL,
	CONSTRAINT artisan_pkey PRIMARY KEY (artisan_id)
);

CREATE TABLE IF NOT EXISTS public.product
(
	product_id integer NOT NULL GENERATED BY DEFAULT AS IDENTITY,
	product_name character varying NOT NULL,
	product_description text NOT NULL,
	product_price numeric(9, 0) NOT NULL,
	product_image character varying NOT NULL,
	product_thumbnail character varying NOT NULL,
	artisan_id integer NOT NULL,
	category_id integer NOT NULL,
	CONSTRAINT product_pkey PRIMARY KEY (product_id)
);

ALTER TABLE IF EXISTS public.product
	ADD CONSTRAINT fk_artisan FOREIGN KEY (artisan_id)
	REFERENCES public.artisan (artisan_id) MATCH SIMPLE
	ON UPDATE CASCADE
	ON DELETE NO ACTION;

ALTER TABLE IF EXISTS public.product
	ADD CONSTRAINT fk_category FOREIGN KEY (category_id)
	REFERENCES public.category (category_id) MATCH SIMPLE
	ON UPDATE CASCADE
	ON DELETE NO ACTION;

CREATE TABLE IF NOT EXISTS public.account
(
	account_id integer NOT NULL GENERATED BY DEFAULT AS IDENTITY,
    account_firstname character varying NOT NULL,
    account_lastname character varying NOT NULL,
    account_email character varying NOT NULL,
    account_password character varying NOT NULL,
    account_type account_type NOT NULL DEFAULT 'Customer'::account_type,
    CONSTRAINT account_pkey PRIMARY KEY (account_id)
);

CREATE TABLE IF NOT EXISTS public.review
(
    review_id integer NOT NULL GENERATED BY DEFAULT AS IDENTITY,
    review_comment text NOT NULL,
    review_rating integer NOT NULL,
	review_date timestamp with timezone NOT
	category_id integer NOT NULL,
	account_id integer NOT NULL,
    CONSTRAINT review_pkey PRIMARY KEY (review_id)
);
  
ALTER TABLE IF EXISTS public.review
	ADD CONSTRAINT fk_account FOREIGN KEY (account_id)
	REFERENCES public.account (account_id) MATCH SIMPLE
	ON UPDATE CASCADE
	ON DELETE NO ACTION;

ALTER TABLE IF EXISTS public.review
	ADD CONSTRAINT fk_product FOREIGN KEY (product_id)
	REFERENCES public.product (product_id) MATCH SIMPLE
	ON UPDATE CASCADE
	ON DELETE NO ACTION;

INSERT INTO public.category (category_name)
VALUES ('Paper Crafts'),
	('Glass Crafts'),
	('Jewellery'),
	('Pottery'),
	('Stone Crafts'),
	('Textile Arts'),
	('Leatherworking'),
	('Woodworking');

INSERT INTO public.artisan (
	artisan_firstname,
    artisan_lastname,
	artisan_bio,
	)
VALUES (
    'Amy',
    'Burns',
    'Amy has been developing her creative side since she was a young child.  Her interest in handmade crafts began after she enjoyed collecting shells on the beach.  Starting with simple shell crafts her talents have evolved into complex glass creations, jewellery, and pottery.'
),
(
    'Balazs',
    'Orban',
    'Balazs is from a longline of amazingly talented woodworkers.  He started learning from his father and grandfather as soon as he was big enough to hold simple tools.  Unique hand carvings and joinery without fasteners are a specialty.'
);

INSERT INTO product (
    product_name, 
    product_description, 
    product_price, 
    product_image, 
    product_thumbnail, 
    category_id, 
    artisan_id) 
    VALUES (
        'Stone Vase', 
        'The intricate texture of this white-colored soft stone modern flowerpot makes it stand out among other décor items.',
        '75.99',
        'white-vase.webp',
        'white-vase.webp',
        5,
        4
        );