CREATE OR REPLACE FUNCTION submitOrder(email TEXT, _name TEXT, adress TEXT, bill_adress text, tlf TEXT, comment TEXT, productIDS INTEGER[], quantity INTEGER[], currency TEXT[], price REAL[], productAmount INTEGER)
RETURNS VOID AS $$
DECLARE 
    orderID INT;
BEGIN 
    BEGIN
    

    END;
END; 
$$ LANGUAGE plpgsql;