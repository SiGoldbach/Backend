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

module.exports = { getItems, getItem};




