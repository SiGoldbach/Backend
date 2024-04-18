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


CREATE OR REPLACE FUNCTION submitOrder(email TEXT, _name TEXT, adress TEXT, bill_adress text, tlf TEXT, comment TEXT, productIDS INTEGER[], quantity INTEGER[], currency TEXT[], price REAL[], productAmount INTEGER)
RETURNS VOID AS $$
DECLARE 
    orderID INT;
BEGIN 
    BEGIN
        INSERT INTO orders VALUES(DEFAULT,email,_name,adress,bill_adress,tlf,0,DEFAULT,comment)
        RETURNING order_id into orderID;

        FOR i in 1..productAmount LOOP
            INSERT INTO orderitems VALUES(orderID,productIDS[i],quantity[i],currency[i],price[i]);

        END LOOP;

        EXCEPTION
        -- If any error occurs, rollback the transaction
        WHEN OTHERS THEN
            RAISE NOTICE 'Error: %', SQLERRM;
            ROLLBACK;
    END;
END; 
$$ LANGUAGE plpgsql;










