

const { Client } = require('pg');
const myPool = require("./dbPool");

var jsonbody = fetch("../testFiles_JSOM/test.json")

postOrder(jsonbody)

async function postOrder(jsonbody){
    try{
      var order = JSON.parse(jsonbody)
      const order_id = await myPool.query("INSERT INTO orders VALUES(DEFAULT, $1,$2,$3,$4,$5) RETURNING order_id",[order[0].email,order[0].name,order[0].address,order[0].bill_address,order[0].comment])
  
      

      for (let index = 1; index < order.length; index++) {
        const post = await myPool.query("INSERT INTO orderitems VALUES(DEFAULT, $1,$2,$3,$4,$5)",[order_id, order[index].product_id,order[index].quantity,order[index].price,order[index].currency])
        
      } 

    }
    catch(err){
      throw new Error(err);
  
    }
  
  }










