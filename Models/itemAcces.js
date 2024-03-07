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
    const items= await myPool.query("SELECT * FROM products WHERE product_id = $1",[id]);
    return(items.rows)
  } catch (err){
    console.log("Error")
    return err;
  }
  



}

module.exports = { getItems, getItem};




