const { Client } = require('pg');

const myPool = require("./dbPool");



async function getItems(){
  try{
    const items= await myPool.query("SELECT * FROM products");
    return(items)
  } catch (err){
    return err;
  }
  



}

module.exports = { getItems};




