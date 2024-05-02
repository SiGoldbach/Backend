
CREATE TABLE products (
product_id SERIAL PRIMARY KEY,
name varchar(64) NOT NULL,
description varchar(255),
price float(16) NOT NULL,
currency varchar(12) NOT NULL
);

CREATE TABLE discount(
discount_id SERIAL PRIMARY KEY,
product_id int NOT NULL REFERENCES products (product_id) ON DELETE CASCADE,
discount_amount int NOT NULL,  -- buy at least this many to get discount
discount_percent float(4) NOT NULL
);

CREATE TABLE upsell(
product_id int REFERENCES products (product_id) ON DELETE CASCADE,
upsell_id int REFERENCES products (product_id) ON DELETE CASCADE,
PRIMARY KEY (product_id, upsell_id)
);
ALTER TABLE upsell ADD CONSTRAINT upsell_same_id CHECK (product_id != upsell_id);

CREATE TABLE inventory(
product_id int PRIMARY KEY REFERENCES products (product_id) ON DELETE CASCADE,
stock int NOT NULL
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
date date NOT NULL DEFAULT GETDATE()
);

CREATE TABLE orderitems(
order_id int REFERENCES orders (order_id) ON DELETE CASCADE,
product_id int REFERENCES products (product_id) ON DELETE CASCADE,
quantity int NOT NULL,
price float(16) NOT NULL,
currency varchar(12) NOT NULL,
PRIMARY KEY (order_id, product_id)
);

CREATE TABLE images(
product_id int PRIMARY KEY REFERENCES products (product_id) ON DELETE CASCADE,
image_url varchar(255) NOT NULL
);

CREATE TABLE users(
email varchar(255) PRIMARY KEY,
marketing BOOLEAN NOT NULL
);

CREATE OR REPLACE FUNCTION postOrderItems(orderID INTEGER,productIDS INTEGER[],productQuantity INTEGER[],productPrices INTEGER[],productCurrencies TEXT[],productAmount INTEGER)
RETURNS void AS $$
    BEGIN
        for counter in 1..productAmount loop
                    INSERT INTO orderitems
                        VALUES (orderID, productIDS[counter], productQuantity[counter], productCurrencies[counter],productPrices[counter]);
        END loop;
    END;
$$ LANGUAGE plpgsql;

CREATE VIEW productInfos AS
SELECT 
    p.product_id,
    p.name, 
    p.price,
    p.currency,
    d.discount_amount,
    d.discount_percent,
    u.upsell_id,
    i.image_url
FROM
    products p
LEFT JOIN discount d USING (product_id)
LEFT JOIN upsell u USING (product_id)
LEFT JOIN images i USING (product_id);


