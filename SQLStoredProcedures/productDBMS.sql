CREATE OR REPLACE FUNCTION submitOrder(inputEmail TEXT,
         inputName TEXT,
         adress TEXT,
         billAdress TEXT, 
         tlf TEXT, 
         comment TEXT, 
         proccesed BOOLEAN,
         inputMarketing BOOLEAN,
         productIDS INTEGER[], 
         productQuantity INTEGER[], 
         productPrices INTEGER[],
         productCurrencies TEXT[],
         productAmount INTEGER)
RETURNS VOID AS $$
DECLARE 
    orderID INT;
    user_exists BOOLEAN;
BEGIN
    BEGIN
        INSERT INTO orders 
            VALUES (DEFAULT, inputEmail, tlf, DEFAULT,DEFAULT, inputName, adress, billAdress, comment )
            RETURNING order_id into orderID;
            SELECT EXISTS (SELECT 1 FROM users WHERE email = inputEmail) INTO user_exists;
            IF user_exists THEN
                UPDATE users
                SET marketing=inputMarketing
                WHERE email = inputEmail;
            ELSE 
                INSERT INTO users
                    VALUES (email, inputMarketing);
            END IF;
            

            for counter in 1..productAmount loop
                INSERT INTO orderitems 
                    VALUES (orderID, productIDS[counter], productQuantity[counter], productCurrencies[counter],productPrices[counter]);
            end loop;
            EXCEPTION 
                when others then 
                    RAISE NOTICE 'Transaction of order failed';
                    ROLLBACK; 
    END;
END; 
$$ LANGUAGE plpgsql;