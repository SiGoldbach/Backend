const { Client } = require('pg');

const myPool = require("./dbPool");



async function getItems(){
  try{
    const items= await myPool.query("SELECT * FROM products");
    return(items.rows)
  } catch (err){
    console.log("Error")
    return err;
  }
  



}
async function getItem(id){
  try{
    const idAsNumber=parseInt(id)
    const items= await myPool.query("SELECT * FROM products WHERE product_id = $1",[idAsNumber]);
    return(items.rows)
  } catch (err){
    if (err instanceof TypeError){

    }
    console.log("Error")
    return err;
  } 
}

async function postItem(body){
  try{
    const post = await myPool.query("INSERT INTO products VALUES(DEFAULT, $1,$2,$3,$4,$5)",[body.name],[body.description],[body.weight],[body.price],[body.currency])
    return "201";

  }
  catch(err){
    return err;

  }
  
  


}

module.exports = { getItems, getItem,postItem};




