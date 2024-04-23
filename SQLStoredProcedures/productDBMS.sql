CREATE OR REPLACE FUNCTION submitOrder(inputEmail TEXT,
         inputName TEXT,
         address TEXT,
         billAddress TEXT,
         tlf TEXT,
         comment TEXT,
         processed BOOLEAN,
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
            VALUES (DEFAULT, inputEmail, tlf, DEFAULT, DEFAULT, inputName, address, billAddress, comment )
            RETURNING order_id into orderID;
            SELECT EXISTS (SELECT 1 FROM users WHERE email = inputEmail) INTO user_exists;
            IF user_exists THEN
                UPDATE users
                SET marketing=inputMarketing
                WHERE email = inputEmail;
            ELSE
                INSERT INTO users
                    VALUES (inputEmail, inputMarketing);
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
    COMMIT;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION postOrderItems(orderID INTEGER,productIDS INTEGER[],productQuantity INTEGER[],productPrices INTEGER[],productCurrencies TEXT[],productAmount INTEGER)
RETURNS void AS $$
    BEGIN
        for counter in 1..productAmount loop
                    INSERT INTO orderitems
                        VALUES (orderID, productIDS[counter], productQuantity[counter], productCurrencies[counter],productPrices[counter]);
        END loop;
    END;
$$ LANGUAGE plpgsql;

