

CREATE TABLE products (
product_id SERIAL PRIMARY KEY,
name varchar(64) NOT NULL,
description varchar(255),
price float(16) NOT NULL,
currency varchar(12) NOT NULL
);

CREATE TABLE discount(
discount_id 
SERIAL PRIMARY KEY,
product_id int 
NOT NULL 
REFERENCES products (product_id) 
ON DELETE CASCADE,
discount_amount int 
NOT NULL,  -- buy at least this many to get discount
discount_percent float(4) 
NOT NULL,
);

CREATE TABLE upsell(
product_id int  
PRIMARY KEY 
REFERENCES products (product_id) 
ON DELETE CASCADE,
upsell_id int 
PRIMARY KEY 
REFERENCES products (product_id) 
ON DELETE CASCADE
);
ALTER TABLE upsell ADD CONSTRAINT upsell_same_id CHECK (product_id != upsell_id);

CREATE TABLE inventory(
product_id int 
PRIMARY KEY 
REFERENCES products (product_id) 
ON DELETE CASCADE,
stock int 
NOT NULL
);

CREATE TABLE orders(
order_id SERIAL PRIMARY KEY,
email varchar(100) NOT NULL,
name varchar(255) NOT NULL,
tlf varchar(20) NOT NULL,
address varchar(255) NOT NULL,
bill_address varchar(255) NOT NULL,
comment varchar(255),
processed BOOLEAN NOT NULL DEFAULT 0,
date BOOLEAN NOT NULL DEFAULT GETDATE()
);
 
CREATE TABLE orderitems(
order_id int  
PRIMARY KEY 
REFERENCES orders (order_id) 
ON DELETE CASCADE,
product_id int  
PRIMARY KEY 
REFERENCES products (product_id) 
ON DELETE CASCADE,
quantity int 
NOT NULL,
price float(16) 
NOT NULL,
currency varchar(12) NOT NULL
);

CREATE TABLE images(
product_id int 
PRIMARY KEY 
REFERENCES products (product_id) 
ON DELETE CASCADE,
image_url varchar(255) 
NOT NULL
);

CREATE TABLE users(
email varchar(255) PRIMARY KEY,
marketing BOOLEAN NOT NULL
);

