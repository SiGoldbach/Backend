const { Client } = require('pg');

const myPool = require("./dbPool");



async function getItems(){
  try{
    const items= await myPool.query("SELECT * FROM products");
    console.log(items)
    return(items)
  } catch (err){
    console.log("Error")
    return err;
  }
  



}

module.exports = { getItems};




