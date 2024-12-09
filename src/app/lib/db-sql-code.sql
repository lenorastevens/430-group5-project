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
    category_id, 
    artisan_id) 
    VALUES (
        'Stone Vase', 
        'The intricate texture of this white-colored soft stone modern flowerpot makes it stand out among other décor items.',
        75.99,
        'white-vase.webp',
        5,
        4
        );

INSERT INTO product (
    product_name, 
    product_description, 
    product_price, 
    product_image, 
    category_id, 
    artisan_id) 
    VALUES 
        (
            'Floral Hanging Origami',
            'This stunning hanging origami is made with premium decorative paper. Each piece is delicately folded to achieve an elegant, natural look. Perfect for home decor or special occasions, these hangings combine artistry with sustainability.',
            12,
            'decoration-paper.jpg',
            1,
            5
        ),
        (
            'Cozy Cat Display Baskets',
            'These handwoven cat display baskets provide a snug and stylish place for your desk items. Crafted with durable natural fibers, they feature an open-weave design for breathability and aesthetic appeal. Each basket is a unique combination of practicality and artistry.',
            75,
            'display-baskets.jpg',
            6,
            16
        ),
        (
            'Heritage Handwoven Cloth',
            'This handwoven cloth is designed with vibrant patterns and traditional weaving techniques. Its soft, durable fabric makes it perfect for both everyday use and special occasions. Each thread tells a story of heritage and craftsmanship.',
            65,
            'handwoven-cloth.jpg',
            6,
            15
        ),
        (
            'Traditional Indian Ring Set',
            'This stunning set of rings showcases intricate designs inspired by Indian heritage. Each ring is meticulously crafted with engraved patterns and inlaid stones, blending tradition and elegance. Perfect for adding a touch of exotic charm to your jewelry collection.',
            95,
            'indian-rings.jpg',
            3,
            9
        ),
        (
            'Heavenly Jewelry Set',
            'This elegant jewelry set includes a necklace and matching earrings inspired by celestial themes. Handcrafted with delicate metalwork and sparkling gemstones, it adds a sophisticated glow to any outfit. A timeless set that showcases expert craftsmanship.',
            150,
            'jewellery-brands.jpg',
            3,
            10
        ),
        (
            'Rustic Clay Bowl',
            'This hand-thrown clay bowl features an earthy glaze and a smooth finish, perfect for serving or display. The organic design reflects the artisan’s love for natural forms and textures. A versatile piece that blends beauty and functionality.',
            40,
            'kitchen.jpg',
            4,
            11
        ),
        (
            'Vintage Charm Necklace Set',
            'This hand-crafted necklace set features an intricate design inspired by vintage heirlooms. Its delicate chain and detailed pendant make it a striking addition to any collection. Each piece is carefully crafted to exude timeless elegance.',
            120,
            'necklace.webp',
            3,
            9
        );