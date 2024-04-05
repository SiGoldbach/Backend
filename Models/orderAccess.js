const { Client } = require('pg');

const myPool = require("./dbPool");





async function postOrder(body){
    try{
      const post = await myPool.query("INSERT INTO products VALUES(DEFAULT, $1,$2,$3,$4,$5)",[body.email,body.name,body.address,body.bill_address,body.comment])
  
      for (let index = 1; index < array.length; index++) {
        
        const post = await myPool.query("INSERT INTO products VALUES(DEFAULT, $1,$2,$3,$5)",[body.product_id,body.quantity,body.price,body.currency])
        const element = array[index];
      }); {
        



    }
    catch(err){
      throw new Error(err);
  
    }
  
  }










