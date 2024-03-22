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

r







