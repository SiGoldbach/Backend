const { Client } = require('pg');

const myPool = require("./dbPool");



async function getItems(){
  try{
    const items= await myPool.query("SELECT * FROM products");
    console.log(items.rows)
    return(items.rows)
  } catch (err){
    console.log("Error")
    return err;
  }
  



}

module.exports = { getItems};




